/**
 * /site — лендинг продукта «AI-сайт под услугу».
 * Лежит под _marketing layout, поэтому шапка и футер общие с главной.
 */
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Sparkles,
  Wand2,
  Rocket,
  Search,
  MessageSquare,
  Server,
  CreditCard,
  Check,
  X,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { buildPageMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/_marketing/site")({
  head: () => ({
    meta: buildPageMeta({
      title: "AI-сайт под услугу за один вечер — Avreya",
      description:
        "Опишите бизнес текстом, AI соберёт сайт с дизайном, текстами, формой и оплатой в рублях. От 4 900 ₽/мес.",
      path: "/site",
    }),
    links: [canonicalLink("/site")],
  }),
  component: SitePage,
});

const PREVIEW_LINES = [
  "▸ Анализирую описание бизнеса…",
  "▸ Подбираю палитру и типографику",
  "▸ Генерирую hero и блок услуг",
  "▸ Собираю форму заявки + AI-ассистент",
  "▸ Подключаю оплату в рублях",
  "✓ Превью сайта готово",
];

const STEPS = [
  { icon: Wand2, title: "Промпт", desc: "Опишите бизнес в свободной форме" },
  { icon: Sparkles, title: "Превью", desc: "AI собирает дизайн и тексты" },
  { icon: Rocket, title: "Публикация", desc: "Свой домен, SSL, аналитика" },
];

const PERKS = [
  { icon: Search, label: "SEO-тексты" },
  { icon: MessageSquare, label: "Форма + AI-ассистент" },
  { icon: Server, label: "Хостинг в РФ" },
  { icon: CreditCard, label: "Оплата в рублях" },
];

