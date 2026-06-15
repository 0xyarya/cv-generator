import * as React from "react";
import html2pdf from "html2pdf.js";
import { Download, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CvPreview } from "@/components/CvPreview";
import type { CvFormData } from "@/types/cv";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: CvFormData;
  fileName: string;
};

function buildWorker(element: HTMLElement, fileName: string) {
  return html2pdf()
    .set({
      margin: 0,
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] },
    })
    .from(element);
}

export function PdfModal({ open, onOpenChange, data, fileName }: Props) {
  const pageRef = React.useRef<HTMLDivElement>(null);
  const [blobUrl, setBlobUrl] = React.useState<string | null>(null);
  const [generating, setGenerating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Generate the PDF preview whenever the modal opens.
  React.useEffect(() => {
    if (!open) return;
    let cancelled = false;
    let createdUrl: string | null = null;

    setGenerating(true);
    setError(null);

    // wait a frame so the off-screen preview is laid out
    const timer = window.setTimeout(async () => {
      try {
        if (!pageRef.current) throw new Error("Preview belum siap.");
        const url = (await buildWorker(pageRef.current, fileName).outputPdf(
          "bloburl"
        )) as string;
        createdUrl = url;
        if (!cancelled) setBlobUrl(url);
      } catch (e) {
        if (!cancelled)
          setError(
            e instanceof Error ? e.message : "Gagal membuat PDF. Coba lagi."
          );
      } finally {
        if (!cancelled) setGenerating(false);
      }
    }, 120);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (createdUrl) URL.revokeObjectURL(createdUrl);
      setBlobUrl(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleDownload = async () => {
    if (!pageRef.current) return;
    setGenerating(true);
    try {
      await buildWorker(pageRef.current, fileName).save();
    } finally {
      setGenerating(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Pratinjau PDF</DialogTitle>
            <DialogDescription>
              Periksa hasil CV Anda di bawah ini sebelum mengunduh.
            </DialogDescription>
          </DialogHeader>

          <div className="min-h-[65vh] flex-1 overflow-hidden rounded-lg border bg-muted">
            {generating && !blobUrl && (
              <div className="flex h-[65vh] flex-col items-center justify-center gap-3 text-muted-foreground">
                <Loader2 className="h-7 w-7 animate-spin text-primary" />
                <p className="text-sm">Membuat PDF…</p>
              </div>
            )}
            {error && (
              <div className="flex h-[65vh] items-center justify-center px-6 text-center text-sm text-destructive">
                {error}
              </div>
            )}
            {blobUrl && (
              <iframe
                title="Pratinjau PDF"
                src={blobUrl}
                className="h-[65vh] w-full"
              />
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Tutup
            </Button>
            <Button onClick={handleDownload} disabled={generating}>
              {generating ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Download />
              )}
              Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Off-screen render target consumed by html2pdf */}
      {open && (
        <div
          aria-hidden
          style={{
            position: "fixed",
            left: -10000,
            top: 0,
            zIndex: -1,
            pointerEvents: "none",
          }}
        >
          <CvPreview ref={pageRef} data={data} />
        </div>
      )}
    </>
  );
}
