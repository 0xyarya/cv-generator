import type { CvFormData } from "@/types/cv";

export type SectionKey =
  | "header"
  | "biodata"
  | "educations"
  | "work_experiences"
  | "projects"
  | "skills"
  | "hobbies";

export type ValidationErrors = Partial<Record<SectionKey, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const has = (v?: string) => Boolean(v && v.trim().length > 0);

/**
 * Validate that every section has at least one complete & valid entry.
 * Returns a map of section -> error message; empty map means valid.
 */
export function validateForm(form: CvFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  // Header / Title — needs name + at least one way to be contacted, valid email
  if (!has(form.header.full_name)) {
    errors.header = "Nama lengkap wajib diisi.";
  } else if (!has(form.header.email) && !has(form.header.phone)) {
    errors.header = "Isi minimal email atau nomor telepon.";
  } else if (has(form.header.email) && !EMAIL_RE.test(form.header.email.trim())) {
    errors.header = "Format email tidak valid.";
  }

  // Biodata — name, gender required (TTL & marital status strongly recommended)
  if (!has(form.biodata.full_name)) {
    errors.biodata = "Nama lengkap wajib diisi.";
  } else if (!has(form.biodata.gender)) {
    errors.biodata = "Jenis kelamin wajib dipilih.";
  } else if (!has(form.biodata.place_of_birth) || !has(form.biodata.date_of_birth)) {
    errors.biodata = "Tempat & tanggal lahir wajib diisi.";
  }

  // Education — at least one entry with institution + degree
  if (
    !form.educations.some((e) => has(e.institution) && has(e.degree))
  ) {
    errors.educations =
      "Lengkapi minimal satu data pendidikan (institusi & jenjang).";
  }

  // Work experience — at least one entry with company + position
  if (
    !form.work_experiences.some((w) => has(w.company) && has(w.position))
  ) {
    errors.work_experiences =
      "Lengkapi minimal satu pengalaman kerja (perusahaan & posisi).";
  }

  // Projects — at least one entry with a name
  if (!form.projects.some((p) => has(p.name))) {
    errors.projects = "Lengkapi minimal satu proyek (nama proyek).";
  }

  // Skills — at least one
  if (!form.skills.some((s) => has(s))) {
    errors.skills = "Tambahkan minimal satu keahlian.";
  }

  // Hobbies — at least one
  if (!form.hobbies.some((h) => has(h))) {
    errors.hobbies = "Tambahkan minimal satu hobi.";
  }

  return errors;
}

/**
 * Clean the form before submission: drop empty array rows / strings so the
 * stored JSON matches the backend validation (min 1 item per array).
 */
export function sanitizeForm(form: CvFormData): CvFormData {
  return {
    ...form,
    educations: form.educations.filter((e) => has(e.institution)),
    work_experiences: form.work_experiences.filter(
      (w) => has(w.company) && has(w.position)
    ),
    projects: form.projects.filter((p) => has(p.name)),
    skills: form.skills.map((s) => s.trim()).filter(has),
    hobbies: form.hobbies.map((h) => h.trim()).filter(has),
  };
}

export const SECTION_LABELS: Record<SectionKey, string> = {
  header: "Header & Kontak",
  biodata: "Biodata",
  educations: "Pendidikan",
  work_experiences: "Pengalaman Kerja",
  projects: "Proyek",
  skills: "Keahlian",
  hobbies: "Hobi",
};
