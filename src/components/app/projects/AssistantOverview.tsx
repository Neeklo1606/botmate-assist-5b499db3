/**
 * AssistantOverview — content для готового assistant-проекта.
 * Mock: live inbox-style список диалогов + KPI.
 */
import { Bot, MessageSquare, Sparkles, ArrowRight, User } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Project } from "@/lib/projects/types";

interface Conversation {
  id: string;
  visitor: string;
  channel: string;
  lastMessage: string;
  status: "lead" | "active" | "closed";
  time: string;
}

const MOCK_CONVERSATIONS: Conversation[] = [
  { id: "c1", visitor: "Анонимный #14", channel: "Сайт", lastMessage: "Подскажите, есть ли в наличии…", status: "lead", time: "сейчас" },
  { id: "c2", visitor: "Алексей",       channel: "Telegram", lastMessage: "Спасибо, оставлю заявку",      status: "lead", time: "5 мин" },
  { id: "c3", visitor: "Мария К.",      channel: "WhatsApp", lastMessage: "Понятно, подумаю",             status: "active", time: "12 мин" },
  { id: "c4", visitor: "Анонимный #11", channel: "Сайт",     lastMessage: "Спасибо!",                     status: "closed", time: "1 ч" },
];

export function AssistantOverview({ project }: { project: Project }) {
  const stats = project.stats ?? {};
  return (
    <div className="space-y-5">
      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard label="Лидов сегодня" value={String(stats.leadsCount ?? 0)} accent />
        <KpiCard label="Диалогов" value={String(stats.conversationsCount ?? 0)} />
        <KpiCard label="Среднее время ответа" value={`${stats.avgResponseSec ?? 0}c`} />
        <KpiCard label="Удовлетворённость" value={`${stats.satisfactionPct ?? 0}%`} />
      </div>

      {/* Inbox */}
      <section
        className="rounded-xl"
        style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        <header className="flex items-center justify-between border-b px-5 py-3.5"
          style={{ borderColor: "var(--color-border)" }}>
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4" style={{ color: "var(--color-accent)" }} strokeWidth={1.75} />
            <h3 className="font-display text-sm font-semibold text-foreground">Последние диалоги</h3>
          </div>
          <span className="text-xs" style={{ color: "var(--color-ink-muted)" }}>
            mock — реальные данные после запуска ассистента
          </span>
        </header>
        <ul className="divide-y" style={{ borderColor: "var(--color-border)" }}>
          {MOCK_CONVERSATIONS.map((c) => (
            <li key={c.id} className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-surface/[0.02]">
              <span
                className="flex h-9 w-9 flex-none items-center justify-center rounded-full"
                style={{ background: "var(--color-surface-muted)", border: "1px solid var(--color-border)" }}
              >
                <User className="h-4 w-4" style={{ color: "var(--color-ink-muted)" }} strokeWidth={1.75} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-foreground">{c.visitor}</span>
                  <span className="text-[11px]" style={{ color: "var(--color-ink-subtle)" }}>· {c.channel}</span>
                </div>
                <div className="mt-0.5 line-clamp-1 text-xs" style={{ color: "var(--color-ink-muted)" }}>
                  {c.lastMessage}
                </div>
              </div>
              <StatusPill status={c.status} />
              <span className="hidden text-[11px] tabular-nums sm:inline" style={{ color: "var(--color-ink-subtle)" }}>
                {c.time}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Suggestions */}
      <section
        className="flex items-start gap-3 rounded-xl border p-4"
        style={{
          background: "color-mix(in oklab, var(--color-accent) 8%, transparent)",
          borderColor: "color-mix(in oklab, var(--color-accent) 25%, transparent)",
        }}
      >
        <Sparkles className="h-4 w-4 flex-none text-accent" strokeWidth={1.75} />
        <div className="text-sm" style={{ color: "var(--color-ink-muted)" }}>
          Совет: добавьте 5 типовых вопросов клиентов в раздел знаний — это поднимет точность ответов на ~20%.
          <Link
            to="/knowledge"
            className="ml-2 inline-flex items-center gap-1 font-semibold text-accent hover:underline"
          >
            Открыть знания <ArrowRight className="h-3 w-3" strokeWidth={2} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function KpiCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl p-4" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
      <div className="text-[11px] uppercase tracking-wide" style={{ color: "var(--color-ink-muted)" }}>{label}</div>
      <div
        className={"mt-1 font-display text-2xl font-semibold tabular-nums " + (accent ? "text-accent" : "text-foreground")}
      >
        {value}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: Conversation["status"] }) {
  if (status === "lead") {
    return (
      <span
        className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent"
      >
        Лид
      </span>
    );
  }
  const map = {
    active: { label: "Активный", bg: "rgba(125,211,252,0.10)", fg: "#7dd3fc" },
    closed: { label: "Закрыт",  bg: "var(--color-surface-muted)", fg: "var(--color-ink-muted)" },
  } as const;
  const c = map[status];
  return (
    <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
      style={{ background: c.bg, color: c.fg }}>
      {c.label}
    </span>
  );
}
