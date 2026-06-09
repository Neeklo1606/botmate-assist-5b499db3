/**
 * / Avreya. Главная страница продукта.
 * Главный продукт: AI-менеджер заявок.
 * Вторичные (Скоро): Медиа-помощник, Сайты.
 * Без длинных тире в копирайте.
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  Clock,
  CreditCard,
  Database,
  Globe,
  Image as ImageIcon,
  Inbox,
  Layout,
  MessageSquare,
  Phone,
  Server,
  Shield,
  Sparkles,
  Table2,
  User,
  Workflow,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { buildPageMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/_marketing/")({
  head: () => ({
    meta: buildPageMeta({
      title: "Avreya. AI-менеджер заявок для бизнеса",
      description:
        "AI-менеджер заявок отвечает 24/7, собирает лиды, квалифицирует обращения и передаёт их в Telegram, CRM и таблицы. На инфраструктуре Avreya, оплата в рублях.",
      path: "/",
    }),
    links: [canonicalLink("/")],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "Avreya",
              url: "https://avreya.avreya.ru",
              description:
                "Avreya. AI-менеджер заявок для бизнеса. Self-hosted инфраструктура, оплата в рублях.",
            },
            { "@type": "WebSite", name: "Avreya", url: "https://avreya.avreya.ru" },
            {
              "@type": "SoftwareApplication",
              name: "AI-менеджер заявок",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: { "@type": "Offer", price: "2490", priceCurrency: "RUB" },
            },
          ],
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="bg-background">
      <Hero />
      <TrustBar />
      <ProductScene />
      <HowItWorks />
      <Benefits />
      <Integrations />
      <WhyAvreya />
      <Ecosystem />
      <Pricing />
      <Faq />
      <FinalCta />
    </div>
  );
}

/* ─────────────────── Hero — new system (cream / emerald) ─────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(45,106,79,0.18), transparent 70%)" }}
      />
      <Container>
        <div className="relative grid items-center gap-12 pt-12 pb-16 md:grid-cols-12 md:gap-10 md:pt-20 md:pb-24">
          {/* LEFT */}
          <div className="md:col-span-6">
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px] font-medium"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
                color: "var(--ink-muted)",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
              Технология упаковки бизнеса
            </span>

            <h1
              className="mt-6 font-display text-[44px] leading-[1.02] md:text-[68px] lg:text-[80px]"
              style={{ fontWeight: 800, letterSpacing: "-0.03em", color: "var(--foreground)" }}
            >
              Твой бизнес
              <br />
              работает, пока
              <br />
              ты&nbsp;спишь.
            </h1>

            <p
              className="mt-6 max-w-xl text-[16px] md:text-[18px]"
              style={{ lineHeight: 1.7, color: "var(--ink-muted)", fontWeight: 500 }}
            >
              AI-сотрудник отвечает на заявки, создаёт контент и собирает сайты — на твоей
              инфраструктуре, без разработчиков.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/onboarding/assistant"
                className="inline-flex h-12 items-center gap-2 rounded-xl px-6 text-[15px] font-semibold transition-colors"
                style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--signal)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
              >
                Запустить агента
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
              <Link
                to="/"
                hash="product"
                className="inline-flex h-12 items-center gap-2 rounded-xl border px-6 text-[15px] font-semibold transition-colors"
                style={{
                  borderColor: "var(--border-strong)",
                  color: "var(--foreground)",
                  background: "transparent",
                }}
              >
                <span className="text-[10px]">▶</span> Смотреть демо
              </Link>
            </div>

            <div
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px]"
              style={{ color: "var(--ink-muted)", fontWeight: 500 }}
            >
              <span className="inline-flex items-center gap-1.5">🔒 Данные в РФ</span>
              <span aria-hidden style={{ color: "var(--border-strong)" }}>•</span>
              <span className="inline-flex items-center gap-1.5">⚡ Запуск за 3 дня</span>
              <span aria-hidden style={{ color: "var(--border-strong)" }}>•</span>
              <span className="inline-flex items-center gap-1.5">💰 Оплата в рублях</span>
            </div>
          </div>

          {/* RIGHT — tabbed product mockup */}
          <div className="md:col-span-6">
            <HeroMockup />
          </div>
        </div>
      </Container>
    </section>
  );
}

