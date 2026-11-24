
"use client";

import { useEffect, useState } from "react";

type QuizHistoryItem = {
  id: number;
  date: string;
  topics: string[];
  mode: string;
  total: number;
  correct: number;
  percentage: number;
};

export default function StatisticsPage() {
  const [history, setHistory] = useState<QuizHistoryItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("pharm-krok-history");

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      }
    } catch (error) {
      console.error("Помилка завантаження статистики:", error);
    }

    setLoaded(true);
  }, []);

  const totalTests = history.length;

  const totalQuestions = history.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const totalCorrect = history.reduce(
    (sum, item) => sum + item.correct,
    0
  );

  const average =
    totalQuestions > 0
      ? Math.round((totalCorrect / totalQuestions) * 100)
      : 0;

  const topicStats = history.reduce<
    Record<string, { total: number; correct: number }>
  >((result, item) => {
    item.topics.forEach((topic) => {
      if (!result[topic]) {
        result[topic] = { total: 0, correct: 0 };
      }

      result[topic].total += item.total;
      result[topic].correct += item.correct;
    });

    return result;
  }, {});

  const topics = Object.entries(topicStats).sort((a, b) => {
    const first = a[1].total
      ? a[1].correct / a[1].total
      : 0;

    const second = b[1].total
      ? b[1].correct / b[1].total
      : 0;

    return second - first;
  });

  function clearHistory() {
    const confirmed = window.confirm(
      "Видалити всю історію тестів?"
    );

    if (!confirmed) return;

    localStorage.removeItem("pharm-krok-history");
    setHistory([]);
  }

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#F5F0E9] flex items-center justify-center text-[#65574F]">
        Завантаження статистики...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F0E9] text-[#65574F] px-4 py-10">
      <div className="max-w-5xl mx-auto">

        <a
          href="/"
          className="text-sm text-[#92877F] hover:text-[#65574F]"
        >
          ← На головну
        </a>

        <div className="mt-8 mb-8">
          <p className="text-sm text-[#92877F] mb-2">
            Твій навчальний прогрес
          </p>

          <h1 className="text-3xl sm:text-4xl font-semibold">
            Моя статистика 🌿
          </h1>

          <p className="text-[#92877F] mt-3">
            Усі твої результати в одному місці.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

          <div className="bg-[#FFFCF8] rounded-3xl p-6 shadow-sm">
            <p className="text-sm text-[#92877F]">
              Пройдено тестів
            </p>
            <p className="text-4xl font-semibold mt-3">
              {totalTests}
            </p>
            <p className="text-sm text-[#92877F] mt-2">
              Завершені спроби
            </p>
          </div>

          <div className="bg-[#FFFCF8] rounded-3xl p-6 shadow-sm">
            <p className="text-sm text-[#92877F]">
              Вирішено питань
            </p>
            <p className="text-4xl font-semibold mt-3">
              {totalQuestions}
            </p>
            <p className="text-sm text-[#92877F] mt-2">
              У всіх тестах
            </p>
          </div>

          <div className="bg-[#FFFCF8] rounded-3xl p-6 shadow-sm">
            <p className="text-sm text-[#92877F]">
              Правильних відповідей
            </p>
            <p className="text-4xl font-semibold mt-3 text-[#788C72]">
              {average}%
            </p>
            <p className="text-sm text-[#92877F] mt-2">
              Загальний відсоток
            </p>
          </div>

        </div>

        <section className="bg-[#FFFCF8] rounded-3xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-5">
            Прогрес за темами
          </h2>

          {topics.length === 0 ? (
            <p className="text-[#92877F]">
              Поки немає завершених тестів.
            </p>
          ) : (
            <div className="space-y-5">
              {topics.map(([topic, stats]) => {
                const percentage = Math.round(
                  (stats.correct / stats.total) * 100
                );

                return (
                  <div key={topic}>
                    <div className="flex justify-between gap-3 mb-2">
                      <span className="text-sm font-medium">
                        {topic}
                      </span>
                      <span className="text-sm text-[#788C72] font-semibold">
                        {percentage}%
                      </span>
                    </div>

                    <div className="h-3 rounded-full bg-[#EAE1D7] overflow-hidden">
                      <div
                        className="h-full bg-[#788C72] rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <p className="text-xs text-[#92877F] mt-2">
                      {stats.correct} правильних із {stats.total}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="bg-[#FFFCF8] rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center gap-3 mb-5">
            <h2 className="text-xl font-semibold">
              Історія тестів
            </h2>

            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-sm text-[#C58E89] hover:underline"
              >
                Очистити історію
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-4xl mb-3">📚</div>
              <p className="font-medium">
                Історія поки порожня
              </p>
              <p className="text-sm text-[#92877F] mt-2">
                Пройди тест, і тут з'явиться твій результат.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#F5F0E9] rounded-2xl p-4"
                >
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="font-semibold">
                        {item.topics.join(", ")}
                      </p>

                      <p className="text-xs text-[#92877F] mt-2">
                        {new Date(item.date).toLocaleString("uk-UA")}
                      </p>

                      <p className="text-sm text-[#92877F] mt-2">
                        {item.mode === "training"
                          ? "Режим навчання"
                          : "Екзамен"}
                        {" · "}
                        {item.correct} із {item.total} правильних
                      </p>
                    </div>

                    <div
                      className={`text-xl font-semibold whitespace-nowrap ${
                        item.percentage >= 80
                          ? "text-[#788C72]"
                          : "text-[#C58E89]"
                      }`}
                    >
                      {item.percentage}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="text-center mt-8">
          <a
            href="/tests"
            className="inline-block rounded-2xl bg-[#788C72] text-white px-7 py-3 hover:opacity-90"
          >
            Перейти до тестів
          </a>
        </div>

      </div>
    </main>
  );
}
