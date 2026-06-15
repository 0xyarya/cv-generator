import { ACCENT, INK, SUBTLE, contactItems, hasText } from "./shared";
import type { TemplateProps } from "./shared";

const heading: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: 1.5,
  textTransform: "uppercase",
  color: ACCENT,
  marginBottom: 8,
};

export function ModernTemplate({ data }: TemplateProps) {
  const { header, biodata, educations, work_experiences, projects, skills, hobbies } =
    data;
  const contacts = contactItems(data);

  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        color: INK,
        display: "flex",
        minHeight: "100%",
        fontSize: 12.5,
        lineHeight: 1.5,
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          backgroundColor: ACCENT,
          color: "#ffffff",
          padding: "40px 24px",
          flexShrink: 0,
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
          {header.full_name || "Nama Lengkap"}
        </h1>

        <div style={{ marginTop: 28 }}>
          <h2 style={{ ...heading, color: "#ffffff", opacity: 0.85 }}>Kontak</h2>
          {hasText(header.address) && (
            <p style={{ margin: "0 0 8px", fontSize: 12 }}>{header.address}</p>
          )}
          {contacts.map((c, i) => (
            <p key={i} style={{ margin: "0 0 6px", fontSize: 12, wordBreak: "break-word" }}>
              {c}
            </p>
          ))}
        </div>

        <div style={{ marginTop: 24 }}>
          <h2 style={{ ...heading, color: "#ffffff", opacity: 0.85 }}>Biodata</h2>
          <SideBio label="TTL" value={[biodata.place_of_birth, biodata.date_of_birth].filter(Boolean).join(", ")} />
          <SideBio label="Gender" value={biodata.gender} />
          <SideBio label="Agama" value={biodata.religion} />
          <SideBio label="Warga Negara" value={biodata.nationality} />
          <SideBio label="Status" value={biodata.marital_status} />
        </div>

        {skills.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <h2 style={{ ...heading, color: "#ffffff", opacity: 0.85 }}>Keahlian</h2>
            {skills.map((s, i) => (
              <p key={i} style={{ margin: "0 0 4px", fontSize: 12 }}>• {s}</p>
            ))}
          </div>
        )}

        {hobbies.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <h2 style={{ ...heading, color: "#ffffff", opacity: 0.85 }}>Hobi</h2>
            {hobbies.map((h, i) => (
              <p key={i} style={{ margin: "0 0 4px", fontSize: 12 }}>• {h}</p>
            ))}
          </div>
        )}
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "40px 36px" }}>
        {work_experiences.length > 0 && (
          <section style={{ marginBottom: 26 }}>
            <h2 style={heading}>Pengalaman Kerja</h2>
            {work_experiences.map((w, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong style={{ fontSize: 14 }}>{w.position}</strong>
                  <span style={{ color: SUBTLE, fontSize: 12 }}>
                    {[w.start_date, w.end_date].filter(Boolean).join(" – ")}
                  </span>
                </div>
                <div style={{ color: ACCENT, fontWeight: 600 }}>{w.company}</div>
                {hasText(w.description) && (
                  <p style={{ margin: "4px 0 0", color: SUBTLE }}>{w.description}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {educations.length > 0 && (
          <section style={{ marginBottom: 26 }}>
            <h2 style={heading}>Pendidikan</h2>
            {educations.map((e, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <strong style={{ fontSize: 14 }}>
                  {e.degree} {e.field_of_study ? `— ${e.field_of_study}` : ""}
                </strong>
                <div style={{ color: ACCENT, fontWeight: 600 }}>{e.institution}</div>
                <span style={{ color: SUBTLE, fontSize: 12 }}>
                  {[e.start_year, e.end_year].filter(Boolean).join(" – ")}
                </span>
                {hasText(e.description) && (
                  <p style={{ margin: "4px 0 0", color: SUBTLE }}>{e.description}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 style={heading}>Proyek</h2>
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <strong style={{ fontSize: 14 }}>{p.name}</strong>
                {hasText(p.role) && <span style={{ color: SUBTLE }}> — {p.role}</span>}
                {hasText(p.tech_stack) && (
                  <div style={{ color: ACCENT, fontSize: 12 }}>{p.tech_stack}</div>
                )}
                {hasText(p.description) && (
                  <p style={{ margin: "4px 0 0", color: SUBTLE }}>{p.description}</p>
                )}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

function SideBio({ label, value }: { label: string; value: string }) {
  if (!hasText(value)) return null;
  return (
    <p style={{ margin: "0 0 6px", fontSize: 12 }}>
      <span style={{ opacity: 0.8 }}>{label}: </span>
      {value}
    </p>
  );
}
