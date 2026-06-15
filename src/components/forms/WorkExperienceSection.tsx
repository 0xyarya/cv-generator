import { Plus, Trash2 } from "lucide-react";
import { Field } from "./Field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { emptyWorkExperience, type CvWorkExperience } from "@/types/cv";

type Props = {
  value: CvWorkExperience[];
  onChange: (next: CvWorkExperience[]) => void;
};

export function WorkExperienceSection({ value, onChange }: Props) {
  const update = (i: number, key: keyof CvWorkExperience, v: string) => {
    const next = value.slice();
    next[i] = { ...next[i], [key]: v };
    onChange(next);
  };

  const add = () => onChange([...value, emptyWorkExperience()]);
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));

  return (
    <div className="flex flex-col gap-5">
      {value.map((item, i) => (
        <div
          key={i}
          className="relative rounded-lg border border-dashed p-4 sm:p-5"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-muted-foreground">
              Pengalaman #{i + 1}
            </span>
            {value.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => remove(i)}
              >
                <Trash2 /> Hapus
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              label="Perusahaan"
              id={`work-company-${i}`}
              required
              placeholder="cth. PT Maju Jaya"
              value={item.company}
              onChange={(e) => update(i, "company", e.target.value)}
            />
            <Field
              label="Posisi / Jabatan"
              id={`work-position-${i}`}
              required
              placeholder="cth. Staf Pemasaran"
              value={item.position}
              onChange={(e) => update(i, "position", e.target.value)}
            />
            <Field
              label="Mulai"
              id={`work-start-${i}`}
              placeholder="cth. Jan 2022"
              value={item.start_date}
              onChange={(e) => update(i, "start_date", e.target.value)}
            />
            <Field
              label="Selesai"
              id={`work-end-${i}`}
              placeholder="cth. Sekarang"
              value={item.end_date}
              onChange={(e) => update(i, "end_date", e.target.value)}
            />
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor={`work-desc-${i}`}>
                Deskripsi Pekerjaan (opsional)
              </Label>
              <Textarea
                id={`work-desc-${i}`}
                placeholder="Tanggung jawab utama & pencapaian Anda."
                value={item.description}
                onChange={(e) => update(i, "description", e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" onClick={add} className="self-start">
        <Plus /> Tambah Pengalaman Kerja
      </Button>
    </div>
  );
}
