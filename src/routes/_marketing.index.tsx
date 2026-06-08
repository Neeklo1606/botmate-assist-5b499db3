/**
 * / — Neeklo. Premium product landing.
 * Только 2 продукта: «Медиа-помощник» и «Сайты».
 * Структура: Hero · Интерактивный превью · Продукты · Как работает · Интерфейс ·
 *            Выгоды · Тарифы (₽) · FAQ · Финальный CTA.
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CreditCard,
  Image as ImageIcon,
  Layout,
  Settings2,
  Sparkles,
  TrendingUp,
  Wand2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { buildPageMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/_marketing/")({
  head: () => ({
    meta: buildPageMeta({
      title: "Neeklo · Сервис для запуска медиа-помощника и сайта",
      description:
        "Интерактивный сервис: создайте медиа-помощника и сайт в одном кабинете. Оплата в рублях, понятная настройка, готовые сценарии.",
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
                "Сервис Neeklo: медиа-помощник и сайт в одном кабинете. Оплата в рублях.",
            },
            { "@type": "WebSite", name: "Neeklo", url: "https://botme.neeklo.ru" },
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
      <TrustStrip />
      <ProductsTabs />
      <HowItWorks />
      <Interface />
      <Benefits />
      <Pricing />
      <Faq />
      <FinalCta />
    </div>
  );
}

/* ─────────────────── Hero ─────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      <Container>
        <div className="relative grid items-center gap-12 py-16 md:grid-cols-12 md:gap-16 md:py-28">
          <div className="md:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[12px] font-medium text-ink-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground" aria-hidden />
              Интерактивный сервис от Neeklo
            </div>

            <h1 className="font-display text-[40px] font-semibold leading-[1.05] tracking-[-0.025em] text-foreground md:text-[64px]">
              Медиа-помощник и сайт
              <br />
              в одном кабинете.
            </h1>

            <p className="mt-6 max-w-[560px] text-[16px] leading-relaxed text-ink-muted md:text-[18px]">
              Создайте помощника, который пишет посты и общается с клиентами.
              Запустите аккуратный сайт под услугу. Оплата в рублях, понятная
              настройка, всё в одном личном кабинете.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild variant="brand" size="lg">
                <Link to="/onboarding/assistant">
                  Создать сервис
                  <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/" hash="interface">
                  Посмотреть интерфейс
                </Link>
              </Button>
            </div>

            <dl className="mt-12 grid max-w-[560px] grid-cols-3 gap-6 border-t border-border pt-6">
              <Stat label="Запуск" value="за 1 день" />
              <Stat label="Оплата" value="в рублях" />
              <Stat label="Каналы" value="сайт + соцсети" />
            </dl>
          </div>

          <div className="md:col-span-5">
            <HeroPreview />
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[12px] uppercase tracking-wide text-ink-subtle">{label}</dt>
      <dd className="mt-1.5 font-display text-[20px] font-semibold tabular text-foreground">
        {value}
      </dd>
    </div>
  );
}

/* Interactive hero preview: имитирует превью сервиса. */
function HeroPreview() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-4 -z-10 rounded-3xl"
        style={{ background: "var(--surface-muted)" }}
      />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-lift">
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          </div>
          <div className="text-[11px] font-medium text-ink-subtle">
            neeklo.ru / кабинет
          </div>
          <div className="w-12" />
        </div>

        <div className="grid gap-4 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background">
              <Sparkles className="h-4 w-4 text-foreground" strokeWidth={1.75} />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold text-foreground">
                Медиа-помощник
              </div>
              <div className="text-[12px] text-ink-subtle">
                Готовит контент-план на неделю
              </div>
            </div>
            <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[10.5px] font-medium text-ink-muted">
              активен
            </span>
          </div>

          <div className="rounded-xl border border-border bg-background p-4">
            <div className="mb-2 text-[11px] uppercase tracking-wide text-ink-subtle">
              Сгенерировано сейчас
            </div>
            <div className="space-y-2.5">
              {[
                "Пост: 5 признаков, что пора обновить сайт услуги",
                "Reels: показываем кейс клиента до и после",
                "Сторис: голосование о новом дизайне",
              ].map((s) => (
                <div
                  key={s}
                  className="flex items-start gap-2.5 text-[13px] text-foreground"
                >
                  <Check className="mt-0.5 h-3.5 w-3.5 flex-none text-foreground" strokeWidth={2} />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-background p-3">
              <div className="text-[11px] uppercase tracking-wide text-ink-subtle">
                Сайт
              </div>
              <div className="mt-1 text-[15px] font-semibold text-foreground">
                /studio
              </div>
              <div className="mt-0.5 text-[11px] text-ink-subtle">опубликован</div>
            </div>
            <div className="rounded-xl border border-border bg-background p-3">
              <div className="text-[11px] uppercase tracking-wide text-ink-subtle">
                Баланс
              </div>
              <div className="mt-1 font-display text-[15px] font-semibold tabular text-foreground">
                4 280 ₽
              </div>
              <div className="mt-0.5 text-[11px] text-ink-subtle">пополнить</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── Trust ─────────────────── */

function TrustStrip() {
  return (
    <section className="border-y border-border bg-surface-muted/40">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-6 text-[12px] uppercase tracking-wide text-ink-subtle">
          <span>Работает в малом бизнесе РФ</span>
          <span className="hidden h-1 w-1 rounded-full bg-border-strong sm:block" />
          <span>Оплата в рублях через ЮKassa</span>
          <span className="hidden h-1 w-1 rounded-full bg-border-strong sm:block" />
          <span>Понятный кабинет на русском</span>
          <span className="hidden h-1 w-1 rounded-full bg-border-strong sm:block" />
          <span>Бренд Neeklo</span>
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────── Products ─────────────────── */

type ProductKey = "media" | "site";

const products: Record<
  ProductKey,
  {
    label: string;
    title: string;
    desc: string;
    bullets: string[];
    cta: { to: "/media" | "/site"; label: string };
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  }
> = {
  media: {
    label: "Медиа-помощник",
    title: "Контент для соцсетей без блока в голове",
    desc: "Помощник держит ваш голос бренда, готовит посты, сторис и reels по плану. Вы только согласовываете и публикуете.",
    bullets: [
      "Контент-план на неделю за пару минут",
      "Тексты, описания, заголовки и идеи reels",
      "Тон голоса под ваш бренд, без шаблонных фраз",
      "Готовые форматы: пост, сторис, рассылка",
    ],
    cta: { to: "/media", label: "Подробнее о медиа-помощнике" },
    icon: ImageIcon,
  },
  site: {
    label: "Сайты",
    title: "Аккуратный сайт под услугу за один вечер",
    desc: "Соберите сайт по короткому брифу: страницы, тарифы, форма заявки. Подключите домен и принимайте оплаты в рублях.",
    bullets: [
      "Страницы услуг, цен, контактов и кейсов",
      "Формы заявок и оплата в рублях",
      "Понятный редактор без вёрстки",
      "Свой домен и быстрая загрузка",
    ],
    cta: { to: "/site", label: "Подробнее про сайты" },
    icon: Layout,
  },
};

function ProductsTabs() {
  const [active, setActive] = useState<ProductKey>("media");
  const p = products[active];
  const Icon = p.icon;

  return (
    <section id="products" className="py-20 md:py-28">
      <Container>
        <SectionHead
          eyebrow="Два продукта"
          title="Сфокусированный набор, без лишнего"
          desc="Только то, что действительно нужно сервисному бизнесу: контент и сайт. Каждый продукт работает отдельно или вместе в одном кабинете."
        />

        <div className="mx-auto mt-10 inline-flex rounded-full border border-border bg-surface p-1">
          {(Object.keys(products) as ProductKey[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setActive(k)}
              className={
                "rounded-full px-4 py-2 text-[13px] font-medium transition-colors " +
                (active === k
                  ? "bg-foreground text-background"
                  : "text-ink-muted hover:text-foreground")
              }
              aria-pressed={active === k}
            >
              {products[k].label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-6">
            <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface">
              <Icon className="h-4 w-4" strokeWidth={1.75} />
            </div>
            <h3 className="font-display text-[28px] font-semibold tracking-[-0.02em] text-foreground md:text-[34px]">
              {p.title}
            </h3>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-muted">
              {p.desc}
            </p>
            <ul className="mt-6 space-y-3">
              {p.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[14.5px] text-foreground">
                  <Check className="mt-0.5 h-4 w-4 flex-none" strokeWidth={2} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <Button asChild variant="outline" size="md">
                <Link to={p.cta.to}>
                  {p.cta.label}
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                </Link>
              </Button>
            </div>
          </div>

          <div className="md:col-span-6">
            <ProductMock kind={active} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProductMock({ kind }: { kind: ProductKey }) {
  if (kind === "media") {
    return (
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-md">
        <div className="border-b border-border px-5 py-3 text-[12px] font-medium text-ink-muted">
          Контент-план · эта неделя
        </div>
        <div className="space-y-2 p-5">
          {[
            { d: "Пн", t: "Пост: подбор материалов для ремонта" },
            { d: "Вт", t: "Reels: 60 секунд о монтаже" },
            { d: "Ср", t: "Сторис: отзыв клиента" },
            { d: "Чт", t: "Пост: типичные ошибки в брифе" },
            { d: "Пт", t: "Рассылка: цены до конца месяца" },
          ].map((it) => (
            <div
              key={it.d}
              className="flex items-center gap-4 rounded-xl border border-border bg-background px-4 py-3"
            >
              <span className="w-8 text-[12px] font-semibold uppercase tracking-wide text-ink-subtle">
                {it.d}
              </span>
              <span className="flex-1 text-[14px] text-foreground">{it.t}</span>
              <span className="text-[11px] text-ink-subtle">готово</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-md">
      <div className="border-b border-border px-5 py-3 text-[12px] font-medium text-ink-muted">
        Структура сайта · студия ремонта
      </div>
      <div className="grid grid-cols-2 gap-3 p-5">
        {[
          { t: "Главная", s: "обложка + услуги" },
          { t: "Тарифы", s: "3 пакета, оплата" },
          { t: "Кейсы", s: "до и после" },
          { t: "Контакты", s: "форма заявки" },
        ].map((b) => (
          <div key={b.t} className="rounded-xl border border-border bg-background p-4">
            <div className="text-[13.5px] font-semibold text-foreground">{b.t}</div>
            <div className="mt-1 text-[12px] text-ink-subtle">{b.s}</div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
              <div
                className="h-full rounded-full bg-foreground"
                style={{ width: "80%" }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-border px-5 py-3 text-[12px] text-ink-muted">
        <span>Опубликовано · студия.neeklo.ru</span>
        <span className="font-medium text-foreground">оплата в ₽</span>
      </div>
    </div>
  );
}

/* ─────────────────── How it works ─────────────────── */

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Расскажите о бизнесе",
      desc: "Короткий бриф: что вы делаете, кому, в каком стиле. Без длинных анкет.",
      icon: Settings2,
    },
    {
      n: "02",
      title: "Соберите помощника или сайт",
      desc: "Пошаговый мастер. Готовые шаблоны для услуг, обучение и образование, локального бизнеса.",
      icon: Wand2,
    },
    {
      n: "03",
      title: "Запустите за один день",
      desc: "Свой домен, форма заявки, оплата в рублях через ЮKassa. Всё работает сразу.",
      icon: Zap,
    },
    {
      n: "04",
      title: "Управляйте в одном кабинете",
      desc: "Проекты, баланс, аналитика и команда в одном месте. Платите только за то, что используете.",
      icon: TrendingUp,
    },
  ];
  return (
    <section id="how" className="border-t border-border bg-surface-muted/40 py-20 md:py-28">
      <Container>
        <SectionHead
          eyebrow="Как это работает"
          title="Четыре шага от идеи до запуска"
          desc="Сервис ведёт за руку. Никакого кода и долгих внедрений."
        />
        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <li
                key={s.n}
                className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
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

/* ─────────────────── Interface ─────────────────── */

function Interface() {
  return (
    <section id="interface" className="py-20 md:py-28">
      <Container>
        <SectionHead
          eyebrow="Реальный интерфейс"
          title="Один кабинет на все проекты"
          desc="Создавайте, редактируйте и публикуйте без переключения окон. Видно баланс, заявки и публикации."
        />

        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-surface shadow-lift">
          <div className="grid md:grid-cols-12">
            {/* Sidebar */}
            <aside className="border-b border-border bg-background p-4 md:col-span-3 md:border-b-0 md:border-r">
              <div className="mb-4 text-[11px] uppercase tracking-wide text-ink-subtle">
                Проекты
              </div>
              <ul className="space-y-1">
                {[
                  { t: "Студия ремонта", a: true },
                  { t: "Школа английского", a: false },
                  { t: "Косметология", a: false },
                ].map((p) => (
                  <li key={p.t}>
                    <div
                      className={
                        "flex items-center justify-between rounded-lg px-3 py-2 text-[13.5px] " +
                        (p.a
                          ? "bg-foreground text-background"
                          : "text-foreground hover:bg-surface-muted")
                      }
                    >
                      <span>{p.t}</span>
                      {p.a && <span className="text-[10.5px] opacity-80">сейчас</span>}
                    </div>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border-strong px-3 py-2 text-[12.5px] font-medium text-ink-muted hover:text-foreground"
              >
                + Новый проект
              </button>
            </aside>

            {/* Main */}
            <div className="md:col-span-9">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div>
                  <div className="text-[12px] text-ink-subtle">Проект</div>
                  <div className="font-display text-[16px] font-semibold text-foreground">
                    Студия ремонта
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-ink-muted">
                    Сайт опубликован
                  </span>
                  <Button variant="brand" size="sm">
                    Создать пост
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 p-6 md:grid-cols-3">
                <Tile label="Заявки за неделю" value="24" hint="+8 к прошлой" />
                <Tile label="Постов готово" value="6" hint="на этой неделе" />
                <Tile label="Баланс" value="4 280 ₽" hint="хватает на ~22 поста" />
              </div>

              <div className="grid gap-4 px-6 pb-6 md:grid-cols-2">
                <div className="rounded-xl border border-border bg-background p-5">
                  <div className="mb-3 text-[12px] uppercase tracking-wide text-ink-subtle">
                    Последние публикации
                  </div>
                  <ul className="space-y-2.5 text-[13.5px]">
                    <li className="flex justify-between text-foreground">
                      <span>5 признаков обновить сайт</span>
                      <span className="text-ink-subtle">сегодня</span>
                    </li>
                    <li className="flex justify-between text-foreground">
                      <span>Кейс: квартира 42 м²</span>
                      <span className="text-ink-subtle">вчера</span>
                    </li>
                    <li className="flex justify-between text-foreground">
                      <span>Сторис: голосование</span>
                      <span className="text-ink-subtle">2 дня</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-xl border border-border bg-background p-5">
                  <div className="mb-3 text-[12px] uppercase tracking-wide text-ink-subtle">
                    Сайт
                  </div>
                  <div className="text-[13.5px] text-foreground">студия.neeklo.ru</div>
                  <div className="mt-1 text-[12px] text-ink-subtle">
                    4 страницы · форма заявки · оплата в ₽
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">
                      Редактировать
                    </Button>
                    <Button variant="ghostInk" size="sm">
                      Открыть
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Tile({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-5">
      <div className="text-[11.5px] uppercase tracking-wide text-ink-subtle">{label}</div>
      <div className="mt-2 font-display text-[24px] font-semibold tabular text-foreground">
        {value}
      </div>
      <div className="mt-1 text-[12px] text-ink-subtle">{hint}</div>
    </div>
  );
}

/* ─────────────────── Benefits ─────────────────── */

function Benefits() {
  const items = [
    {
      title: "Меньше рутины",
      desc: "Сервис готовит контент и держит структуру сайта. Вы тратите часы вместо дней.",
    },
    {
      title: "Понятная цена в рублях",
      desc: "Никаких зарубежных карт и подписок. Пополнили баланс, видите расход по делам.",
    },
    {
      title: "Один кабинет",
      desc: "Помощник, сайт, проекты и команда в одном месте. Без чатов и таблиц.",
    },
    {
      title: "Запуск за день",
      desc: "Короткий бриф, готовые шаблоны под услуги, обучение, локальный бизнес.",
    },
    {
      title: "Без вёрстки и кода",
      desc: "Всё редактируется кнопками. Свой домен подключается за пару кликов.",
    },
    {
      title: "Поддержка по-русски",
      desc: "Отвечаем в Telegram. Помогаем подобрать тариф и подключить оплату.",
    },
  ];
  return (
    <section className="border-y border-border bg-surface-muted/40 py-20 md:py-28">
      <Container>
        <SectionHead
          eyebrow="Что вы получаете"
          title="Конкретный результат, а не «AI-платформа»"
          desc="Сервис закрывает реальные задачи владельца бизнеса: меньше рутины, больше заявок."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <h3 className="font-display text-[17px] font-semibold tracking-[-0.01em] text-foreground">
                {it.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{it.desc}</p>
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
      price: "990 ₽",
      period: "в месяц",
      desc: "Чтобы попробовать сервис и собрать первый проект.",
      features: [
        "1 проект",
        "Медиа-помощник: 20 публикаций",
        "Сайт на поддомене .neeklo.ru",
        "Поддержка в Telegram",
      ],
      cta: "Начать со «Старта»",
      highlighted: false,
    },
    {
      name: "Бизнес",
      price: "2 490 ₽",
      period: "в месяц",
      desc: "Оптимально для услуги или небольшой студии.",
      features: [
        "3 проекта",
        "Медиа-помощник: 120 публикаций",
        "Сайт на своём домене",
        "Оплата клиентов в ₽ через ЮKassa",
        "Аналитика заявок",
      ],
      cta: "Выбрать «Бизнес»",
      highlighted: true,
    },
    {
      name: "Студия",
      price: "6 900 ₽",
      period: "в месяц",
      desc: "Для агентств и команд, которые ведут клиентов.",
      features: [
        "10 проектов",
        "Медиа-помощник без лимита",
        "Командный доступ",
        "Приоритетная поддержка",
        "Перенос проектов клиенту",
      ],
      cta: "Выбрать «Студию»",
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
                "flex flex-col rounded-2xl border p-6 transition-colors " +
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
                <span
                  className={
                    "text-[13px] " +
                    (p.highlighted ? "text-background/70" : "text-ink-subtle")
                  }
                >
                  {p.period}
                </span>
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
          <CreditCard className="h-3.5 w-3.5" strokeWidth={1.75} />
          Оплата картами РФ через ЮKassa. НДС включён.
        </div>
      </Container>
    </section>
  );
}

/* ─────────────────── FAQ ─────────────────── */

const faq = [
  {
    q: "Это для кого?",
    a: "Для услуг, обучения, локального бизнеса и небольших студий. Тех, кому нужен сайт и регулярный контент без отдельной команды.",
  },
  {
    q: "Что значит «медиа-помощник»?",
    a: "Это инструмент в кабинете, который готовит контент-план, тексты постов, сторис и идеи reels под ваш бренд. Вы согласовываете и публикуете.",
  },
  {
    q: "Сайт работает на своём домене?",
    a: "Да. На «Бизнес» и «Студии» можно подключить свой домен. На «Старте» используется адрес вида ваш-бренд.neeklo.ru.",
  },
  {
    q: "Как принимать оплату от клиентов?",
    a: "Подключаем ЮKassa. Клиенты платят российскими картами в рублях прямо с вашего сайта.",
  },
  {
    q: "Можно поменять тариф?",
    a: "Да, в любой момент из кабинета. При повышении доплачиваете только разницу.",
  },
  {
    q: "Если не подойдёт?",
    a: "Первые 7 дней бесплатно. Если сервис не подошёл, мы вернём оплату по запросу в поддержку.",
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
        <div
          className="mx-auto mt-10 max-w-[760px] divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface"
        >
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
              Запустите сервис сегодня.
              <br />
              Оплата в рублях.
            </h2>
            <p className="mx-auto mt-4 max-w-[520px] text-[15px] leading-relaxed text-background/75">
              Создайте проект за пару минут. Первые 7 дней бесплатно, без привязки карты.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="ink" size="lg">
                <Link to="/onboarding/assistant">
                  Создать сервис
                  <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghostInk"
                className="text-background hover:bg-background/10"
              >
                <Link to="/" hash="interface">
                  Посмотреть интерфейс
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
    <div className="mx-auto max-w-[680px] text-center">
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
