import * as React from "react";
import {
  FileText,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { HeaderSection } from "@/components/forms/HeaderSection";
import { BiodataSection } from "@/components/forms/BiodataSection";
import { EducationSection } from "@/components/forms/EducationSection";
import { WorkExperienceSection } from "@/components/forms/WorkExperienceSection";
import { ProjectsSection } from "@/components/forms/ProjectsSection";
import { TagInput } from "@/components/forms/TagInput";
import { TemplateSelector } from "@/components/TemplateSelector";
import { CvPreview } from "@/components/CvPreview";
import { PdfModal } from "@/components/PdfModal";
import { initialFormData, type CvFormData } from "@/types/cv";
import {
  validateForm,
  sanitizeForm,
  SECTION_LABELS,
  type SectionKey,
  type ValidationErrors,
} from "@/lib/validation";
import { submitCv } from "@/lib/api";

const SECTION_ORDER: SectionKey[] = [
  "header",
  "biodata",
  "educations",
  "work_experiences",
  "projects",
  "skills",
  "hobbies",
];

export default function App() {
  const [form, setForm] = React.useState<CvFormData>(initialFormData);
  const [errors, setErrors] = React.useState<ValidationErrors>({});
  const [open, setOpen] = React.useState<string[]>(["header", "biodata"]);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [savedId, setSavedId] = React.useState<string | null>(null);
  const [pdfOpen, setPdfOpen] = React.useState(false);

  const patch = <K extends keyof CvFormData>(key: K, value: CvFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const errorKeys = Object.keys(errors) as SectionKey[];

  const handleGenerate = async () => {
    setSubmitError(null);
    const found = validateForm(form);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // open every section that has an error so the user can fix it
      setOpen((prev) =>
        Array.from(new Set([...prev, ...Object.keys(found)]))
      );
      return;
    }

    setSubmitting(true);
    try {
      const clean = sanitizeForm(form);
      const result = await submitCv(clean);
      setSavedId(result.id);
      setForm(clean);
      setPdfOpen(true);
    } catch (e) {
      setSubmitError(
        e instanceof Error ? e.message : "Gagal menyimpan data ke server."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const fileName = `CV_${(form.header.full_name || "Saya")
    .trim()
    .replace(/\s+/g, "_")}.pdf`;

  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* Top bar */}
      <header className="border-b bg-white/90 backdrop-blur sticky top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight">CV Generator</h1>
            <p className="text-xs text-muted-foreground">
              Isi data Anda, pilih template, lalu unduh CV dalam format PDF.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-8 lg:grid-cols-[1fr_minmax(360px,460px)]">
        {/* ── Left: form ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {errorKeys.length > 0 && (
            <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-medium">
                  Lengkapi bagian berikut sebelum membuat CV:
                </p>
                <ul className="mt-1 list-inside list-disc">
                  {errorKeys.map((k) => (
                    <li key={k}>
                      {SECTION_LABELS[k]} — {errors[k]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <Accordion
            type="multiple"
            value={open}
            onValueChange={setOpen}
            className="flex flex-col gap-4"
          >
            {SECTION_ORDER.map((key) => (
              <AccordionItem key={key} value={key}>
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    {SECTION_LABELS[key]}
                    {errors[key] && (
                      <Badge variant="destructive" className="text-[10px]">
                        Perlu dilengkapi
                      </Badge>
                    )}
                  </span>
                </AccordionTrigger>
                <AccordionContent>{renderSection(key, form, patch)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* ── Right: template + preview ──────────────────────────── */}
        <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h2 className="mb-1 text-sm font-semibold">Pilih Template</h2>
            <p className="mb-4 text-xs text-muted-foreground">
              Pratinjau di bawah diperbarui otomatis.
            </p>
            <TemplateSelector
              value={form.template}
              onChange={(t) => patch("template", t)}
            />
          </div>

          <div className="rounded-xl border bg-muted p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold">Pratinjau Langsung</span>
              <span className="text-xs text-muted-foreground">A4</span>
            </div>
            <div className="flex justify-center overflow-hidden">
              <div
                style={{
                  width: 380,
                  height: 537,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    transform: "scale(0.4786)",
                    transformOrigin: "top left",
                  }}
                >
                  <CvPreview data={form} />
                </div>
              </div>
            </div>
          </div>

          {submitError && (
            <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          {savedId && !submitError && (
            <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-accent p-3 text-sm text-accent-foreground">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Data tersimpan. ID: {savedId.slice(0, 8)}…</span>
            </div>
          )}

          <Button
            size="lg"
            className="w-full"
            onClick={handleGenerate}
            disabled={submitting}
          >
            {submitting ? <Loader2 className="animate-spin" /> : <Sparkles />}
            {submitting ? "Menyimpan…" : "Generate CV"}
          </Button>
        </aside>
      </main>

      <PdfModal
        open={pdfOpen}
        onOpenChange={setPdfOpen}
        data={form}
        fileName={fileName}
      />
    </div>
  );
}

function renderSection(
  key: SectionKey,
  form: CvFormData,
  patch: <K extends keyof CvFormData>(key: K, value: CvFormData[K]) => void
) {
  switch (key) {
    case "header":
      return (
        <HeaderSection
          value={form.header}
          onChange={(v) => patch("header", v)}
        />
      );
    case "biodata":
      return (
        <BiodataSection
          value={form.biodata}
          onChange={(v) => patch("biodata", v)}
        />
      );
    case "educations":
      return (
        <EducationSection
          value={form.educations}
          onChange={(v) => patch("educations", v)}
        />
      );
    case "work_experiences":
      return (
        <WorkExperienceSection
          value={form.work_experiences}
          onChange={(v) => patch("work_experiences", v)}
        />
      );
    case "projects":
      return (
        <ProjectsSection
          value={form.projects}
          onChange={(v) => patch("projects", v)}
        />
      );
    case "skills":
      return (
        <div className="flex flex-col gap-2">
          <Label htmlFor="skills-input">
            Keahlian teknis / soft skill
          </Label>
          <TagInput
            inputId="skills-input"
            value={form.skills}
            onChange={(v) => patch("skills", v)}
            placeholder="cth. Komunikasi, Microsoft Office, Kepemimpinan…"
          />
        </div>
      );
    case "hobbies":
      return (
        <div className="flex flex-col gap-2">
          <Label htmlFor="hobbies-input">Hobi / minat</Label>
          <TagInput
            inputId="hobbies-input"
            value={form.hobbies}
            onChange={(v) => patch("hobbies", v)}
            placeholder="cth. Membaca, Fotografi, Sepak bola…"
          />
        </div>
      );
    default:
      return null;
  }
}