function HeroMockup() {
  const [tab, setTab] = useState<"assistant" | "media" | "site">("assistant");
  const tabs: { k: typeof tab; label: string }[] = [
    { k: "assistant", label: "Ассистент" },
    { k: "media", label: "Медиа" },
    { k: "site", label: "Сайт" },
  ];

  return (
    <div
      className="relative overflow-hidden rounded-2xl border shadow-lift"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      {/* Tabs */}
      <div
        className="flex items-center gap-1 border-b px-3 pt-3"
        style={{ borderColor: "var(--border)", background: "var(--surface-tint)" }}
      >
        {tabs.map((t) => {
          const active = tab === t.k;
          return (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className="rounded-t-lg px-4 py-2.5 text-[13px] font-semibold transition-colors"
              style={{
                background: active ? "var(--surface)" : "transparent",
                color: active ? "var(--foreground)" : "var(--ink-muted)",
                borderTop: active ? `2px solid var(--accent)` : "2px solid transparent",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Body */}
      <div className="p-5 md:p-6">
        {tab === "assistant" && <AssistantTabBody />}
        {tab === "media" && (
          <div
            className="flex h-[260px] items-center justify-center rounded-xl border text-[14px]"
            style={{ borderColor: "var(--border)", background: "var(--surface-muted)", color: "var(--ink-muted)" }}
          >
            <div className="text-center">
              <ImageIcon className="mx-auto h-8 w-8" strokeWidth={1.5} />
              <div className="mt-2 font-semibold" style={{ color: "var(--foreground)" }}>AI-Медиа</div>
              <div>Генерация постов, баннеров и сторис</div>
            </div>
          </div>
        )}
        {tab === "site" && (
          <div
            className="flex h-[260px] items-center justify-center rounded-xl border text-[14px]"
            style={{ borderColor: "var(--border)", background: "var(--surface-muted)", color: "var(--ink-muted)" }}
          >
            <div className="text-center">
              <Layout className="mx-auto h-8 w-8" strokeWidth={1.5} />
              <div className="mt-2 font-semibold" style={{ color: "var(--foreground)" }}>AI-Сайт</div>
              <div>Конструктор лендингов под бриф</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AssistantTabBody() {
  return (
    <div className="space-y-4">
      <div
        className="rounded-xl border p-4"
        style={{ background: "var(--background)", borderColor: "var(--border)" }}
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ background: "var(--surface-muted)", color: "var(--foreground)" }}
            >
              <User className="h-4 w-4" strokeWidth={1.75} />
            </div>
            <div className="leading-tight">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: "var(--ink-subtle)" }}>
                Новая заявка
              </div>
              <div className="text-[14px] font-semibold" style={{ color: "var(--foreground)" }}>
                Мария Волкова
              </div>
            </div>
          </div>
          <span
            className="rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em]"
            style={{ background: "var(--signal)", color: "var(--signal-foreground)" }}
          >
            Горячий
          </span>
        </div>

        <dl className="space-y-2 text-[13px]">
          <MockRow k="Имя" v="Мария Волкова" />
          <MockRow k="Телефон" v="+7 921 555 12 34" />
          <MockRow k="Бюджет" v="до 800 000 ₽" />
          <div className="flex justify-between">
            <dt style={{ color: "var(--ink-subtle)" }}>Статус</dt>
            <dd className="flex items-center gap-1.5 font-semibold" style={{ color: "var(--accent)" }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
              Горячий
            </dd>
          </div>
        </dl>
      </div>

      <div
        className="flex items-center justify-between rounded-xl border px-4 py-3 text-[13px]"
        style={{ background: "var(--surface-muted)", borderColor: "var(--border)" }}
      >
        <span style={{ color: "var(--ink-muted)" }}>
          Лидов сегодня: <span className="font-bold tabular" style={{ color: "var(--foreground)" }}>23</span>
        </span>
        <span aria-hidden style={{ color: "var(--border-strong)" }}>•</span>
        <span style={{ color: "var(--ink-muted)" }}>
          Конверсия <span className="font-bold tabular" style={{ color: "var(--accent)" }}>67%</span>
        </span>
      </div>
    </div>
  );
}

function MockRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between">
      <dt style={{ color: "var(--ink-subtle)" }}>{k}</dt>
      <dd className="font-medium" style={{ color: "var(--foreground)" }}>{v}</dd>
    </div>
  );
}

function SceneRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between text-[12px]">
      <span className="text-ink-subtle">{k}</span>
      <span className="font-medium text-foreground">{v}</span>
    </div>
  );
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-ink-subtle">{k}</span>
      <span className={"text-foreground " + (mono ? "font-medium tabular" : "font-medium")}>{v}</span>
    </div>
  );
}

function Bubble({ side, children }: { side: "left" | "right"; children: React.ReactNode }) {
  const isLeft = side === "left";
  return (
    <div className={"flex " + (isLeft ? "justify-start" : "justify-end")}>
      <div
        className={
          "max-w-[82%] rounded-2xl px-3.5 py-2 text-[12.5px] leading-snug " +
          (isLeft
            ? "rounded-tl-sm border border-border bg-background text-foreground"
            : "rounded-tr-sm bg-foreground text-background")
        }
      >
        {children}
      </div>
    </div>
  );
}

/* ─────────────────── Trust bar — uppercase marquee ─────────────────── */

function TrustBar() {
  const items = [
    "AI-Ассистент",
    "AI-Медиа",
    "AI-Сайт",
    "Данные в РФ",
    "Запуск за 3 дня",
    "Своя инфраструктура",
    "Оплата в рублях",
  ];
  const track = [...items, ...items, ...items];

  return (
    <section style={{ background: "#1C1C1C", color: "#F0EBE1" }}>
      <div
        className="marquee-mask pause-on-hover relative overflow-hidden py-3"
        style={{ ["--marquee-duration" as string]: "60s" }}
      >
        <ul className="animate-marquee flex w-max items-center gap-8">
          {track.map((label, i) => (
            <li
              key={`${label}-${i}`}
              className="flex flex-none items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.18em]"
              aria-hidden={i >= items.length ? "true" : undefined}
            >
              <span>{label}</span>
              <span aria-hidden style={{ color: "rgba(240,235,225,0.4)" }}>•</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─────────────────── Product scene ─────────────────── */

function ProductScene() {
  const [tab, setTab] = useState<"chat" | "lead" | "handoff">("chat");
  return (
    <section id="product" className="py-20 md:py-28">
      <Container>
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <div className="text-[12px] font-medium uppercase tracking-wide text-ink-subtle">
              Продукт
            </div>
            <h2 className="mt-3 font-display text-[32px] font-semibold tracking-[-0.02em] text-foreground md:text-[44px]">
              Каждое обращение доходит до карточки лида
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-ink-muted">
              Это не чат-бот и не автоответчик. AI-менеджер ведёт диалог по сценарию
              вашего бизнеса, уточняет нужные поля, оценивает готовность клиента
              и сразу отдаёт заявку в работу.
            </p>

            <ul className="mt-7 space-y-3">
              {[
                "Отвечает за 7 секунд в любом канале",
                "Сам уточняет имя, контакт и детали заявки",
                "Размечает лид как горячий или прогрев",
                "Передаёт в Telegram, CRM и Google Sheets",
              ].map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-[14.5px] text-foreground"
                >
                  <Check className="mt-0.5 h-4 w-4 flex-none" strokeWidth={2} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {(
                [
                  ["chat", "Диалог"],
                  ["lead", "Карточка лида"],
                  ["handoff", "Передача в CRM"],
                ] as const
              ).map(([k, l]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setTab(k)}
                  aria-pressed={tab === k}
                  className={
                    "rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors " +
                    (tab === k
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-surface text-ink-muted hover:text-foreground")
                  }
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-7">
            <SceneWidget tab={tab} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function SceneWidget({ tab }: { tab: "chat" | "lead" | "handoff" }) {
  const tabLabel = tab === "chat" ? "диалог" : tab === "lead" ? "карточка лида" : "передача в CRM";
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lift">
      <div className="flex items-center justify-between border-b border-border bg-surface-muted/60 px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-border-strong/60" />
            <span className="h-2 w-2 rounded-full bg-border-strong/60" />
            <span className="h-2 w-2 rounded-full bg-border-strong/60" />
          </div>
          <span className="ml-1 inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-foreground">
            <Bot className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
            AI-менеджер заявок
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-subtle">
          avreya · {tabLabel}
        </span>
      </div>
      {tab === "chat" && (
        <div className="space-y-3 p-5">
          <Bubble side="left">Сколько стоит ремонт двушки?</Bubble>
          <Bubble side="right">
            От 8 500 ₽ за м². Уточню для точной сметы. Какой метраж и состояние сейчас?
          </Bubble>
          <Bubble side="left">48 м², черновая.</Bubble>
          <Bubble side="right">
            Понял. Когда удобно созвониться, чтобы согласовать выезд замерщика?
          </Bubble>
        </div>
      )}
      {tab === "lead" && (
        <div className="grid gap-3 p-5 md:grid-cols-2">
          <Field label="Имя" value="Алексей" />
          <Field label="Телефон" value="+7 921 555 11 22" />
          <Field label="Услуга" value="Ремонт под ключ" />
          <Field label="Метраж" value="48 м²" />
          <Field label="Бюджет" value="до 800 000 ₽" />
          <Field label="Готовность" value="в течение недели" />
          <div className="md:col-span-2 rounded-xl border border-border bg-background p-4">
            <div className="text-[11px] uppercase tracking-wide text-ink-subtle">
              Оценка менеджера
            </div>
            <div className="mt-1.5 text-[13.5px] text-foreground">
              Горячий лид. Готов к замеру на этой неделе. Бюджет в рынке.
            </div>
          </div>
        </div>
      )}
      {tab === "handoff" && (
        <div className="space-y-3 p-5">
          {[
            { icon: MessageSquare, t: "Telegram", s: "лид-чат менеджеров" },
            { icon: Database, t: "amoCRM", s: "сделка в воронке «Новые»" },
            { icon: Table2, t: "Google Sheets", s: "строка добавлена" },
            { icon: Phone, t: "SMS клиенту", s: "подтверждение звонка в 17:00" },
          ].map((row) => (
            <div
              key={row.t}
              className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface">
                  <row.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                </div>
                <div>
                  <div className="text-[13.5px] font-semibold text-foreground">
                    {row.t}
                  </div>
                  <div className="text-[12px] text-ink-subtle">{row.s}</div>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-foreground">
                <Check className="h-3 w-3" strokeWidth={2.5} />
                отправлено
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="text-[11px] uppercase tracking-wide text-ink-subtle">{label}</div>
      <div className="mt-1 text-[14px] font-medium text-foreground">{value}</div>
    </div>
  );
}

/* ─────────────────── How it works ─────────────────── */

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Бриф за 30 минут",
      desc: "Описываем бизнес, услуги и нужные поля в заявке. Без технической документации.",
      icon: Sparkles,
    },
    {
      n: "02",
      title: "Настройка под ваш голос",
      desc: "Загружаем прайс, FAQ и правила. Менеджер отвечает в вашем стиле, а не шаблонами.",
      icon: Workflow,
    },
    {
      n: "03",
      title: "Подключение каналов и CRM",
      desc: "Сайт, Telegram, формы, Avito. Заявки уходят в amoCRM, Bitrix24, Sheets или Telegram-чат.",
      icon: Zap,
    },
    {
      n: "04",
      title: "Запуск и поддержка",
      desc: "За 3 дня в проде. Поддержка по будням, обновления сценариев включены в тариф.",
      icon: Clock,
    },
  ];
  return (
    <section id="how" className="border-t border-border bg-surface-muted/40 py-20 md:py-28">
      <Container>
        <SectionHead
          eyebrow="Как это работает"
          title="От брифа до первой заявки за 3 дня"
          desc="Внедряем сами. Вам не нужен разработчик, маркетолог или интегратор."
        />
        <ol className="relative mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* connector rail (desktop) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px lg:block"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--color-border) 50%, transparent 50%)",
              backgroundSize: "8px 1px",
            }}
          />
          {steps.map((s, i) => {
            const Icon = s.icon;
            const featured = i === 0;
            return (
              <li
                key={s.n}
                className={
                  "group relative flex flex-col rounded-2xl border bg-surface p-6 transition-shadow duration-300 ease-quart hover:shadow-sm " +
                  (featured ? "border-foreground/30 bg-background" : "border-border")
                }
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        "relative flex h-12 w-12 items-center justify-center rounded-xl bg-background ring-1 " +
                        (featured ? "ring-foreground/20" : "ring-border")
                      }
                    >
                      <span className="font-display text-[15px] font-bold tabular text-foreground">
                        {s.n}
                      </span>
                      {featured && (
                        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-surface" />
                      )}
                    </span>
                  </div>
                  <Icon
                    className={"h-4 w-4 " + (featured ? "text-accent" : "text-ink-subtle")}
                    strokeWidth={1.6}
                  />
                </div>
                <h3 className="mt-7 font-display text-[18px] font-semibold leading-snug tracking-[-0.015em] text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
                  {s.desc}
                </p>
                <div className="mt-5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
                  <span className={"h-1 w-1 rounded-full " + (featured ? "bg-accent" : "bg-border-strong")} />
                  шаг {i + 1} из {steps.length}
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

/* ─────────────────── Benefits ─────────────────── */

function Benefits() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHead
          eyebrow="Что вы получаете"
          title="Больше заявок, меньше упущенных клиентов"
          desc="Менеджер закрывает первую линию. Вы работаете только с горячими лидами."
        />

        <div className="mt-12 grid auto-rows-[minmax(160px,auto)] grid-cols-1 gap-4 md:grid-cols-6">
          <div className="relative overflow-hidden rounded-2xl border border-foreground/30 bg-foreground p-7 text-background shadow-lift md:col-span-3 md:row-span-2 md:p-9">
            {/* soft accent halo */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
              style={{ background: "radial-gradient(closest-side, var(--color-accent), transparent 70%)" }}
            />
            <div className="relative">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-background/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-background/75 backdrop-blur">
                <span className="h-1 w-1 rounded-full bg-accent" />
                Главный результат
              </div>
              <h3 className="mt-5 font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.025em] md:text-[34px]">
                Ни одного потерянного обращения, даже ночью и в выходные
              </h3>
              <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-background/75">
                Менеджер на смене 24/7, отвечает за 7 секунд, доводит каждое
                обращение до заявки.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-background/15">
                <div className="bg-foreground p-4">
                  <dt className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-background/55">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    Время ответа
                  </dt>
                  <dd className="mt-2 font-display text-[28px] font-semibold tabular tracking-[-0.02em]">
                    7 <span className="text-[16px] font-medium text-background/55">сек</span>
                  </dd>
                </div>
                <div className="bg-foreground p-4">
                  <dt className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-background/55">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    Рост конверсии
                  </dt>
                  <dd className="mt-2 font-display text-[28px] font-semibold tabular tracking-[-0.02em]">
                    +38<span className="text-[16px] font-medium text-background/55">%</span>
                  </dd>
                </div>
              </dl>
              {/* tiny sparkline */}
              <svg
                viewBox="0 0 200 36"
                className="mt-5 h-8 w-full opacity-80"
                aria-hidden
              >
                <defs>
                  <linearGradient id="spark" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 28 L20 24 L40 26 L60 20 L80 22 L100 14 L120 16 L140 10 L160 12 L180 6 L200 8 L200 36 L0 36 Z"
                  fill="url(#spark)"
                />
                <path
                  d="M0 28 L20 24 L40 26 L60 20 L80 22 L100 14 L120 16 L140 10 L160 12 L180 6 L200 8"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>

          <BentoCell
            className="md:col-span-3"
            icon={Inbox}
            title="Готовая заявка, а не «надо перезвонить»"
            desc="Менеджер сам собирает имя, контакт и нужные поля. Вы получаете карточку, по которой можно работать."
          />
          <BentoCell
            className="md:col-span-3"
            icon={Workflow}
            title="Передача в нужное место"
            desc="Telegram-чат отдела, amoCRM, Bitrix24, Google Sheets. Без копипаста и потерь."
          />

          <BentoCell
            className="md:col-span-2"
            icon={Clock}
            title="24/7 без выходных"
            desc="Работает ночью, в праздники, в часы пик. Без выгорания."
          />
          <BentoCell
            className="md:col-span-2"
            icon={Shield}
            title="Контроль над данными"
            desc="Логи диалогов и заявок остаются у вас. Никаких сторонних аккаунтов."
          />
          <BentoCell
            className="md:col-span-2"
            icon={CreditCard}
            title="Понятная цена в ₽"
            desc="Один тариф в месяц. Без зарубежных подписок и пересчётов."
          />
        </div>
      </Container>
    </section>
  );
}

function BentoCell({
  icon: Icon,
  title,
  desc,
  className = "",
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  desc: string;
  className?: string;
}) {
  return (
    <div
      className={
        "group relative flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all duration-300 ease-quart hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-sm " +
        className
      }
    >
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-foreground transition-colors group-hover:border-accent/40 group-hover:text-accent">
        <Icon className="h-4 w-4" strokeWidth={1.6} />
      </div>
      <h3 className="mt-5 font-display text-[16.5px] font-semibold leading-snug tracking-[-0.015em] text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">{desc}</p>
    </div>
  );
}

/* ─────────────────── Integrations ─────────────────── */

function Integrations() {
  const channels = [
    { t: "Telegram", s: "бот и чат" },
    { t: "Сайт", s: "виджет на любой страницы" },
    { t: "WhatsApp", s: "через провайдера" },
    { t: "Avito", s: "сообщения и заявки" },
    { t: "VK", s: "сообщения сообщества" },
    { t: "Звонки", s: "обработка пропущенных" },
  ];
  const handoffs = [
    { t: "amoCRM", s: "сделка в воронке" },
    { t: "Bitrix24", s: "лид и задача" },
    { t: "Google Sheets", s: "строка по заявке" },
    { t: "Telegram-чат", s: "уведомление команде" },
    { t: "Email", s: "карточка лида" },
    { t: "Webhook", s: "ваш сценарий" },
  ];

  return (
    <section
      id="integrations"
      className="border-y border-border bg-surface-muted/40 py-20 md:py-28"
    >
      <Container>
        <SectionHead
          eyebrow="Интеграции"
          title="Принимаем там, где пишут. Отдаём туда, где работаете"
          desc="Один менеджер на все каналы и любые маршруты заявок."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <IntegrationList title="Каналы" items={channels} />
          <IntegrationList title="Куда уходит заявка" items={handoffs} />
        </div>
      </Container>
    </section>
  );
}

function IntegrationList({
  title,
  items,
}: {
  title: string;
  items: { t: string; s: string }[];
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 md:p-8">
      <div className="flex items-baseline justify-between">
        <div className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink-subtle">
            {title}
          </div>
        </div>
        <div className="font-mono text-[10.5px] tabular text-ink-subtle">
          {String(items.length).padStart(2, "0")}
        </div>
      </div>
      <ul className="mt-5 divide-y divide-border">
        {items.map((it) => (
          <li
            key={it.t}
            className="group flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-[11px] font-semibold uppercase tracking-tight text-foreground transition-colors group-hover:border-foreground/25">
                {it.t.slice(0, 2)}
              </span>
              <div>
                <div className="text-[14px] font-semibold text-foreground">{it.t}</div>
                <div className="text-[12px] text-ink-subtle">{it.s}</div>
              </div>
            </div>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Check className="h-3 w-3" strokeWidth={2.5} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────── Why Avreya ─────────────────── */

function WhyAvreya() {
  const items = [
    {
      icon: Server,
      title: "Своя инфраструктура",
      desc: "Менеджер работает на серверах Avreya. Доступность, обновления и цена под нашим контролем.",
    },
    {
      icon: Shield,
      title: "Данные в РФ",
      desc: "Диалоги, лиды и логи в российских ДЦ. Доступ по ролям, выгрузка по запросу.",
    },
    {
      icon: Database,
      title: "Логи и история",
      desc: "Полная история обращений и решений менеджера. Видно, что и почему он ответил.",
    },
    {
      icon: CreditCard,
      title: "Оплата в рублях",
      desc: "ЮKassa, карты РФ, закрывающие документы. Без зарубежных подписок и пересчётов.",
    },
  ];
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <div className="text-[12px] font-medium uppercase tracking-wide text-ink-subtle">
              Доверие
            </div>
            <h2 className="mt-3 font-display text-[32px] font-semibold tracking-[-0.02em] text-foreground md:text-[44px]">
              Продукт, который вы контролируете
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-ink-muted">
              Avreya это продуктовая компания, а не агентство и не обёртка над
              зарубежным API. Инфраструктура, данные и расчёты в России.
            </p>
            <div className="mt-7">
              <Button asChild variant="brand" size="md">
                <Link to="/onboarding/assistant">
                  Подключить менеджера
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:col-span-7 md:grid-cols-2">
            {items.map((it) => (
              <div
                key={it.title}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background">
                  <it.icon className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 font-display text-[16.5px] font-semibold tracking-[-0.01em] text-foreground">
                  {it.title}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-muted">
                  {it.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────── Ecosystem (Скоро) ─────────────────── */

function Ecosystem() {
  const items = [
    {
      icon: ImageIcon,
      tag: "Медиа-помощник",
      title: "Контент для соцсетей по плану",
      desc: "Готовит посты, сторис и идеи reels в вашем стиле. Появится в том же кабинете Avreya.",
    },
    {
      icon: Layout,
      tag: "Сайты",
      title: "Сайт под услугу за один вечер",
      desc: "Аккуратный сайт с формой и оплатой в рублях. Подключится к AI-менеджеру в один клик.",
    },
  ];
  return (
    <section className="border-y border-border bg-surface-muted/40 py-20 md:py-28">
      <Container>
        <SectionHead
          eyebrow="Экосистема Avreya · Скоро"
          title="Сегодня AI-менеджер. Дальше больше"
          desc="Сейчас фокус на одном продукте. В том же аккаунте позже появятся ещё два."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {items.map((it, i) => (
            <div
              key={it.tag}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-7 md:p-9"
            >
              {/* faint diagonal hatch to read as "in progress" */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, var(--color-foreground) 0 1px, transparent 1px 10px)",
                }}
              />
              {/* progress rail */}
              <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-border">
                <div
                  className="h-full bg-accent/70"
                  style={{ width: i === 0 ? "65%" : "32%" }}
                />
              </div>

              <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted backdrop-blur">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                Скоро
              </span>

              <div className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background text-foreground">
                <it.icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
              </div>

              <div className="relative mt-6 inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink-subtle">
                <span className="h-1 w-1 rounded-full bg-accent" />
                {it.tag}
              </div>
              <h3 className="relative mt-2 font-display text-[22px] font-semibold leading-snug tracking-[-0.02em] text-foreground md:text-[26px]">
                {it.title}
              </h3>
              <p className="relative mt-3 max-w-md text-[14px] leading-relaxed text-ink-muted">
                {it.desc}
              </p>

              <div className="relative mt-6 flex items-center justify-between border-t border-border pt-5">
                <span className="font-mono text-[10.5px] tabular text-ink-subtle">
                  ETA · {i === 0 ? "Q3 / 2026" : "Q4 / 2026"}
                </span>
                <button
                  type="button"
                  disabled
                  className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-[12px] font-medium text-ink-muted"
                >
                  В разработке
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────── Pricing ─────────────────── */

function Pricing() {
  const plans = [
    {
      name: "Старт",
      price: "2 490 ₽",
      period: "в месяц",
      desc: "Один канал и до 300 диалогов в месяц. Чтобы попробовать на боевых заявках.",
      features: [
        "1 канал на выбор",
        "До 300 диалогов в месяц",
        "Передача в Telegram и Sheets",
        "Поддержка по будням",
      ],
      cta: "Подключить",
      highlighted: false,
    },
    {
      name: "Бизнес",
      price: "6 900 ₽",
      period: "в месяц",
      desc: "Оптимально для малого и среднего бизнеса с потоком заявок.",
      features: [
        "Все каналы",
        "До 2 000 диалогов в месяц",
        "amoCRM, Bitrix24, Webhooks",
        "Аналитика и стоимость заявки",
        "Поддержка 7 дней в неделю",
      ],
      cta: "Выбрать «Бизнес»",
      highlighted: true,
    },
    {
      name: "Команда",
      price: "по запросу",
      period: "",
      desc: "Для агентств, сетей и компаний с несколькими отделами продаж.",
      features: [
        "Без лимита на диалоги",
        "Несколько проектов и ролей",
        "Выделенный менеджер внедрения",
        "SLA и индивидуальные сценарии",
      ],
      cta: "Обсудить",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28">
      <Container>
        <SectionHead
          eyebrow="Тарифы в рублях"
          title="Понятная цена, без скрытых платежей"
          desc="Оплата российскими картами через ЮKassa. Меняйте тариф в любой момент."
        />
        <div className="relative mt-14 grid gap-4 md:grid-cols-3">
          {plans.map((p) => {
            const onPriceColor = p.highlighted ? "text-background/65" : "text-ink-subtle";
            const onBodyColor = p.highlighted ? "text-background/80" : "text-ink-muted";
            return (
              <div
                key={p.name}
                className={
                  "group relative flex flex-col rounded-2xl border p-7 transition-all duration-300 ease-quart " +
                  (p.highlighted
                    ? "border-foreground bg-foreground text-background shadow-lift md:-translate-y-2"
                    : "border-border bg-surface text-foreground hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-sm")
                }
              >
                {p.highlighted && (
                  <>
                    {/* accent halo */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -inset-px -z-10 rounded-2xl opacity-60 blur-2xl"
                      style={{ background: "radial-gradient(60% 80% at 50% 0%, var(--color-accent-glow), transparent 70%)" }}
                    />
                    <div className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
                  </>
                )}

                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2">
                    <span
                      className={
                        "h-1.5 w-1.5 rounded-full " +
                        (p.highlighted ? "bg-accent" : "bg-border-strong")
                      }
                    />
                    <h3 className="font-display text-[15px] font-semibold uppercase tracking-[0.12em]">
                      {p.name}
                    </h3>
                  </div>
                  {p.highlighted && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-accent-ink">
                      рекомендуем
                    </span>
                  )}
                </div>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-[40px] font-semibold tabular leading-none tracking-[-0.025em]">
                    {p.price}
                  </span>
                  {p.period && (
                    <span className={"text-[12.5px] font-medium " + onPriceColor}>
                      / {p.period.replace("в ", "")}
                    </span>
                  )}
                </div>
                <p className={"mt-3 text-[13.5px] leading-relaxed " + onBodyColor}>
                  {p.desc}
                </p>

                <div
                  className={
                    "mt-6 h-px " +
                    (p.highlighted ? "bg-background/15" : "bg-border")
                  }
                />

                <ul className="mt-5 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className={
                        "flex items-start gap-2.5 text-[13.5px] " +
                        (p.highlighted ? "text-background" : "text-foreground")
                      }
                    >
                      <span
                        className={
                          "mt-0.5 inline-flex h-4 w-4 flex-none items-center justify-center rounded-full " +
                          (p.highlighted
                            ? "bg-accent text-accent-ink"
                            : "bg-accent/15 text-accent")
                        }
                      >
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <Button
                    asChild
                    variant={p.highlighted ? "ink" : "outline"}
                    size="md"
                    className="w-full"
                  >
                    <Link to="/onboarding/assistant">{p.cta}</Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-[12.5px] text-ink-subtle">
          <Globe className="h-3.5 w-3.5" strokeWidth={1.75} />
          Оплата картами РФ через ЮKassa. НДС включён.
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────── FAQ ─────────────────── */

const faq = [
  {
    q: "Что делает AI-менеджер заявок?",
    a: "Принимает входящее обращение, ведёт диалог по сценарию вашего бизнеса, уточняет нужные поля, оценивает готовность клиента и передаёт готовую карточку лида в CRM или владельцу.",
  },
  {
    q: "Кому он подходит?",
    a: "Сервисным компаниям, локальному бизнесу, онлайн-школам, агентствам и b2b. Везде, где есть входящие обращения и важно не упускать заявки.",
  },
  {
    q: "Какие каналы можно подключить?",
    a: "Сайт через виджет, Telegram через бота, формы на сайте, Avito, VK, WhatsApp через провайдера. Один менеджер закрывает все каналы.",
  },
  {
    q: "Где хранятся данные?",
    a: "В российских дата-центрах на инфраструктуре Avreya. Доступ по ролям, полные логи диалогов и решений менеджера, выгрузка по запросу.",
  },
  {
    q: "Можно ли подключить CRM?",
    a: "Да. amoCRM, Bitrix24, Google Sheets, Telegram-чат отдела, Email и Webhook под ваш сценарий. Готовая карточка лида создаётся автоматически.",
  },
  {
    q: "Можно ли оплатить в рублях?",
    a: "Да. ЮKassa, карты РФ, безналичный расчёт для юрлиц, закрывающие документы. Без зарубежных подписок и пересчётов.",
  },
  {
    q: "Сколько времени занимает запуск?",
    a: "В среднем 3 дня. День на бриф и сценарии, день на настройку и обучение, день на подключение каналов и CRM.",
  },
  {
    q: "Что входит в настройку и поддержку?",
    a: "Бриф, сценарии диалогов, обучение на ваших материалах, подключение каналов и CRM, тестовый запуск. Дальше поддержка и обновления сценариев включены в тариф.",
  },
  {
    q: "Когда появятся Медиа-помощник и Сайты?",
    a: "Эти продукты в разработке и выйдут в том же кабинете Avreya. Сейчас фокус на AI-менеджере заявок. Подписка на ранний доступ через Telegram.",
  },
];

function Faq() {
  return (
    <section id="faq" className="border-t border-border bg-surface-muted/40 py-20 md:py-28">
      <Container>
        <SectionHead
          eyebrow="Частые вопросы"
          title="Коротко о главном"
          desc="Не нашли ответа? Напишите в Telegram, отвечаем по-русски и без скриптов."
        />
        <div className="mx-auto mt-12 max-w-[780px] overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          <div className="flex items-center justify-between border-b border-border bg-surface-muted/60 px-5 py-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink-subtle">
                {String(faq.length).padStart(2, "0")} вопросов · ответы команды
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-subtle">
              support · avreya
            </span>
          </div>
          <div className="divide-y divide-border">
            {faq.map((item, i) => (
              <FaqRow key={i} q={item.q} a={item.a} n={i + 1} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function FaqRow({ q, a, n }: { q: string; a: string; n: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={open ? "bg-background/60" : ""}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-background/40"
        aria-expanded={open}
      >
        <span
          className={
            "font-mono text-[11px] tabular w-7 flex-none " +
            (open ? "text-accent" : "text-ink-subtle")
          }
        >
          {String(n).padStart(2, "0")}
        </span>
        <span
          className={
            "flex-1 text-[15px] font-medium leading-snug transition-colors " +
            (open ? "text-foreground" : "text-foreground/90 group-hover:text-foreground")
          }
        >
          {q}
        </span>
        <span
          className={
            "inline-flex h-7 w-7 flex-none items-center justify-center rounded-full border transition-all duration-300 ease-quart " +
            (open
              ? "border-accent bg-accent text-accent-ink"
              : "border-border bg-background text-ink-muted group-hover:border-foreground/30")
          }
        >
          <ChevronDown
            className={"h-3.5 w-3.5 transition-transform duration-300 " + (open ? "rotate-180" : "")}
            strokeWidth={2}
          />
        </span>
      </button>
      <div
        className={
          "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-quart " +
          (open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")
        }
      >
        <div className="overflow-hidden">
          <div className="pb-5 pl-[60px] pr-5 text-[14px] leading-relaxed text-ink-muted">
            {a}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── Final CTA ─────────────────── */

function FinalCta() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-foreground bg-foreground px-8 py-14 text-background md:px-14 md:py-20">
          <div className="mx-auto max-w-[680px] text-center">
            <h2 className="font-display text-[32px] font-semibold tracking-[-0.02em] md:text-[44px]">
              Подключите AI-менеджера заявок сегодня
            </h2>
            <p className="mx-auto mt-4 max-w-[520px] text-[15px] leading-relaxed text-background/75">
              Первые 7 дней бесплатно, без привязки карты. Запуск за 3 дня под ключ.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="ink" size="lg">
                <Link to="/onboarding/assistant">
                  Подключить менеджера
                  <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghostInk"
                className="text-background hover:bg-background/10"
              >
                <Link to="/" hash="product">
                  Посмотреть, как работает
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────── shared ─────────────────── */

function SectionHead({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="mx-auto max-w-[720px] text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink-subtle shadow-xs backdrop-blur">
        <span className="h-1 w-1 rounded-full bg-accent" />
        {eyebrow}
      </div>
      <h2 className="mt-5 font-display text-[30px] font-semibold leading-[1.05] tracking-[-0.025em] text-foreground md:text-[44px]">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-[600px] text-[15.5px] leading-relaxed text-ink-muted">{desc}</p>
    </div>
  );
}
