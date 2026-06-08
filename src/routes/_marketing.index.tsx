/**
 * / Neeklo. Главная страница продукта.
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
  Workflow,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { buildPageMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/_marketing/")({
  head: () => ({
    meta: buildPageMeta({
      title: "Neeklo. AI-менеджер заявок для бизнеса",
      description:
        "AI-менеджер заявок отвечает 24/7, собирает лиды, квалифицирует обращения и передаёт их в Telegram, CRM и таблицы. На инфраструктуре Neeklo, оплата в рублях.",
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
              name: "Neeklo",
              url: "https://botme.neeklo.ru",
              description:
                "Neeklo. AI-менеджер заявок для бизнеса. Self-hosted инфраструктура, оплата в рублях.",
            },
            { "@type": "WebSite", name: "Neeklo", url: "https://botme.neeklo.ru" },
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
      <WhyNeeklo />
      <Ecosystem />
      <Pricing />
      <Faq />
      <FinalCta />
    </div>
  );
}

/* ─────────────────── Hero ─────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* subtle backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--border) 60%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--border) 60%, transparent) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at 70% 40%, black 0%, transparent 75%)",
        }}
      />

      <Container>
        <div className="relative grid items-center gap-14 py-20 md:grid-cols-12 md:gap-10 md:py-28 lg:py-32">
          {/* LEFT */}
          <div className="md:col-span-6 lg:col-span-6">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-[12px] font-medium text-ink-muted backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Neeklo. AI-менеджер заявок
            </div>

            <h1 className="font-display text-[44px] font-semibold leading-[0.98] tracking-[-0.03em] text-foreground md:text-[68px] lg:text-[76px]">
              Ни одной
              <br />
              упущенной
              <br />
              заявки.{" "}
              <span className="text-ink-subtle">Никогда.</span>
            </h1>

            <p className="mt-7 max-w-[540px] text-[16.5px] leading-relaxed text-ink-muted md:text-[18px]">
              AI-сотрудник для входящих обращений. Принимает заявку с сайта, Telegram и форм,
              задаёт нужные вопросы, собирает контакт и сразу передаёт готовый лид в CRM
              или владельцу. 24/7, на инфраструктуре Neeklo, оплата в рублях.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild variant="brand" size="lg">
                <Link to="/onboarding/assistant">
                  Запустить менеджера
                  <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="gap-2">
                <Link to="/" hash="product">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-40" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
                  </span>
                  Смотреть демо
                </Link>
              </Button>
            </div>

            <dl className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
              <Stat label="Ответ" value="7 сек" />
              <span className="hidden h-8 w-px bg-border sm:block" />
              <Stat label="Работа" value="24/7" />
              <span className="hidden h-8 w-px bg-border sm:block" />
              <Stat label="Каналы" value="Сайт · TG · Формы" />
            </dl>
          </div>

          {/* RIGHT — layered product scene */}
          <div className="md:col-span-6 lg:col-span-6">
            <HeroScene />
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.12em] text-ink-subtle">
        {label}
      </dt>
      <dd className="mt-1 font-display text-[18px] font-semibold tabular text-foreground">
        {value}
      </dd>
    </div>
  );
}

