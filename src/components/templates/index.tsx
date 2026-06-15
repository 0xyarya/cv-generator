import type * as React from "react";
import type { TemplateId } from "@/types/cv";
import type { TemplateProps } from "./shared";
import { ClassicTemplate } from "./ClassicTemplate";
import { ModernTemplate } from "./ModernTemplate";
import { MinimalTemplate } from "./MinimalTemplate";

export type TemplateMeta = {
  id: TemplateId;
  name: string;
  description: string;
  Component: (props: TemplateProps) => React.JSX.Element;
};

export const TEMPLATES: TemplateMeta[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Serif elegan, rata tengah, cocok untuk semua bidang.",
    Component: ClassicTemplate,
  },
  {
    id: "modern",
    name: "Modern",
    description: "Sidebar biru dengan aksen warna, kesan profesional.",
    Component: ModernTemplate,
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Bersih, banyak ruang kosong, fokus pada konten.",
    Component: MinimalTemplate,
  },
];

export function getTemplate(id: TemplateId): TemplateMeta {
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
}
