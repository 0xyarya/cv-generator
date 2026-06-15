import { Plus, Trash2 } from "lucide-react";
import { Field } from "./Field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { emptyEducation, type CvEducation } from "@/types/cv";

type Props = {
  value: CvEducation[];
  onChange: (next: CvEducation[]) => void;
};

export function EducationSection({ value, onChange }: Props) {
  const update = (i: number, key: keyof CvEducation, v: string) => {
    const next = value.slice();
    next[i] = { ...next[i], [key]: v };
    onChange(next);
  };

  const add = () => onChange([...value, emptyEducation()]);
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
              Pendidikan #{i + 1}
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
              label="Institusi / Sekolah"
              id={`edu-inst-${i}`}
              required
              placeholder="cth. Universitas Indonesia"
              value={item.institution}
              onChange={(e) => update(i, "institution", e.target.value)}
            />
            <Field
              label="Jenjang / Gelar"
              id={`edu-degree-${i}`}
              required
              placeholder="cth. S1 / Sarjana"
              value={item.degree}
              onChange={(e) => update(i, "degree", e.target.value)}
            />
            <Field
              label="Jurusan / Bidang Studi"
              id={`edu-field-${i}`}
              placeholder="cth. Manajemen"
              value={item.field_of_study}
              onChange={(e) => update(i, "field_of_study", e.target.value)}
            />
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Tahun Mulai"
                id={`edu-start-${i}`}
                placeholder="cth. 2018"
                value={item.start_year}
                onChange={(e) => update(i, "start_year", e.target.value)}
              />
              <Field
                label="Tahun Selesai"
                id={`edu-end-${i}`}
                placeholder="cth. 2022"
                value={item.end_year}
                onChange={(e) => update(i, "end_year", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor={`edu-desc-${i}`}>Deskripsi (opsional)</Label>
              <Textarea
                id={`edu-desc-${i}`}
                placeholder="Pencapaian, IPK, kegiatan organisasi, dll."
                value={item.description}
                onChange={(e) => update(i, "description", e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" onClick={add} className="self-start">
        <Plus /> Tambah Pendidikan
      </Button>
    </div>
  );
}
