import { ACCENT, INK, SUBTLE, LINE, contactItems, hasText } from "./shared";
import type { TemplateProps } from "./shared";

const heading: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: 2,
  textTransform: "uppercase",
  color: SUBTLE,
  marginBottom: 10,
};

export function MinimalTemplate({ data }: TemplateProps) {
  const { header, biodata, educations, work_experiences, projects, skills, hobbies } =
    data;
  const contacts = contactItems(data);

  return (
    <div
      style={{
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        color: INK,
        padding: "52px 56px",
        fontSize: 13,
        lineHeight: 1.55,
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 300,
            letterSpacing: 1,
            margin: 0,
            color: INK,
          }}
        >
          {header.full_name || "Nama Lengkap"}
        </h1>
        <div
          style={{
            width: 48,
            height: 3,
            backgroundColor: ACCENT,
            margin: "14px 0",
          }}
        />
        {hasText(header.address) && (
          <p style={{ margin: "0 0 2px", color: SUBTLE }}>{header.address}</p>
        )}
        {contacts.length > 0 && (
          <p style={{ margin: 0, color: SUBTLE, fontSize: 12 }}>
            {contacts.join("   |   ")}
          </p>
        )}
      </header>

      <Row label="Biodata">
        <p style={{ margin: 0 }}>
          {[
            [biodata.place_of_birth, biodata.date_of_birth].filter(Boolean).join(", "),
            biodata.gender,
            biodata.religion,
            biodata.nationality,
            biodata.marital_status,
          ]
            .filter(hasText)
            .join("  ·  ")}
        </p>
      </Row>

      {work_experiences.length > 0 && (
        <Row label="Pengalaman">
          {work_experiences.map((w, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 600 }}>
                {w.position}
                {hasText(w.company) ? `, ${w.company}` : ""}
              </div>
              <div style={{ color: SUBTLE, fontSize: 12 }}>
                {[w.start_date, w.end_date].filter(Boolean).join(" – ")}
              </div>
              {hasText(w.description) && (
                <p style={{ margin: "2px 0 0", color: SUBTLE }}>{w.description}</p>
              )}
            </div>
          ))}
        </Row>
      )}

      {educations.length > 0 && (
        <Row label="Pendidikan">
          {educations.map((e, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 600 }}>
                {e.degree} {e.field_of_study ? `— ${e.field_of_study}` : ""}
              </div>
              <div style={{ color: SUBTLE, fontSize: 12 }}>
                {e.institution}
                {[e.start_year, e.end_year].filter(Boolean).length
                  ? `  (${[e.start_year, e.end_year].filter(Boolean).join(" – ")})`
                  : ""}
              </div>
            </div>
          ))}
        </Row>
      )}

      {projects.length > 0 && (
        <Row label="Proyek">
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <span style={{ fontWeight: 600 }}>{p.name}</span>
              {hasText(p.tech_stack) && (
                <span style={{ color: SUBTLE }}> · {p.tech_stack}</span>
              )}
              {hasText(p.description) && (
                <p style={{ margin: "2px 0 0", color: SUBTLE }}>{p.description}</p>
              )}
            </div>
          ))}
        </Row>
      )}

      {skills.length > 0 && (
        <Row label="Keahlian">
          <p style={{ margin: 0 }}>{skills.join("  ·  ")}</p>
        </Row>
      )}

      {hobbies.length > 0 && (
        <Row label="Hobi" last>
          <p style={{ margin: 0 }}>{hobbies.join("  ·  ")}</p>
        </Row>
      )}
    </div>
  );
}

function Row({
  label,
  children,
  last,
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr",
        gap: 16,
        paddingBottom: last ? 0 : 18,
        marginBottom: last ? 0 : 18,
        borderBottom: last ? "none" : `1px solid ${LINE}`,
      }}
    >
      <h2 style={heading}>{label}</h2>
      <div>{children}</div>
    </section>
  );
}
