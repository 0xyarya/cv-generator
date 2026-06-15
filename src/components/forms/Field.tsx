import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FieldProps = {
  label: string;
  id: string;
  required?: boolean;
  hint?: string;
  className?: string;
} & React.ComponentProps<"input">;

/** Label + Input pair used across all form sections. */
export function Field({
  label,
  id,
  required,
  hint,
  className,
  ...inputProps
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      <Input id={id} {...inputProps} />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
