
import Link from "next/link";
import { drugs } from "../../../data/drugs";

export default async function DrugPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const drug = drugs.find((item) => String(item.id) === id);

  if (!drug) {
    return (
      <main style={{ padding: "50px 20px", background: "#F5F0E9", minHeight: "100vh", color: "#65574F" }}>
        <h1>Препарат не знайдено</h1>
        <Link href="/drugs">← Повернутися до довідника</Link>
      </main>
    );
  }

  const sections = [
    { title: "Механізм дії", content: drug.mechanism },
    { title: "Фармакологічні ефекти", content: drug.effects },
    { title: "Показання до застосування", content: drug.indications },
    { title: "Протипоказання", content: drug.contraindications },
    { title: "Побічні реакції", content: drug.sideEffects },
    { title: "Застосування у стоматології", content: drug.dentalUse },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#F5F0E9",
        color: "#65574F",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <Link
          href="/drugs"
          style={{
            color: "#9B8178",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          ← Назад до довідника
        </Link>

        <div
          style={{
            marginTop: "30px",
            background: "#FFFCF8",
            borderRadius: "22px",
            padding: "30px",
            border: "1px solid #EDE4DC",
          }}
        >
          <p
            style={{
              color: "#A58C83",
              fontSize: "13px",
              letterSpacing: "1.5px",
            }}
          >
            ПРЕПАРАТ № {String(drug.id).padStart(2, "0")}
          </p>

          <h1 style={{ fontSize: "34px", margin: "12px 0" }}>
            {drug.name}
          </h1>

          <p style={{ color: "#9A8980", fontSize: "15px" }}>
            {drug.category}
          </p>
        </div>

        <div style={{ marginTop: "22px", display: "grid", gap: "14px" }}>
          {sections.map((section, index) => (
            <section
              key={section.title}
              style={{
                background: "#FFFCF8",
                border: "1px solid #EDE4DC",
                borderRadius: "18px",
                padding: "23px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "11px",
                    background: "#F0E5DF",
                    color: "#9B7773",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 600,
                  }}
                >
                  {index + 1}
                </div>

                <h2 style={{ fontSize: "18px", margin: 0 }}>
                  {section.title}
                </h2>
              </div>

              <p
                style={{
                  marginTop: "16px",
                  lineHeight: 1.7,
                  color: section.content ? "#65574F" : "#A99A91",
                  fontSize: "15px",
                }}
              >
                {section.content || "Навчальний матеріал для цього розділу буде додано."}
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
