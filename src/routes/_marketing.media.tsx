/**
 * /media — лендинг продукта «AI-продюсер контента».
 * Лежит под _marketing layout, поэтому шапка и футер общие с главной.
 */
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Sparkles,
  FileText,
  Image as ImageIcon,
  Scissors,
  Send,
  Play,
  Check,
  X,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { buildPageMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/_marketing/media")({
  head: () => ({
    meta: buildPageMeta({
      title: "AI-продюсер контента — Avreya",
      description:
        "Нодовая система: сценарий, визуал, монтаж, публикация. Reels и ролики без съёмочной группы. От 14 900 ₽/мес.",
      path: "/media",
    }),
    links: [canonicalLink("/media")],
  }),
  component: MediaPage,
});

type NodeId = "script" | "visual" | "edit" | "publish";

const NODES: { id: NodeId; title: string; desc: string; Icon: typeof FileText }[] = [
  { id: "script", title: "Сценарий", desc: "Хук, структура, текст на 30 сек", Icon: FileText },
  { id: "visual", title: "Визуал", desc: "Кадры через Midjourney и Kling", Icon: ImageIcon },
  { id: "edit", title: "Монтаж", desc: "Склейка, субтитры, озвучка", Icon: Scissors },
  { id: "publish", title: "Публикация", desc: "В Reels, Shorts, Telegram", Icon: Send },
];

const TOOLS = ["Kling", "Runway", "Midjourney", "ElevenLabs", "Suno", "HeyGen"];

const FORMATS = [
  { title: "Reels", duration: "15–30 сек", note: "Вертикаль 9:16" },
  { title: "Shorts", duration: "до 60 сек", note: "Для YouTube и VK" },
  { title: "Рекламный ролик", duration: "30–60 сек", note: "С CTA и оффером" },
];

function MediaPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [hoverNode, setHoverNode] = useState<NodeId | null>(null);

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
                AI-продюсер контента
              </h1>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-muted md:text-[17px]">
                Нодовая система: сценарий → визуал → монтаж → публикация. Reels и ролики без съёмочной группы.
              </p>

              <div className="mt-8 flex flex-wrap items-baseline gap-3">
                <span className="font-display text-[28px] font-semibold tracking-[-0.02em] text-foreground">
                  от 14 900 ₽
                </span>
                <span className="text-[13.5px] text-ink-muted">/мес, контент включён</span>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button onClick={() => setWaitlistOpen(true)} className="rounded-full px-6">
                  В лист ожидания
                </Button>
              </div>
            </div>

            {/* Node graph */}
            <NodeGraph hoverNode={hoverNode} setHoverNode={setHoverNode} />
          </div>
        </Container>
      </section>

      {/* TOOLS */}
      <section className="py-8 lg:py-10">
        <Container>
          <p className="text-center text-[12px] font-medium uppercase tracking-[0.14em] text-ink-subtle">
            Под капотом
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {TOOLS.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-[13px] text-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* FORMATS */}
      <section className="py-10 lg:py-14">
        <Container>
          <div className="grid gap-4 sm:grid-cols-3">
            {FORMATS.map((f) => (
              <div
                key={f.title}
                className="overflow-hidden rounded-2xl border border-border bg-surface/60"
              >
                <div
                  className="relative flex aspect-[9/12] items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, color-mix(in oklab, var(--accent) 20%, transparent), color-mix(in oklab, var(--accent) 4%, transparent))",
                  }}
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface/80 backdrop-blur">
                    <Play className="h-5 w-5 text-foreground" fill="currentColor" />
                  </span>
                  <span className="absolute left-3 top-3 rounded-full bg-black/40 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur">
                    {f.duration}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-[15px] font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-1 text-[12.5px] text-ink-muted">{f.note}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* PRICE CTA */}
      <section className="pb-20 pt-6 lg:pb-28">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 rounded-[20px] border border-border bg-surface p-6 text-center md:flex-row md:p-8 md:text-left">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink-subtle">
                Тариф
              </p>
              <p className="mt-1 font-display text-[28px] font-semibold tracking-[-0.02em] text-foreground">
                от 14 900 ₽<span className="text-[14px] font-normal text-ink-muted"> /мес</span>
              </p>
              <p className="mt-1 text-[13.5px] text-ink-muted">
                Включено: 8 роликов в месяц, сценарии, монтаж, публикация.
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

function NodeGraph({
  hoverNode,
  setHoverNode,
}: {
  hoverNode: NodeId | null;
  setHoverNode: (id: NodeId | null) => void;
}) {
  return (
    <div className="rounded-[20px] border border-border bg-surface p-5 shadow-[var(--shadow-md,0_10px_30px_-12px_rgba(0,0,0,0.4))] md:p-6">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink-subtle">
          Пайплайн
        </span>
        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10.5px] font-medium text-emerald-400">
          live
        </span>
      </div>

      {/* Desktop: horizontal flow with SVG lines */}
      <div className="relative mt-5 hidden sm:block">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 60"
          preserveAspectRatio="none"
          aria-hidden
        >
          {[1, 2, 3].map((i) => (
            <line
              key={i}
              x1={i * 100 - 50}
              y1="30"
              x2={i * 100 + 50}
              y2="30"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="text-border"
            />
          ))}
        </svg>
        <div className="relative grid grid-cols-4 gap-3">
          {NODES.map((n) => {
            const active = hoverNode === n.id;
            return (
              <button
                key={n.id}
                onMouseEnter={() => setHoverNode(n.id)}
                onMouseLeave={() => setHoverNode(null)}
                onFocus={() => setHoverNode(n.id)}
                onBlur={() => setHoverNode(null)}
                className={`group relative flex flex-col items-center gap-2 rounded-xl border bg-[var(--bg-base)] p-3 transition ${
                  active
                    ? "border-accent shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent)_25%,transparent)]"
                    : "border-border"
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                    active ? "bg-accent text-accent-foreground" : "bg-surface text-ink-muted"
                  }`}
                >
                  <n.Icon className="h-4 w-4" />
                </span>
                <span className="text-[12px] font-medium text-foreground">{n.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="mt-5 space-y-2 sm:hidden">
        {NODES.map((n, i) => {
          const active = hoverNode === n.id;
          return (
            <div key={n.id}>
              <button
                onClick={() => setHoverNode(active ? null : n.id)}
                className={`flex w-full items-center gap-3 rounded-xl border bg-[var(--bg-base)] p-3 transition ${
                  active ? "border-accent" : "border-border"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    active ? "bg-accent text-accent-foreground" : "bg-surface text-ink-muted"
                  }`}
                >
                  <n.Icon className="h-4 w-4" />
                </span>
                <span className="text-[13.5px] font-medium text-foreground">{n.title}</span>
              </button>
              {i < NODES.length - 1 && (
                <div className="ml-[22px] h-3 w-px border-l border-dashed border-border" />
              )}
            </div>
          );
        })}
      </div>

      {/* Caption */}
      <div className="mt-5 min-h-[44px] rounded-xl border border-border bg-[var(--bg-base)] p-3 text-[13px] text-ink-muted">
        {hoverNode ? (
          <span>
            <span className="font-medium text-foreground">
              {NODES.find((n) => n.id === hoverNode)?.title}:
            </span>{" "}
            {NODES.find((n) => n.id === hoverNode)?.desc}
          </span>
        ) : (
          <span className="text-ink-subtle">Наведите на ноду — покажу, что она делает.</span>
        )}
      </div>
    </div>
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
              Сообщим, как только AI-продюсер откроется для всех.
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
