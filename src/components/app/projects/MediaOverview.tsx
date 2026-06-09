/**
 * MediaOverview — посты-сетка + календарь публикаций.
 */
import { Calendar, Image as ImageIcon, TrendingUp } from "lucide-react";
import type { Project } from "@/lib/projects/types";

interface Post {
  id: string;
  title: string;
  status: "scheduled" | "draft" | "published";
  date: string;
  type: "карусель" | "видео" | "пост";
}

const POSTS: Post[] = [
  { id: "p1", title: "5 ошибок при выборе…", status: "scheduled", date: "Пн, 10:00", type: "карусель" },
  { id: "p2", title: "Как мы делаем X за…", status: "scheduled", date: "Ср, 18:00", type: "видео" },
  { id: "p3", title: "Кейс: +47% выручки", status: "draft", date: "—", type: "пост" },
  { id: "p4", title: "Топ-3 совета на…", status: "scheduled", date: "Пт, 09:00", type: "карусель" },
  { id: "p5", title: "Reels: backstage",   status: "draft", date: "—", type: "видео" },
];

const WEEK = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const SLOTS: Record<string, ("scheduled" | null)[]> = {
  Пн: ["scheduled", null, null],
  Вт: [null, null, null],
  Ср: [null, "scheduled", null],
  Чт: [null, null, null],
  Пт: ["scheduled", null, null],
  Сб: [null, null, null],
  Вс: [null, null, null],
};

export function MediaOverview({ project }: { project: Project }) {
  const stats = project.stats ?? {};
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Kpi label="Сгенерировано" value={String(stats.postsGenerated ?? 0)} accent />
        <Kpi label="В плане" value={String(stats.postsScheduled ?? 0)} />
        <Kpi label="Охват за неделю" value={fmt(stats.totalReach ?? 0)} />
        <Kpi label="Engagement" value="4.2%" />
      </div>

      {/* Posts grid */}
      <section
        className="rounded-xl"
        style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        <header className="flex items-center justify-between border-b px-5 py-3.5" style={{ borderColor: "var(--color-border)" }}>
          <div className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" style={{ color: "var(--color-accent)" }} strokeWidth={1.75} />
            <h3 className="font-display text-sm font-semibold text-foreground">Сгенерированные посты</h3>
          </div>
          <span className="text-xs" style={{ color: "var(--color-ink-muted)" }}>mock-превью</span>
        </header>
        <div className="grid grid-cols-2 gap-3 p-5 md:grid-cols-3 lg:grid-cols-5">
          {POSTS.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-lg" style={{ border: "1px solid var(--color-border)" }}>
              <div
                className="aspect-square w-full"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(244,114,182,0.18), color-mix(in oklab, var(--color-accent) 10%, transparent))",
                }}
              />
              <div className="px-2.5 py-2">
                <div className="line-clamp-2 text-[11px] font-medium text-foreground">{p.title}</div>
                <div className="mt-1 flex items-center justify-between text-[10px]" style={{ color: "var(--color-ink-muted)" }}>
                  <span>{p.type}</span>
                  <span style={{ color: p.status === "scheduled" ? "var(--color-accent)" : "var(--color-ink-muted)" }}>
                    {p.status === "scheduled" ? p.date : "черновик"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Calendar */}
      <section className="rounded-xl" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
        <header className="flex items-center justify-between border-b px-5 py-3.5" style={{ borderColor: "var(--color-border)" }}>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" style={{ color: "var(--color-accent)" }} strokeWidth={1.75} />
            <h3 className="font-display text-sm font-semibold text-foreground">Календарь публикаций (неделя)</h3>
          </div>
          <TrendingUp className="h-4 w-4" style={{ color: "var(--color-ink-subtle)" }} strokeWidth={1.75} />
        </header>
        <div className="grid grid-cols-7 gap-px p-3" style={{ background: "var(--color-border)" }}>
          {WEEK.map((d) => (
            <div key={d} className="flex min-h-[72px] flex-col gap-1 p-2" style={{ background: "var(--color-surface-sunken)" }}>
              <span className="text-[10px] font-semibold uppercase" style={{ color: "var(--color-ink-subtle)" }}>{d}</span>
              {SLOTS[d]!.map((slot, i) => (
                <span
                  key={i}
                  className="h-1.5 rounded-full"
                  style={{ background: slot ? "var(--color-accent)" : "var(--color-surface-muted)" }}
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Kpi({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl p-4" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
      <div className="text-[11px] uppercase tracking-wide" style={{ color: "var(--color-ink-muted)" }}>{label}</div>
      <div className="mt-1 font-display text-2xl font-semibold tabular-nums" style={{ color: accent ? "var(--color-accent)" : "var(--color-foreground)" }}>
        {value}
      </div>
    </div>
  );
}

function fmt(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}
