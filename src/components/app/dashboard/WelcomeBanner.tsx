/**
 * WelcomeBanner — большой блок для новых пользователей кабинета.
 * Показывается, когда у юзера ещё нет проектов: даёт три CTA на брифы.
 */
import { Link } from "@tanstack/react-router";
import { Bot, Sparkles, Globe, ArrowRight } from "lucide-react";

interface Props {
  userName?: string;
}

const PRODUCTS = [
  {
    to: "/onboarding/assistant" as const,
    icon: Bot,
    title: "Ассистент",
    desc: "Отвечает клиентам в чате 24/7",
    minutes: "5 мин",
  },
  {
    to: "/onboarding/media" as const,
    icon: Sparkles,
    title: "Медиа-студия",
    desc: "Контент в соцсети без копирайтера",
    minutes: "5 мин",
  },
  {
    to: "/onboarding/site" as const,
    icon: Globe,
    title: "Сайт",
    desc: "Лендинг с домом и формой",
    minutes: "7 мин",
  },
];

export function WelcomeBanner({ userName }: Props) {
  return (
    <section
      aria-label="Создать первый проект"
      className="overflow-hidden rounded-2xl p-6 md:p-8"
      style={{
        background:
          "radial-gradient(120% 100% at 0% 0%, color-mix(in oklab, var(--color-accent) 10%, transparent) 0%, transparent 55%), var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
    >
      <div className="mb-5 flex items-start gap-3">
        <span
          className="hidden h-10 w-10 flex-none items-center justify-center rounded-full text-base font-bold sm:inline-flex"
          style={{ background: "var(--color-accent)", color: "var(--color-accent-ink)" }}
          aria-hidden
        >
          ✨
        </span>
        <div className="min-w-0">
          <h1 className="font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
            {userName ? `Привет, ${userName}!` : "Привет!"} С чего начнём?
          </h1>
          <p
            className="mt-1 text-sm md:text-[15px]"
            style={{ color: "var(--color-ink-muted)" }}
          >
            Выберите продукт — пройдите короткий бриф, и через 30 секунд
            проект появится здесь, в кабинете.
          </p>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {PRODUCTS.map((p) => (
          <li key={p.to}>
            <Link
              to={p.to}
              className="group block h-full rounded-xl p-4 transition-colors"
              style={{
                background: "var(--color-surface-sunken)",
                border: "1px solid var(--color-border)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "color-mix(in oklab, var(--color-accent) 45%, transparent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{
                    background: "color-mix(in oklab, var(--color-accent) 10%, transparent)",
                    color: "var(--color-accent)",
                    border: "1px solid color-mix(in oklab, var(--color-accent) 25%, transparent)",
                  }}
                >
                  <p.icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                  style={{
                    background: "var(--color-surface-muted)",
                    color: "var(--color-ink-muted)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {p.minutes}
                </span>
              </div>
              <div className="mt-3 font-display text-base font-semibold text-foreground">
                {p.title}
              </div>
              <div
                className="mt-1 text-xs leading-snug"
                style={{ color: "var(--color-ink-muted)" }}
              >
                {p.desc}
              </div>
              <div
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium transition-transform group-hover:translate-x-0.5"
                style={{ color: "var(--color-accent)" }}
              >
                Начать <ArrowRight className="h-3 w-3" strokeWidth={2} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
