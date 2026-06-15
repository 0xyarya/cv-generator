import * as React from "react";
import type { CvFormData } from "@/types/cv";
import { getTemplate } from "@/components/templates";

type Props = {
  data: CvFormData;
};

/**
 * Renders the selected template at A4 proportions (210mm x 297mm).
 * The forwarded ref points at the actual page node consumed by html2pdf.
 */
export const CvPreview = React.forwardRef<HTMLDivElement, Props>(
  ({ data }, ref) => {
    const { Component } = getTemplate(data.template);
    return (
      <div
        ref={ref}
        className="cv-page"
        style={{
          width: "210mm",
          minHeight: "297mm",
          backgroundColor: "#ffffff",
          boxShadow: "0 1px 3px rgba(15,23,42,0.12)",
          overflow: "hidden",
        }}
      >
        <Component data={data} />
      </div>
    );
  }
);
CvPreview.displayName = "CvPreview";
