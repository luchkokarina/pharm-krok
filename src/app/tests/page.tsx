
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";

const questionCounts = [10, 20, 30, 50, 100];

type TestMode = "training" | "exam";

export default function TestsPage() {
  const router = useRouter();

  const topics = useMemo(
    () => Array.from(new Set(questions.map((question) => question.topic))).sort(),
    []
  );

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState(20);
  const [mode, setMode] = useState<TestMode>("training");

  const availableQuestions = useMemo(() => {
    return questions.filter(
      (question) =>
        selectedTopics.length === 0 ||
        selectedTopics.includes(question.topic)
    ).length;
  }, [selectedTopics]);

  const actualQuestionCount = Math.min(
    questionCount,
    availableQuestions
  );

  function toggleTopic(topic: string) {
    setSelectedTopics((current) =>
      current.includes(topic)
        ? current.filter((item) => item !== topic)
        : [...current, topic]
    );
  }

  function startTest() {
    const params = new URLSearchParams({
      topics: selectedTopics.join("|"),
      count: String(actualQuestionCount),
      mode,
    });

    router.push(`/tests/quiz?${params.toString()}`);
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8 text-[var(--foreground)] sm:px-6 lg:py-12">
      <div className="mx-auto max-w-5xl">

        <button
          type="button"
          onClick={() => router.push("/")}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--muted)] transition hover:border-[var(--accent-strong)] hover:text-[var(--foreground)]"
        >
          <span>←</span>
          На головну
        </button>

        <div className="mb-9">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-strong)]">
            Pharm Krok · Практика
          </p>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Налаштування тесту
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">
            Обери теми, кількість запитань та режим тестування.
            Перевір свої знання з фармакології у зручному форматі.
          </p>
        </div>

        {/* ВИБІР ТЕМ */}

        <section className="mb-7 rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm sm:p-7">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
                Крок 01
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                Обери теми
              </h2>

              <p className="mt-1 text-sm text-[var(--muted)]">
                Можна обрати одну або декілька тем.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedTopics([])}
              className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                selectedTopics.length === 0
                  ? "bg-[var(--accent)]/25 text-[var(--foreground)]"
                  : "text-[var(--accent-strong)] hover:bg-[var(--surface-secondary)]"
              }`}
            >
              Усі теми
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => {
              const active = selectedTopics.includes(topic);

              const count = questions.filter(
                (question) => question.topic === topic
              ).length;

              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => toggleTopic(topic)}
                  aria-pressed={active}
                  className={`rounded-full border px-4 py-3 text-sm transition-all duration-200 ${
                    active
                      ? "border-[var(--accent-strong)] bg-[var(--accent)]/25 font-semibold text-[var(--foreground)] shadow-sm"
                      : "border-[var(--border)] bg-[var(--background)] text-[var(--muted)] hover:border-[var(--accent-strong)] hover:bg-[var(--surface-secondary)]"
                  }`}
                >
                  <span className="mr-2 text-xs">
                    {active ? "✓" : "+"}
                  </span>

                  {topic}

                  <span className="ml-2 text-xs opacity-60">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
            <span>
              {selectedTopics.length === 0
                ? "Обрана вся база запитань"
                : `Обрано тем: ${selectedTopics.length}`}
            </span>
          </div>
        </section>

        {/* КІЛЬКІСТЬ ЗАПИТАНЬ */}

        <section className="mb-7 rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
            Крок 02
          </p>

          <h2 className="mt-1 text-xl font-semibold">
            Кількість запитань
          </h2>

          <p className="mt-1 text-sm text-[var(--muted)]">
            Обери, скільки запитань хочеш пройти за один раз.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {questionCounts.map((count) => {
              const active = questionCount === count;
              const disabled = count > availableQuestions;

              return (
                <button
                  key={count}
                  type="button"
                  disabled={disabled}
                  onClick={() => setQuestionCount(count)}
                  aria-pressed={active}
                  className={`min-w-[65px] rounded-full border px-5 py-3 text-sm font-semibold transition ${
                    active
                      ? "border-[var(--accent-strong)] bg-[var(--accent)]/25 text-[var(--foreground)] shadow-sm"
                      : disabled
                        ? "cursor-not-allowed border-[var(--border)] opacity-30"
                        : "border-[var(--border)] bg-[var(--background)] text-[var(--muted)] hover:border-[var(--accent-strong)]"
                  }`}
                >
                  {count}
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-xs text-[var(--muted)]">
            Доступно запитань: {availableQuestions}
          </p>
        </section>

        {/* РЕЖИМ ТЕСТУВАННЯ */}

        <section className="mb-7 rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
            Крок 03
          </p>

          <h2 className="mt-1 text-xl font-semibold">
            Режим тестування
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">

            <button
              type="button"
              onClick={() => setMode("training")}
              aria-pressed={mode === "training"}
              className={`rounded-2xl border p-5 text-left transition ${
                mode === "training"
                  ? "border-[var(--accent-strong)] bg-[var(--accent)]/20"
                  : "border-[var(--border)] bg-[var(--background)] hover:border-[var(--accent-strong)]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">
                  Тренувальний
                </span>

                <span className="text-lg">
                  ✏️
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
                Перегляд правильних відповідей та пояснень
                під час проходження тесту.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setMode("exam")}
              aria-pressed={mode === "exam"}
              className={`rounded-2xl border p-5 text-left transition ${
                mode === "exam"
                  ? "border-[var(--accent-strong)] bg-[var(--accent)]/20"
                  : "border-[var(--border)] bg-[var(--background)] hover:border-[var(--accent-strong)]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">
                  Екзаменаційний
                </span>

                <span className="text-lg">
                  🎓
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
                Без підказок під час тестування.
                Результат та правильні відповіді наприкінці.
              </p>
            </button>

          </div>
        </section>

        {/* ПІДСУМОК */}

        <section className="rounded-[28px] border border-[var(--border)] bg-[var(--surface-secondary)]/70 p-5 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
                Твій тест
              </p>

              <p className="mt-1 text-lg font-semibold">
                {actualQuestionCount} запитань
              </p>

              <p className="mt-1 text-sm text-[var(--muted)]">
                {selectedTopics.length === 0
                  ? "Усі теми фармакології"
                  : `Обрано тем: ${selectedTopics.length}`}
              </p>

              <p className="mt-1 text-sm text-[var(--muted)]">
                {mode === "training"
                  ? "Тренувальний режим"
                  : "Екзаменаційний режим"}
              </p>
            </div>

            <button
              type="button"
              onClick={startTest}
              disabled={availableQuestions === 0}
              className="rounded-full bg-[var(--accent-strong)] px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Почати тест
              <span className="ml-2">→</span>
            </button>

          </div>
        </section>

      </div>
    </main>
  );
}
