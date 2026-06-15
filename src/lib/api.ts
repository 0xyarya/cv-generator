import type { CvFormData } from "@/types/cv";

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(
    /\/$/,
    ""
  ) || "http://localhost:3001";

// Baseline app credential sent by every Clarate frontend (ClientMiddleware).
// This is NOT admin/JWT auth — it only identifies the calling app.
const CLIENT_TOKEN =
  (import.meta.env.VITE_CLIENT_TOKEN as string | undefined) || "clarateClientId";

export type ApiEnvelope<T> = {
  error: boolean;
  code: string;
  message: string;
  data: T;
};

export type CvSubmissionResult = {
  id: string;
  full_name: string | null;
  email: string | null;
  template: string | null;
};

/**
 * Submit the CV form data to the web-admin-backend.
 * The whole form is stored as a single JSON object under `raw_data`.
 */
export async function submitCv(
  form: CvFormData
): Promise<CvSubmissionResult> {
  const res = await fetch(`${API_BASE_URL}/api/cv-generator`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ClientToken: CLIENT_TOKEN,
    },
    body: JSON.stringify({ raw_data: form }),
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      (body && (body.errors || body.message)) ||
      `Gagal menyimpan data (HTTP ${res.status})`;
    throw new Error(
      typeof message === "string" ? message : "Gagal menyimpan data CV."
    );
  }

  return (body as ApiEnvelope<CvSubmissionResult>).data;
}
