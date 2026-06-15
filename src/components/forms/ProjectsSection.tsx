import { Plus, Trash2 } from "lucide-react";
import { Field } from "./Field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { emptyProject, type CvProject } from "@/types/cv";

type Props = {
  value: CvProject[];
  onChange: (next: CvProject[]) => void;
};

export function ProjectsSection({ value, onChange }: Props) {
  const update = (i: number, key: keyof CvProject, v: string) => {
    const next = value.slice();
    next[i] = { ...next[i], [key]: v };
    onChange(next);
  };

  const add = () => onChange([...value, emptyProject()]);
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
              Proyek #{i + 1}
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
              label="Nama Proyek"
              id={`proj-name-${i}`}
              required
              placeholder="cth. Kegiatan Bakti Sosial"
              value={item.name}
              onChange={(e) => update(i, "name", e.target.value)}
            />
            <Field
              label="Peran"
              id={`proj-role-${i}`}
              placeholder="cth. Ketua Pelaksana"
              value={item.role}
              onChange={(e) => update(i, "role", e.target.value)}
            />
            <Field
              label="Alat / Keterampilan"
              id={`proj-tech-${i}`}
              placeholder="cth. Microsoft Office, Canva"
              value={item.tech_stack}
              onChange={(e) => update(i, "tech_stack", e.target.value)}
            />
            <Field
              label="Tautan (opsional)"
              id={`proj-link-${i}`}
              placeholder="cth. drive.google.com/..."
              value={item.link}
              onChange={(e) => update(i, "link", e.target.value)}
            />
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor={`proj-desc-${i}`}>Deskripsi (opsional)</Label>
              <Textarea
                id={`proj-desc-${i}`}
                placeholder="Jelaskan singkat tentang proyek ini."
                value={item.description}
                onChange={(e) => update(i, "description", e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" onClick={add} className="self-start">
        <Plus /> Tambah Proyek
      </Button>
    </div>
  );
}
