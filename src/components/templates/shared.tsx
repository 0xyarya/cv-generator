import type { CvFormData } from "@/types/cv";

export const ACCENT = "#2B7FFF";
export const INK = "#0f172a";
export const SUBTLE = "#475569";
export const LINE = "#e2e8f0";

export type TemplateProps = {
  data: CvFormData;
};

/** Build the contact line items present in the header. */
export function contactItems(data: CvFormData): string[] {
  const h = data.header;
  return [h.phone, h.email, h.linkedin, h.website].filter(
    (v) => v && v.trim().length > 0
  ) as string[];
}

export function hasText(v?: string): boolean {
  return Boolean(v && v.trim().length > 0);
}
