import { ACCENT, INK, SUBTLE, LINE, contactItems, hasText } from "./shared";
import type { TemplateProps } from "./shared";

const sectionTitle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: 1,
  textTransform: "uppercase",
  color: ACCENT,
  borderBottom: `2px solid ${ACCENT}`,
  paddingBottom: 4,
  marginBottom: 10,
};

export function ClassicTemplate({ data }: TemplateProps) {
  const { header, biodata, educations, work_experiences, projects, skills, hobbies } =
    data;
  const contacts = contactItems(data);

  return (
    <div
      style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        color: INK,
        padding: "44px 48px",
        lineHeight: 1.5,
        fontSize: 13,
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, margin: 0, color: INK }}>
          {header.full_name || "Nama Lengkap"}
        </h1>
        {hasText(header.address) && (
          <p style={{ margin: "6px 0 0", color: SUBTLE }}>{header.address}</p>
        )}
        {contacts.length > 0 && (
          <p style={{ margin: "4px 0 0", color: SUBTLE, fontSize: 12 }}>
            {contacts.join("  •  ")}
          </p>
        )}
      </div>
      <div style={{ borderBottom: `1px solid ${LINE}`, margin: "16px 0 22px" }} />

      {/* Biodata */}
      <section style={{ marginBottom: 22 }}>
        <h2 style={sectionTitle}>Biodata</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
          <Bio label="Tempat, Tanggal Lahir" value={joinTtl(biodata)} />
          <Bio label="Jenis Kelamin" value={biodata.gender} />
          <Bio label="Agama" value={biodata.religion} />
          <Bio label="Kewarganegaraan" value={biodata.nationality} />
          <Bio label="Status" value={biodata.marital_status} />
        </div>
      </section>

      {/* Education */}
      {educations.length > 0 && (
        <section style={{ marginBottom: 22 }}>
          <h2 style={sectionTitle}>Pendidikan</h2>
          {educations.map((e, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>
                  {e.degree} {e.field_of_study ? `— ${e.field_of_study}` : ""}
                </strong>
                <span style={{ color: SUBTLE }}>
                  {[e.start_year, e.end_year].filter(Boolean).join(" – ")}
                </span>
              </div>
              <div style={{ color: SUBTLE }}>{e.institution}</div>
              {hasText(e.description) && <p style={{ margin: "2px 0 0" }}>{e.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Work */}
      {work_experiences.length > 0 && (
        <section style={{ marginBottom: 22 }}>
          <h2 style={sectionTitle}>Pengalaman Kerja</h2>
          {work_experiences.map((w, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{w.position}</strong>
                <span style={{ color: SUBTLE }}>
                  {[w.start_date, w.end_date].filter(Boolean).join(" – ")}
                </span>
              </div>
              <div style={{ color: SUBTLE }}>{w.company}</div>
              {hasText(w.description) && <p style={{ margin: "2px 0 0" }}>{w.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section style={{ marginBottom: 22 }}>
          <h2 style={sectionTitle}>Proyek</h2>
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <strong>{p.name}</strong>
              {hasText(p.role) && <span style={{ color: SUBTLE }}> — {p.role}</span>}
              {hasText(p.tech_stack) && (
                <div style={{ color: SUBTLE, fontSize: 12 }}>{p.tech_stack}</div>
              )}
              {hasText(p.description) && <p style={{ margin: "2px 0 0" }}>{p.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ marginBottom: 22 }}>
          <h2 style={sectionTitle}>Keahlian</h2>
          <p style={{ margin: 0 }}>{skills.join(", ")}</p>
        </section>
      )}

      {/* Hobbies */}
      {hobbies.length > 0 && (
        <section>
          <h2 style={sectionTitle}>Hobi</h2>
          <p style={{ margin: 0 }}>{hobbies.join(", ")}</p>
        </section>
      )}
    </div>
  );
}

function Bio({ label, value }: { label: string; value: string }) {
  if (!hasText(value)) return null;
  return (
    <div>
      <span style={{ color: SUBTLE }}>{label}: </span>
      <span>{value}</span>
    </div>
  );
}

function joinTtl(b: { place_of_birth: string; date_of_birth: string }): string {
  return [b.place_of_birth, b.date_of_birth].filter(Boolean).join(", ");
}
