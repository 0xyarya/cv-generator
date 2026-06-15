# CV Generator — Frontend

A standalone React (Vite + TypeScript) app for building a CV through an
intuitive multi-section form, previewing it against professional templates, and
exporting it to PDF entirely client-side. Part of the Clarate platform.

## Stack

- **React 19 + Vite 6 + TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **shadcn/ui** components (Radix primitives) — `src/components/ui`
- **html2pdf.js** — client-side PDF generation
- **zod** — typing alignment with backend validation

Primary color is white; the blue accent is `#2B7FFF` (see `src/index.css`).

## Getting started

```bash
npm install
cp .env.example .env      # adjust if your backend is not on localhost:3001
npm run dev               # http://localhost:2030
```

### Environment

| Variable              | Default                 | Purpose                                                        |
| --------------------- | ----------------------- | -------------------------------------------------------------- |
| `VITE_API_BASE_URL`   | `http://localhost:3001` | Base URL of `web-admin-backend`.                               |
| `VITE_CLIENT_TOKEN`   | `clarateClientId`       | Baseline app credential (`ClientToken` header). Must match `TOKEN_CLIENT` in the backend `.env`. Not admin/JWT auth. |

## Features

- **Multi-section accordion form**: Header/Contact, Biodata, Education (array),
  Work Experience (array), Projects (array), Skills, Hobbies — with dynamic
  "Tambah" / "Hapus" controls for repeatable sections.
- **Validation gate**: "Generate CV" is blocked until every section has at
  least one complete, valid entry. Incomplete sections are listed and expanded.
- **Template selector + live preview**: 3 templates (Classic, Modern, Minimal),
  rendered live at A4 proportions as you type.
- **Generate flow**:
  1. Validate the form.
  2. `POST` the whole form to `POST /api/cv-generator` (stored as JSON).
  3. Render the chosen template to PDF with `html2pdf.js`.
  4. Show a PDF preview modal with a **Download PDF** button.

## Backend integration

This app talks to the existing `web-admin-backend` service:

- **Endpoint**: `POST /api/cv-generator` (public — no admin auth, but the global
  `ClientMiddleware` still requires the `ClientToken` header).
- **Storage**: table `ms_cv_generator_data`, full submission under the `raw_data`
  JSON column (education & work experience are arrays inside it).

## Project structure

```
src/
  components/
    forms/        # form section components + Field/TagInput helpers
    templates/    # Classic/Modern/Minimal CV templates + registry
    ui/           # shadcn/ui primitives
    CvPreview.tsx       # A4 render surface
    TemplateSelector.tsx
    PdfModal.tsx        # html2pdf generation + preview/download
  lib/
    api.ts        # backend client
    validation.ts # per-section validation + sanitize
    utils.ts      # cn()
  types/cv.ts     # form data model (mirrors backend raw_data)
  App.tsx
```
