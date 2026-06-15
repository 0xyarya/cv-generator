import * as React from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  inputId?: string;
};

/** Tag-style multi-value input. Add with Enter/comma or the Add button. */
export function TagInput({ value, onChange, placeholder, inputId }: Props) {
  const [draft, setDraft] = React.useState("");

  const commit = () => {
    const parts = draft
      .split(",")
      .map((p) => p.trim())
      .filter((p) => p.length > 0 && !value.includes(p));
    if (parts.length > 0) onChange([...value, ...parts]);
    setDraft("");
  };

  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commit();
    } else if (e.key === "Backspace" && draft === "" && value.length > 0) {
      remove(value.length - 1);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Input
          id={inputId}
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <Button type="button" variant="secondary" onClick={commit}>
          Tambah
        </Button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((tag, i) => (
            <Badge
              key={`${tag}-${i}`}
              variant="accent"
              className="gap-1 py-1 pl-3 pr-1.5 text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => remove(i)}
                className="rounded-full p-0.5 hover:bg-primary/15"
                aria-label={`Hapus ${tag}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
