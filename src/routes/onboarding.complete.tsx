import { Link, createFileRoute } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/onboarding/complete")({
  head: () => ({
    meta: [
      { title: "Бриф сохранён · Avreya" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CompletePage,
});

function CompletePage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(60%_45%_at_50%_20%,color-mix(in_oklab,var(--color-accent)_10%,transparent)_0%,transparent_70%)]"
      />
      <div className="relative">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface shadow-lift">
          <Check className="h-6 w-6 text-accent" strokeWidth={2.25} />
        </div>
        <div className="mt-8 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
          Бриф сохранён
        </div>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-[-0.03em] text-foreground md:text-5xl">
          Готово. Дальше — запуск.
        </h1>
        <p className="mx-auto mt-4 max-w-[520px] text-[15px] leading-relaxed text-ink-muted md:text-base">
          Мы настроим AI-менеджера под ваш бриф и пришлём доступ в кабинет.
          Обычно — в течение рабочего дня.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to="/app"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-[14px] font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            В кабинет
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/"
            className="inline-flex h-11 items-center rounded-full border border-border bg-surface px-5 text-[14px] font-medium text-foreground transition-colors hover:bg-surface-muted"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}