function SitePage() {
  const [brief, setBrief] = useState("");
  const [generating, setGenerating] = useState(false);
  const [shownLines, setShownLines] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  const startGenerate = () => {
    if (!brief.trim()) {
      toast("Сначала опишите бизнес");
      return;
    }
    setShowPreview(true);
    setGenerating(true);
    setShownLines(0);
  };

  useEffect(() => {
    if (!generating) return;
    if (shownLines >= PREVIEW_LINES.length) {
      setGenerating(false);
      return;
    }
    const t = setTimeout(() => setShownLines((n) => n + 1), 550);
    return () => clearTimeout(t);
  }, [generating, shownLines]);

  return (
    <main style={{ background: "var(--bg-base)" }} className="text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden pb-16 pt-24 lg:pb-24 lg:pt-32">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">
                <Sparkles className="h-3 w-3" /> Скоро
              </span>
              <h1 className="mt-5 font-display text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground md:text-[56px]">
                Сайт под услугу за один вечер
              </h1>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-muted md:text-[17px]">
                Опишите бизнес текстом — AI соберёт сайт с дизайном, текстами, формой и оплатой в рублях.
              </p>

              <div className="mt-8 flex flex-wrap items-baseline gap-3">
                <span className="font-display text-[28px] font-semibold tracking-[-0.02em] text-foreground">
                  от 4 900 ₽
                </span>
                <span className="text-[13.5px] text-ink-muted">/мес, хостинг включён</span>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button onClick={() => setWaitlistOpen(true)} className="rounded-full px-6">
                  В лист ожидания
                </Button>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("brief-input")?.focus()}
                  className="rounded-full px-6"
                >
                  Попробовать демо
                </Button>
              </div>
            </div>

            {/* Interactive panel */}
            <div className="rounded-[20px] border border-border bg-surface p-5 shadow-[var(--shadow-md,0_10px_30px_-12px_rgba(0,0,0,0.4))] md:p-6">
              <label className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink-subtle">
                Опишите ваш бизнес
              </label>
              <textarea
                id="brief-input"
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="Например: студия маникюра в центре Москвы, средний чек 3 500 ₽, веду запись в Telegram…"
                className="mt-2 min-h-[120px] w-full resize-y rounded-xl border border-border bg-[var(--bg-base)] px-3.5 py-3 text-[14px] text-foreground outline-none transition focus:border-accent"
              />
              <Button
                onClick={startGenerate}
                disabled={generating}
                className="mt-3 w-full rounded-xl"
              >
                {generating ? "Генерируем…" : "Сгенерировать превью"}
              </Button>

              {showPreview && (
                <div className="mt-5 overflow-hidden rounded-xl border border-border bg-[var(--bg-base)]">
                  {/* Window bar */}
                  <div className="flex items-center gap-1.5 border-b border-border bg-surface/50 px-3 py-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                    <span className="ml-3 truncate text-[11px] text-ink-subtle">
                      preview.avreya.ru
                    </span>
                  </div>
                  {/* Type-out console */}
                  <pre className="px-4 py-3 text-[12px] leading-relaxed text-ink-muted">
                    {PREVIEW_LINES.slice(0, shownLines).map((l, i) => (
                      <div key={i} className={l.startsWith("✓") ? "text-emerald-400" : ""}>
                        {l}
                      </div>
                    ))}
                    {generating && (
                      <span className="inline-block h-3 w-1.5 animate-pulse bg-foreground/70 align-middle" />
                    )}
                  </pre>
                  {/* Mock layout skeleton */}
                  {shownLines >= PREVIEW_LINES.length && (
                    <div className="space-y-3 border-t border-border p-4">
                      <div className="h-6 w-3/4 rounded-md bg-surface" />
                      <div className="h-3 w-1/2 rounded bg-surface/70" />
                      <div className="grid grid-cols-3 gap-2 pt-2">
                        <div className="h-16 rounded-lg bg-surface" />
                        <div className="h-16 rounded-lg bg-surface" />
                        <div className="h-16 rounded-lg bg-surface" />
                      </div>
                      <div className="h-9 w-32 rounded-full bg-accent/80" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* STEPS */}
      <section className="py-10 lg:py-14">
        <Container>
          <div className="grid gap-4 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                className="rounded-2xl border border-border bg-surface/60 p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <s.icon className="h-4 w-4" />
                  </span>
                  <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink-subtle">
                    Шаг {i + 1}
                  </span>
                </div>
                <h3 className="mt-3 text-[16px] font-semibold text-foreground">{s.title}</h3>
                <p className="mt-1 text-[13.5px] text-ink-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* PERKS */}
      <section className="pb-10 lg:pb-14">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-2xl border border-border bg-surface/40 px-5 py-4">
            {PERKS.map((p) => (
              <div key={p.label} className="flex items-center gap-2 text-[13.5px] text-foreground">
                <p.icon className="h-4 w-4 text-accent" />
                {p.label}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* PRICE CTA */}
      <section className="pb-20 lg:pb-28">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 rounded-[20px] border border-border bg-surface p-6 text-center md:flex-row md:p-8 md:text-left">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink-subtle">
                Тариф
              </p>
              <p className="mt-1 font-display text-[28px] font-semibold tracking-[-0.02em] text-foreground">
                от 4 900 ₽<span className="text-[14px] font-normal text-ink-muted"> /мес</span>
              </p>
              <p className="mt-1 text-[13.5px] text-ink-muted">
                Включено: домен, SSL, форма, AI-ассистент, хостинг в РФ.
              </p>
            </div>
            <Button onClick={() => setWaitlistOpen(true)} className="rounded-full px-6">
              В лист ожидания
            </Button>
          </div>
        </Container>
      </section>

      {waitlistOpen && <WaitlistModal onClose={() => setWaitlistOpen(false)} />}
    </main>
  );
}

function WaitlistModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast("Заполните имя и телефон");
      return;
    }
    toast.success("Вы в листе ожидания, мы свяжемся");
    onClose();
  };
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        className="w-full max-w-md rounded-[20px] border border-border bg-surface p-6 shadow-[var(--shadow-md,0_10px_30px_-12px_rgba(0,0,0,0.4))]"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[18px] font-semibold text-foreground">Лист ожидания</h3>
            <p className="mt-1 text-[13px] text-ink-muted">
              Сообщим, как только AI-сайт откроется для всех.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-ink-muted transition hover:bg-[var(--bg-base)] hover:text-foreground"
            aria-label="Закрыть"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 space-y-3">
          <div>
            <label className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink-subtle">
              Имя
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Как к вам обращаться"
              className="mt-2 w-full rounded-xl border border-border bg-[var(--bg-base)] px-3.5 py-2.5 text-[14px] text-foreground outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink-subtle">
              Телефон
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 ___ ___-__-__"
              inputMode="tel"
              className="mt-2 w-full rounded-xl border border-border bg-[var(--bg-base)] px-3.5 py-2.5 text-[14px] text-foreground outline-none focus:border-accent"
            />
          </div>
        </div>

        <Button type="submit" className="mt-6 w-full rounded-xl">
          <Check className="mr-2 h-4 w-4" /> Отправить заявку
        </Button>
      </form>
    </div>
  );
}
