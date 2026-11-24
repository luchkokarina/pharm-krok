
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { drugs } from "../../data/drugs";

export default function DrugsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Усі групи");

  const categories = useMemo(() => {
    return [
      "Усі групи",
      ...Array.from(new Set(drugs.map((drug) => drug.category))),
    ];
  }, []);

  const filteredDrugs = useMemo(() => {
    return drugs.filter((drug) => {
      const matchesSearch =
        drug.name.toLowerCase().includes(search.toLowerCase()) ||
        drug.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "Усі групи" ||
        drug.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#F5F0E9",
        color: "#65574F",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Link
          href="/"
          style={{
            color: "#8C7A70",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          ← На головну
        </Link>

        <div style={{ marginTop: "35px", marginBottom: "30px" }}>
          <p
            style={{
              color: "#A58C83",
              fontSize: "13px",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            PHARM KROK
          </p>

          <h1 style={{ fontSize: "36px", margin: "10px 0" }}>
            Довідник препаратів
          </h1>

          <p style={{ color: "#928078", fontSize: "16px" }}>
            Фармакологія, яку легко вивчати
          </p>
        </div>

        <div
          style={{
            background: "#FFFCF8",
            borderRadius: "20px",
            padding: "22px",
            marginBottom: "25px",
            boxShadow: "0 4px 18px rgba(101, 87, 79, 0.05)",
          }}
        >
          <input
            type="text"
            placeholder="⌕  Пошук препарату..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "15px 18px",
              border: "1px solid #E5DAD1",
              borderRadius: "14px",
              background: "#FFFCF8",
              color: "#65574F",
              fontSize: "15px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />

          <div style={{ marginTop: "22px" }}>
            <p
              style={{
                fontSize: "12px",
                color: "#A58C83",
                letterSpacing: "1.5px",
                marginBottom: "13px",
              }}
            >
              ОБЕРИ ФАРМАКОЛОГІЧНУ ГРУПУ
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "9px",
              }}
            >
              {categories.map((category) => {
                const active = selectedCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    style={{
                      border: active
                        ? "1px solid #C9A6A3"
                        : "1px solid #E8DDD5",
                      borderRadius: "30px",
                      padding: "10px 16px",
                      background: active ? "#D9B9B7" : "#F5F0E9",
                      color: "#65574F",
                      fontSize: "13px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "18px",
          }}
        >
          <h2 style={{ fontSize: "20px", margin: 0 }}>
            {selectedCategory === "Усі групи"
              ? "Усі препарати"
              : selectedCategory}
          </h2>

          <span style={{ color: "#9A8980", fontSize: "13px" }}>
            {filteredDrugs.length} / {drugs.length}
          </span>
        </div>

        {filteredDrugs.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "14px",
            }}
          >
            {filteredDrugs.map((drug) => (
              <Link
                key={drug.id}
                href={`/drugs/${drug.id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  background: "#FFFCF8",
                  border: "1px solid #EDE4DC",
                  borderRadius: "16px",
                  padding: "17px",
                  textDecoration: "none",
                  color: "#65574F",
                  transition: "transform 0.2s",
                }}
              >
                <div
                  style={{
                    minWidth: "42px",
                    height: "42px",
                    borderRadius: "13px",
                    background: "#F0E5DF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#9B7773",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  {String(drug.id).padStart(2, "0")}
                </div>

                <div style={{ minWidth: 0 }}>
                  <h3
                    style={{
                      fontSize: "16px",
                      margin: "0 0 5px",
                      fontWeight: 600,
                    }}
                  >
                    {drug.name}
                  </h3>

                  <p
                    style={{
                      fontSize: "12px",
                      color: "#A58C83",
                      margin: 0,
                    }}
                  >
                    {drug.category}
                  </p>
                </div>

                <span
                  style={{
                    marginLeft: "auto",
                    color: "#B49B91",
                    fontSize: "18px",
                  }}
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div
            style={{
              background: "#FFFCF8",
              padding: "35px 20px",
              borderRadius: "16px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "17px" }}>
              Препаратів не знайдено
            </p>
            <p style={{ color: "#9A8980", fontSize: "14px" }}>
              Спробуй змінити пошук або обрати іншу групу
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
