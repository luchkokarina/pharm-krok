
const features = [
  {
    number: "01",
    icon: "▤",
    title: "Банк тестів КРОК",
    description:
      "Тисячі тестових завдань із фармакології з поясненнями правильних відповідей.",
    link: "/tests",
    label: "Перейти до тестів",
  },
  {
    number: "02",
    icon: "✳",
    title: "Теорія фармакології",
    description:
      "Зрозумілі конспекти, механізми дії, класифікації та важливі нюанси.",
    link: "/theory",
    label: "Вивчати теорію",
  },
  {
    number: "03",
    icon: "⚕",
    title: "Довідник препаратів",
    description:
      "Фармакологічні групи, показання, побічні ефекти та протипоказання.",
    link: "/drugs",
    label: "Відкрити довідник",
  },
  {
    number: "04",
    icon: "◷",
    title: "Моя статистика",
    description:
      "Відстежуй результати тестів, відсоток правильних відповідей та власний прогрес.",
    link: "/statistics",
    label: "Переглянути статистику",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-strong)] text-xl font-bold text-white">
              P
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight">
                Pharm Krok
              </div>
              <div className="text-xs text-[var(--muted)]">
                Платформа підготовки до КРОК з фармакології
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--muted)] md:flex">
            <a href="#tests" className="transition hover:text-[var(--accent-strong)]">
              Тести
            </a>
            <a href="#theory" className="transition hover:text-[var(--accent-strong)]">
              Теорія
            </a>
            <a href="#drugs" className="transition hover:text-[var(--accent-strong)]">
              Препарати
            </a>
            <a href="#statistics" className="transition hover:text-[var(--accent-strong)]">
              Статистика
            </a>
          </nav>

          <a
            href="#tests"
            className="rounded-xl bg-[var(--accent-strong)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Почати навчання
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12 md:py-20">
        <section className="grid items-center gap-12 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-secondary)] px-4 py-2 text-sm font-medium text-[var(--accent-strong)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent-strong)]" />
              Твій простір для ефективної підготовки
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Фармакологія,
              <span className="text-[var(--accent-strong)]">
                {" "}яку ти розумієш.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
              Готуйся до КРОК системно: розв'язуй тести, вивчай теорію та
              знаходь потрібні препарати в одному місці.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#tests"
                className="rounded-xl bg-[var(--accent-strong)] px-7 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:opacity-90"
              >
                Перейти до тестів →
              </a>
              <a
                href="#theory"
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-7 py-4 font-semibold text-[var(--foreground)] transition hover:border-[var(--pink)]"
              >
                Вивчати теорію
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-[2rem] bg-[var(--pink)] opacity-20 blur-2xl" />
            <div className="relative rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--muted)]">Твоя мета</p>
                  <h2 className="mt-1 text-2xl font-bold">
                    КРОК. Фармакологія
                  </h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-secondary)] text-2xl text-[var(--accent-strong)]">
                  ✚
                </div>
              </div>

              <div className="my-8 rounded-2xl bg-[var(--surface-secondary)] p-5">
                <p className="text-sm font-medium text-[var(--muted)]">
                  Твій навчальний принцип
                </p>
                <p className="mt-2 text-xl font-semibold leading-8">
                  Не просто запам'ятовуй.
                  Розумій механізм дії.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-[var(--border)] p-4">
                  <div className="text-2xl font-bold text-[var(--accent-strong)]">
                    01
                  </div>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    Вивчай матеріал
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--border)] p-4">
                  <div className="text-2xl font-bold text-[var(--accent-strong)]">
                    02
                  </div>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    Закріплюй тестами
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24" id="study">
          <div className="mb-9">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent-strong)]">
              Навчальні інструменти
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Усе необхідне для підготовки
            </h2>
            <p className="mt-3 text-[var(--muted)]">
              Обирай напрямок і навчайся у власному темпі.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature.number}
                id={
                  feature.number === "01"
                    ? "tests"
                    : feature.number === "02"
                      ? "theory"
                      : feature.number === "03"
                        ? "drugs"
                        : "statistics"
                }
                className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 transition duration-200 hover:-translate-y-1 hover:border-[var(--pink)] hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--surface-secondary)] text-2xl text-[var(--accent-strong)]">
                    {feature.icon}
                  </div>
                  <span className="text-sm font-semibold text-[var(--muted)]">
                    {feature.number}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-bold">
                  {feature.title}
                </h3>
                <p className="mt-3 flex-1 leading-7 text-[var(--muted)]">
                  {feature.description}
                </p>
                <a
                  href={feature.link}
                  className="mt-7 font-semibold text-[var(--accent-strong)] transition hover:opacity-70"
                >
                  {feature.label} →
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-3xl border border-[var(--border)] bg-[var(--surface-secondary)] px-8 py-12 md:px-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent-strong)]">
            Твій шлях до результату
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
            Послідовна підготовка починається з одного кроку.
          </h2>
          <p className="mt-4 max-w-xl leading-7 text-[var(--muted)]">
            Розбирай складні теми, тренуйся на тестах і поступово формуй
            впевнені знання з фармакології.
          </p>
          <a
            href="#tests"
            className="mt-8 inline-flex rounded-xl bg-[var(--accent-strong)] px-6 py-3.5 font-semibold text-white transition hover:opacity-90"
          >
            Розпочати підготовку →
          </a>
        </section>

        <footer className="mt-16 flex flex-col justify-between gap-3 border-t border-[var(--border)] pt-7 text-sm text-[var(--muted)] md:flex-row">
          <p>
            © 2026 Pharm Krok
            made by Luchko Karina
          </p>
          <p>Навчайся. Розумій. Складай КРОК.</p>
        </footer>
      </div>
    </main>
  );
}
