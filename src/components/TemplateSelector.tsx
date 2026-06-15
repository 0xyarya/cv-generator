import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { TEMPLATES } from "@/components/templates";
import type { TemplateId } from "@/types/cv";

type Props = {
  value: TemplateId;
  onChange: (id: TemplateId) => void;
};

export function TemplateSelector({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {TEMPLATES.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={cn(
              "relative rounded-xl border p-4 text-left transition-all",
              active
                ? "border-primary ring-2 ring-primary/30 bg-accent"
                : "border-border hover:border-primary/50 hover:bg-accent/40"
            )}
          >
            {active && (
              <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-3.5 w-3.5" />
              </span>
            )}
            <div className="mb-2 text-sm font-semibold">{t.name}</div>
            <p className="text-xs text-muted-foreground">{t.description}</p>
          </button>
        );
      })}
    </div>
  );
}