function HeroScene() {
  return (
    <div className="relative mx-auto aspect-[5/6] w-full max-w-[560px] md:aspect-[4/5]">
      {/* soft halo */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[36px] opacity-70"
        style={{ background: "var(--surface-muted)" }}
      />

      {/* MAIN: AI chat widget — back-left, slightly rotated */}
      <div className="absolute left-0 top-6 w-[78%] -rotate-[1.5deg] overflow-hidden rounded-2xl border border-border bg-surface shadow-lift">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground">
              <Bot className="h-3.5 w-3.5 text-background" strokeWidth={2} />
            </div>
            <div className="text-[12px] font-semibold text-foreground">
              Neeklo · AI-менеджер
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2 py-0.5 text-[10.5px] font-medium text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            онлайн
          </span>
        </div>
        <div className="space-y-2.5 p-4">
          <Bubble side="left">Здравствуйте! Делаете ремонт под ключ?</Bubble>
          <Bubble side="right">
            Да. Подскажите метраж и район — соберу для вас точную смету.
          </Bubble>
          <Bubble side="left">42 м², Невский. Когда сможете приехать?</Bubble>
          <Bubble side="right">
            Завтра в 17:00 удобно? Запишу замерщика и пришлю подтверждение.
          </Bubble>
          <div className="flex items-center gap-1.5 pl-1 pt-1 text-[11px] text-ink-subtle">
            <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-foreground/60" />
            печатает ответ
          </div>
        </div>
      </div>

      {/* FRONT: Lead card — front-right */}
      <div className="absolute -right-2 top-[38%] w-[62%] rotate-[2deg] overflow-hidden rounded-2xl border border-border bg-background shadow-lift md:-right-4">
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <div className="text-[11px] uppercase tracking-[0.12em] text-ink-subtle">
            Новая заявка
          </div>
          <span className="rounded-full bg-foreground px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-background">
            горячий
          </span>
        </div>
        <div className="space-y-2 p-4 text-[12.5px]">
          <Row k="Имя" v="Мария" />
          <Row k="Телефон" v="+7 921 123 45 67" mono />
          <Row k="Услуга" v="Ремонт под ключ" />
          <Row k="Метраж" v="42 м²" />
          <Row k="Звонок" v="сегодня, 17:00" />
        </div>
        <div className="flex items-center justify-between border-t border-border bg-surface-muted/50 px-4 py-2.5 text-[11px]">
          <span className="inline-flex items-center gap-1.5 text-ink-muted">
            <Sparkles className="h-3 w-3" strokeWidth={2} />
            квалифицировано AI
          </span>
          <span className="font-medium text-foreground">12с назад</span>
        </div>
      </div>

      {/* FLOAT: Telegram notification — top right */}
      <div className="absolute -top-2 right-2 w-[58%] -rotate-[3deg] rounded-xl border border-border bg-surface px-3.5 py-2.5 shadow-lift md:right-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-foreground">
            <MessageSquare className="h-3.5 w-3.5 text-background" strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <div className="truncate text-[12px] font-semibold text-foreground">
                Лиды · Telegram
              </div>
              <span className="text-[10px] text-ink-subtle">сейчас</span>
            </div>
            <div className="truncate text-[11.5px] text-ink-muted">
              Мария, ремонт, 42 м² — звонок в 17:00
            </div>
          </div>
        </div>
      </div>

      {/* FLOAT: CRM synced — bottom left */}
      <div className="absolute bottom-2 left-2 w-[54%] rotate-[1.5deg] rounded-xl border border-border bg-surface px-3.5 py-2.5 shadow-lift md:left-0">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg border border-border bg-background">
            <Database className="h-3.5 w-3.5 text-foreground" strokeWidth={1.75} />
          </div>
          <div className="min-w-0">
            <div className="text-[12px] font-semibold text-foreground">
              amoCRM
            </div>
            <div className="text-[11.5px] text-ink-muted">
              Сделка #4821 создана
            </div>
          </div>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-semibold text-foreground">
            <Check className="h-2.5 w-2.5" strokeWidth={3} />
            sync
          </span>
        </div>
      </div>

      {/* FLOAT: Live counter — bottom right */}
      <div className="absolute -bottom-1 right-0 w-[44%] -rotate-[2deg] rounded-xl border border-border bg-foreground px-3.5 py-2.5 text-background shadow-lift">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-background/60">
              Сегодня
            </div>
            <div className="font-display text-[20px] font-semibold leading-none tabular">
              23 лида
            </div>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              онлайн
            </span>
            <span className="text-[10px] text-background/60">avg 7с</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-ink-subtle">{k}</span>
      <span
        className={
          "text-foreground " + (mono ? "font-medium tabular" : "font-medium")
        }
      >
        {v}
      </span>
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

/* ─────────────────── Trust bar ─────────────────── */

function TrustBar() {
  return (
    <section className="border-y border-border bg-surface-muted/40">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-6 text-[12px] uppercase tracking-wide text-ink-subtle">
          <span className="inline-flex items-center gap-1.5">
            <Server className="h-3.5 w-3.5" strokeWidth={1.75} />
            Своя инфраструктура
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-border-strong sm:block" />
          <span className="inline-flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5" strokeWidth={1.75} />
            Данные в РФ
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-border-strong sm:block" />
          <span className="inline-flex items-center gap-1.5">
            <CreditCard className="h-3.5 w-3.5" strokeWidth={1.75} />
            Оплата в рублях
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-border-strong sm:block" />
          <span>Поддержка в Telegram</span>
        </div>
      </Container>
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
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lift">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-2 text-[12px] font-medium text-foreground">
          <Bot className="h-3.5 w-3.5" strokeWidth={2} />
          AI-менеджер заявок
        </div>
        <span className="text-[11px] text-ink-subtle">кабинет Neeklo</span>
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
        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <li
                key={s.n}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-[13px] font-semibold tabular text-ink-subtle">
                    {s.n}
                  </span>
                  <Icon className="h-4 w-4 text-ink-muted" strokeWidth={1.75} />
                </div>
                <h3 className="mt-6 font-display text-[18px] font-semibold tracking-[-0.01em] text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
                  {s.desc}
                </p>
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
          <div className="rounded-2xl border border-border bg-foreground p-7 text-background md:col-span-3 md:row-span-2">
            <div className="text-[11.5px] font-medium uppercase tracking-wide text-background/60">
              Главный результат
            </div>
            <h3 className="mt-3 font-display text-[26px] font-semibold tracking-[-0.02em] md:text-[32px]">
              Ни одного потерянного обращения, даже ночью и в выходные
            </h3>
            <p className="mt-4 text-[14.5px] leading-relaxed text-background/75">
              Менеджер на смене 24/7, отвечает за 7 секунд, доводит каждое
              обращение до заявки.
            </p>
            <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-background/15 pt-5">
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-background/55">
                  Время ответа
                </dt>
                <dd className="mt-1 font-display text-[24px] font-semibold tabular">
                  7 сек
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wide text-background/55">
                  Рост конверсии
                </dt>
                <dd className="mt-1 font-display text-[24px] font-semibold tabular">
                  до +38%
                </dd>
              </div>
            </dl>
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
    <div className={"rounded-2xl border border-border bg-surface p-6 " + className}>
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background">
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </div>
      <h3 className="mt-4 font-display text-[17px] font-semibold tracking-[-0.01em] text-foreground">
        {title}
      </h3>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-muted">{desc}</p>
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
    <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
      <div className="text-[11.5px] font-medium uppercase tracking-wide text-ink-subtle">
        {title}
      </div>
      <ul className="mt-5 divide-y divide-border">
        {items.map((it) => (
          <li
            key={it.t}
            className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-[11px] font-semibold text-foreground">
                {it.t.slice(0, 2)}
              </span>
              <div>
                <div className="text-[14px] font-semibold text-foreground">{it.t}</div>
                <div className="text-[12px] text-ink-subtle">{it.s}</div>
              </div>
            </div>
            <Check className="h-3.5 w-3.5 text-ink-muted" strokeWidth={2} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────── Why Neeklo ─────────────────── */

function WhyNeeklo() {
  const items = [
    {
      icon: Server,
      title: "Своя инфраструктура",
      desc: "Менеджер работает на серверах Neeklo, а не поверх чужих API. Доступность и цена под нашим контролем.",
    },
    {
      icon: Shield,
      title: "Данные в РФ",
      desc: "Диалоги, лиды и логи хранятся в российских дата-центрах. Доступ по ролям.",
    },
    {
      icon: CreditCard,
      title: "Оплата в рублях",
      desc: "ЮKassa и российские карты. Без зарубежных подписок и блокировок.",
    },
    {
      icon: Bot,
      title: "Продуктовая компания",
      desc: "Мы не агентство. Развиваем один продукт и отвечаем за его качество.",
    },
  ];
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <div className="text-[12px] font-medium uppercase tracking-wide text-ink-subtle">
              Почему Neeklo
            </div>
            <h2 className="mt-3 font-display text-[32px] font-semibold tracking-[-0.02em] text-foreground md:text-[44px]">
              Продукт, который вы контролируете
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-ink-muted">
              Мы делаем рабочий инструмент для бизнеса, а не очередную обёртку
              над зарубежными API. Инфраструктура, данные и расчёты в России.
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
      desc: "Готовит посты, сторис и идеи reels в вашем стиле. Развиваем как отдельный продукт экосистемы.",
    },
    {
      icon: Layout,
      tag: "Сайты",
      title: "Сайт под услугу за один вечер",
      desc: "Аккуратный сайт с формой заявки и оплатой в рублях. Подключаем к AI-менеджеру в один клик.",
    },
  ];
  return (
    <section className="border-y border-border bg-surface-muted/40 py-20 md:py-28">
      <Container>
        <SectionHead
          eyebrow="Экосистема Neeklo"
          title="Дальше больше. Менеджер первым, остальное по плану"
          desc="Сейчас фокус на AI-менеджере заявок. Эти продукты на подходе."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {items.map((it) => (
            <div
              key={it.tag}
              className="relative flex flex-col rounded-2xl border border-border bg-surface p-7 md:p-9"
            >
              <span className="absolute right-5 top-5 rounded-full border border-foreground/30 bg-background px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-foreground">
                скоро
              </span>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background">
                <it.icon className="h-4 w-4" strokeWidth={1.75} />
              </div>
              <div className="mt-5 text-[11.5px] font-medium uppercase tracking-wide text-ink-subtle">
                {it.tag}
              </div>
              <h3 className="mt-2 font-display text-[22px] font-semibold tracking-[-0.01em] text-foreground md:text-[26px]">
                {it.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">{it.desc}</p>
              <div className="mt-6">
                <button
                  type="button"
                  disabled
                  className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-[12.5px] font-medium text-ink-muted"
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
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={
                "flex flex-col rounded-2xl border p-6 " +
                (p.highlighted
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-surface text-foreground")
              }
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-[18px] font-semibold">{p.name}</h3>
                {p.highlighted && (
                  <span className="rounded-full bg-background px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-foreground">
                    выгодно
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="font-display text-[32px] font-semibold tabular">
                  {p.price}
                </span>
                {p.period && (
                  <span
                    className={
                      "text-[13px] " +
                      (p.highlighted ? "text-background/70" : "text-ink-subtle")
                    }
                  >
                    {p.period}
                  </span>
                )}
              </div>
              <p
                className={
                  "mt-2 text-[13.5px] leading-relaxed " +
                  (p.highlighted ? "text-background/80" : "text-ink-muted")
                }
              >
                {p.desc}
              </p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className={
                      "flex items-start gap-2.5 text-[13.5px] " +
                      (p.highlighted ? "text-background" : "text-foreground")
                    }
                  >
                    <Check
                      className={
                        "mt-0.5 h-3.5 w-3.5 flex-none " +
                        (p.highlighted ? "text-background" : "text-foreground")
                      }
                      strokeWidth={2}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
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
          ))}
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
    q: "На каких заявках это работает?",
    a: "На любых: ремонт, обучение, услуги, локальный бизнес, b2b. Менеджер обучается под ваши товары и услуги, а не под отрасль.",
  },
  {
    q: "Это собственная разработка или обёртка?",
    a: "Это наш продукт на инфраструктуре Neeklo. Мы контролируем работу, доступность и обновления.",
  },
  {
    q: "Где хранятся диалоги и заявки?",
    a: "В российских дата-центрах. Доступ по ролям, логи хранятся столько, сколько нужно вам.",
  },
  {
    q: "Как подключаются Telegram и сайт?",
    a: "Telegram через бота за пару минут. Сайт через виджет, который вставляется одной строкой. Avito и VK подключаем под вашу схему.",
  },
  {
    q: "Что значит «передача в CRM»?",
    a: "Готовая карточка лида автоматически создаётся в amoCRM, Bitrix24, Google Sheets или присылается на Webhook.",
  },
  {
    q: "А если не подойдёт?",
    a: "Первые 7 дней бесплатно. Если не подошло, вернём оплату по запросу в поддержку.",
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
        <div className="mx-auto mt-10 max-w-[760px] divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
          {faq.map((item, i) => (
            <FaqRow key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-[15px] font-medium text-foreground">{q}</span>
        <ChevronDown
          className={
            "h-4 w-4 flex-none text-ink-muted transition-transform " +
            (open ? "rotate-180" : "")
          }
          strokeWidth={1.75}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-[14px] leading-relaxed text-ink-muted">{a}</div>
      )}
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
      <div className="text-[12px] font-medium uppercase tracking-wide text-ink-subtle">
        {eyebrow}
      </div>
      <h2 className="mt-3 font-display text-[30px] font-semibold tracking-[-0.02em] text-foreground md:text-[42px]">
        {title}
      </h2>
      <p className="mt-4 text-[15.5px] leading-relaxed text-ink-muted">{desc}</p>
    </div>
  );
}
