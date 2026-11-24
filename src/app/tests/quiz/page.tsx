
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { questions } from "@/data/questions";

type QuizHistoryItem = {
  id: number;
  date: string;
  topics: string[];
  mode: string;
  total: number;
  correct: number;
  percentage: number;
};

function QuizContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const topicsParam = searchParams.get("topics") || "";
  const countParam = Number(searchParams.get("count")) || 20;
  const mode = searchParams.get("mode") || "training";

  const selectedTopics = topicsParam
    .split("|")
    .map((topic) => topic.trim())
    .filter(Boolean);

  const filteredQuestions = questions.filter((question) => {
    return (
      selectedTopics.length === 0 ||
      selectedTopics.includes(question.topic)
    );
  });

  const quizQuestions = filteredQuestions.slice(0, countParam);

  const storageKey = `pharm-krok-quiz:${mode}:${countParam}:${topicsParam}`;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);
  const [historySaved, setHistorySaved] = useState(false);
  const [restoredKey, setRestoredKey] = useState<string | null>(null);

  // Відновлення збереженого прогресу
  useEffect(() => {
    setCurrentIndex(0);
    setAnswers({});
    setFinished(false);
    setHistorySaved(false);

    try {
      const savedData = localStorage.getItem(storageKey);

      if (savedData) {
        const parsed = JSON.parse(savedData);

        if (
          typeof parsed === "object" &&
          parsed !== null &&
          typeof parsed.currentIndex === "number" &&
          typeof parsed.answers === "object" &&
          parsed.answers !== null &&
          typeof parsed.finished === "boolean"
        ) {
          setCurrentIndex(
            Math.min(
              Math.max(parsed.currentIndex, 0),
              Math.max(quizQuestions.length - 1, 0)
            )
          );

          setAnswers(parsed.answers);
          setFinished(parsed.finished);
          setHistorySaved(parsed.historySaved ?? parsed.finished ?? false);
        }
      }
    } catch (error) {
      console.error("Не вдалося відновити прогрес:", error);
    }

    setRestoredKey(storageKey);
  }, [storageKey, quizQuestions.length]);

  // Автоматичне збереження прогресу
  useEffect(() => {
    if (restoredKey !== storageKey) return;

    try {
      const progressData = {
        currentIndex,
        answers,
        finished,
        historySaved,
      };

      localStorage.setItem(
        storageKey,
        JSON.stringify(progressData)
      );
    } catch (error) {
      console.error("Не вдалося зберегти прогрес:", error);
    }
  }, [
    currentIndex,
    answers,
    finished,
    historySaved,
    storageKey,
    restoredKey,
  ]);

  const currentQuestion = quizQuestions[currentIndex];
  const currentAnswer = answers[currentQuestion?.id];

  const correctCount = quizQuestions.filter(
    (question) => answers[question.id] === question.correctAnswer
  ).length;

  const progress =
    quizQuestions.length > 0
      ? ((currentIndex + 1) / quizQuestions.length) * 100
      : 0;

  // Збереження завершеного тесту в історію
  useEffect(() => {
    if (!finished || historySaved || restoredKey !== storageKey) {
      return;
    }

    try {
      const savedHistory = localStorage.getItem("pharm-krok-history");

      const history: QuizHistoryItem[] = savedHistory
        ? JSON.parse(savedHistory)
        : [];

      const percentage = Math.round(
        (correctCount / quizQuestions.length) * 100
      );

      const newResult: QuizHistoryItem = {
        id: Date.now(),
        date: new Date().toISOString(),
        topics: selectedTopics.length > 0
          ? selectedTopics
          : ["Усі теми"],
        mode,
        total: quizQuestions.length,
        correct: correctCount,
        percentage,
      };

      localStorage.setItem(
        "pharm-krok-history",
        JSON.stringify([newResult, ...history])
      );

      setHistorySaved(true);
    } catch (error) {
      console.error("Не вдалося зберегти результат:", error);
    }
  }, [
    finished,
    historySaved,
    restoredKey,
    storageKey,
    correctCount,
    quizQuestions.length,
    selectedTopics,
    mode,
  ]);

  function selectAnswer(index: number) {
    if (finished) return;
    if (mode === "training" && currentAnswer !== undefined) return;

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: index,
    }));
  }

  function nextQuestion() {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((previous) => previous + 1);
    } else {
      setFinished(true);
    }
  }

  function previousQuestion() {
    if (currentIndex > 0) {
      setCurrentIndex((previous) => previous - 1);
    }
  }

  function restartQuiz() {
    setCurrentIndex(0);
    setAnswers({});
    setFinished(false);
    setHistorySaved(false);
  }

  if (quizQuestions.length === 0) {
    return (
      <main className="min-h-screen bg-[#F5F0E9] text-[#65574F] p-6">
        <div className="max-w-2xl mx-auto pt-20 text-center">
          <h1 className="text-2xl font-semibold mb-4">
            Тести не знайдено
          </h1>
          <p className="mb-8">
            Для обраних тем поки немає запитань.
          </p>
          <button
            onClick={() => router.push("/tests")}
            className="rounded-2xl bg-[#788C72] text-white px-6 py-3"
          >
            Повернутися до вибору тестів
          </button>
        </div>
      </main>
    );
  }

  if (finished) {
    const percentage = Math.round(
      (correctCount / quizQuestions.length) * 100
    );

    return (
      <main className="min-h-screen bg-[#F5F0E9] text-[#65574F] px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#FFFCF8] rounded-[28px] p-8 shadow-sm text-center">
            <div className="text-5xl mb-5">
              {percentage >= 80 ? "🌿" : percentage >= 60 ? "🌸" : "📚"}
            </div>

            <h1 className="text-3xl font-semibold mb-3">
              Тест завершено!
            </h1>

            <p className="text-[#92877F] mb-8">
              Чудова робота! Переглянь свої результати.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="bg-[#F5F0E9] rounded-2xl p-4">
                <div className="text-2xl font-bold">{percentage}%</div>
                <div className="text-sm text-[#92877F]">Результат</div>
              </div>

              <div className="bg-[#F5F0E9] rounded-2xl p-4">
                <div className="text-2xl font-bold text-[#788C72]">
                  {correctCount}
                </div>
                <div className="text-sm text-[#92877F]">Правильно</div>
              </div>

              <div className="bg-[#F5F0E9] rounded-2xl p-4">
                <div className="text-2xl font-bold text-[#C58E89]">
                  {quizQuestions.length - correctCount}
                </div>
                <div className="text-sm text-[#92877F]">Помилки</div>
              </div>
            </div>

            <div className="text-left space-y-4 mb-8">
              <h2 className="text-xl font-semibold">
                Розбір відповідей
              </h2>

              {quizQuestions.map((question, index) => {
                const userAnswer = answers[question.id];
                const isCorrect =
                  userAnswer === question.correctAnswer;

                return (
                  <div
                    key={question.id}
                    className="rounded-2xl bg-[#F5F0E9] p-5"
                  >
                    <div className="flex justify-between gap-3 mb-3">
                      <span className="font-medium">
                        Питання {index + 1}
                      </span>
                      <span
                        className={
                          isCorrect
                            ? "text-[#788C72] font-semibold"
                            : "text-[#C58E89] font-semibold"
                        }
                      >
                        {isCorrect ? "Правильно" : "Помилка"}
                      </span>
                    </div>

                    <p className="mb-3">{question.question}</p>

                    <p className="text-sm mb-2">
                      <span className="font-semibold">
                        Правильна відповідь:
                      </span>{" "}
                      {question.options[question.correctAnswer]}
                    </p>

                    {!isCorrect && userAnswer !== undefined && (
                      <p className="text-sm text-[#C58E89] mb-2">
                        Твоя відповідь: {question.options[userAnswer]}
                      </p>
                    )}

                    <p className="text-sm text-[#92877F] mt-3">
                      {question.explanation}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={restartQuiz}
                className="rounded-2xl bg-[#788C72] text-white px-6 py-3"
              >
                Пройти ще раз
              </button>

              <button
                onClick={() => router.push("/tests")}
                className="rounded-2xl bg-[#EAE1D7] px-6 py-3"
              >
                До вибору тестів
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F0E9] text-[#65574F] px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.push("/tests")}
          className="text-sm text-[#92877F] hover:text-[#65574F] mb-7"
        >
          ← Повернутися до налаштувань
        </button>

        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-[#92877F]">
            Питання {currentIndex + 1} із {quizQuestions.length}
          </span>

          <span className="text-sm rounded-full bg-[#EAE1D7] px-4 py-2">
            {mode === "training" ? "Режим навчання" : "Екзамен"}
          </span>
        </div>

        <div className="w-full h-2 rounded-full bg-[#E2D7CC] mb-8 overflow-hidden">
          <div
            className="h-full bg-[#788C72] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="bg-[#FFFCF8] rounded-[28px] p-6 sm:p-9 shadow-sm">
          <div className="text-sm text-[#92877F] mb-4">
            {currentQuestion.topic}
          </div>

          <h1 className="text-xl sm:text-2xl font-semibold leading-relaxed mb-8">
            {currentQuestion.question}
          </h1>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = currentAnswer === index;
              const isCorrect =
                index === currentQuestion.correctAnswer;

              let optionStyle =
                "border-[#E2D7CC] bg-[#FFFCF8] hover:border-[#A8B5A0]";

              if (isSelected) {
                optionStyle = "border-[#788C72] bg-[#EAF0E7]";
              }

              if (
                mode === "training" &&
                currentAnswer !== undefined
              ) {
                if (isCorrect) {
                  optionStyle = "border-[#788C72] bg-[#EAF0E7]";
                } else if (isSelected && !isCorrect) {
                  optionStyle = "border-[#D9B9B7] bg-[#F8EDEC]";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  disabled={
                    mode === "training" &&
                    currentAnswer !== undefined
                  }
                  className={`w-full text-left border-2 rounded-2xl p-4 transition-all ${optionStyle} disabled:cursor-default`}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F5F0E9] flex items-center justify-center text-sm font-semibold">
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span className="pt-1">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {mode === "training" && currentAnswer !== undefined && (
            <div className="mt-6 rounded-2xl bg-[#F5F0E9] p-5">
              <p
                className={`font-semibold mb-2 ${
                  currentAnswer === currentQuestion.correctAnswer
                    ? "text-[#788C72]"
                    : "text-[#C58E89]"
                }`}
              >
                {currentAnswer === currentQuestion.correctAnswer
                  ? "Правильно! 🌿"
                  : "Не зовсім правильно"}
              </p>

              <p className="text-sm leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          <div className="flex justify-between gap-3 mt-8">
            <button
              onClick={previousQuestion}
              disabled={currentIndex === 0}
              className="rounded-2xl bg-[#EAE1D7] px-5 py-3 disabled:opacity-40"
            >
              Назад
            </button>

            <button
              onClick={nextQuestion}
              disabled={
                mode === "training" && currentAnswer === undefined
              }
              className="rounded-2xl bg-[#788C72] text-white px-6 py-3 disabled:opacity-40"
            >
              {currentIndex === quizQuestions.length - 1
                ? "Завершити тест"
                : "Наступне питання →"}
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-[#92877F] mt-5">
          ✓ Прогрес зберігається автоматично
        </p>

        {mode === "exam" && (
          <p className="text-center text-sm text-[#92877F] mt-2">
            Відповіді будуть перевірені після завершення тесту.
          </p>
        )}
      </div>
    </main>
  );
}

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F5F0E9] flex items-center justify-center text-[#65574F]">
          Завантаження тесту...
        </div>
      }
    >
      <QuizContent />
    </Suspense>
  );
}
