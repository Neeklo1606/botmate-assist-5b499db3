/**
 * /dashboard — личный кабинет (mock, без бэка).
 * Разделы переключаются через useState, без вложенных роутов.
 */
import { useState, type ComponentType } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bot,
  BookOpen,
  Radio,
  Users,
  CreditCard,
  Settings,
  Plus,
  LogOut,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { NeekloLogo } from "@/components/brand/neeklo-logo";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Кабинет — Avreya" }] }),
  component: DashboardPage,
});

type SectionId = "agents" | "knowledge" | "channels" | "leads" | "billing" | "settings";

interface Section {
  id: SectionId;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

const SECTIONS: Section[] = [
  { id: "agents", label: "Агенты", icon: Bot },
  { id: "knowledge", label: "База знаний", icon: BookOpen },
  { id: "channels", label: "Каналы", icon: Radio },
  { id: "leads", label: "Лиды", icon: Users },
  { id: "billing", label: "Тарифы", icon: CreditCard },
  { id: "settings", label: "Настройки", icon: Settings },
];

function DashboardPage() {
  const [active, setActive] = useState<SectionId>("agents");
  const current = SECTIONS.find((s) => s.id === active)!;

  return (
    <div className="flex min-h-screen bg-bg-alt">
      {/* Desktop sidebar */}
      <aside className="hidden w-[240px] shrink-0 flex-col border-r border-border bg-surface md:flex">
        <div className="flex h-16 items-center px-5">
          <Link to="/" aria-label="Avreya — на главную" className="transition-opacity hover:opacity-80">
            <NeekloLogo />
          </Link>
        </div>

        <nav className="flex-1 space-y-0.5 px-3 py-2">
          {SECTIONS.map((s) => {
            const isActive = s.id === active;
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13.5px] font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-ink-muted hover:bg-surface-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {s.label}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-border p-3">
          <div className="flex items-center gap-3 rounded-xl px-2 py-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-accent text-[13px] font-semibold text-accent-foreground">
              ИП
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-foreground">Иван Петров</p>
              <p className="truncate text-[11.5px] text-ink-muted">ip@avreya.ru</p>
            </div>
            <Link
              to="/"
              aria-label="Выйти"
              className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-surface-muted hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur-md">
          <div className="flex h-16 items-center gap-3 px-5 md:px-7">
            <h1 className="min-w-0 flex-1 truncate font-display text-[18px] font-semibold tracking-[-0.01em] text-foreground md:text-[20px]">
              {current.label}
            </h1>
            <div className="hidden items-center gap-2 rounded-full border border-border bg-surface-muted px-3 py-1.5 text-[12px] font-medium text-ink-muted sm:flex">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Старт · 12 дней пробного
            </div>
            <button
              type="button"
              onClick={() => toast.success("Открываем мастер создания агента")}
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-accent px-4 text-[13px] font-semibold text-accent-foreground shadow-xs transition-[transform] hover:-translate-y-px"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Создать агента</span>
              <span className="sm:hidden">Агент</span>
            </button>
          </div>
        </header>

        <main className="flex-1 px-5 pb-24 pt-6 md:px-7 md:pb-10 md:pt-8">
          <div key={active} className="animate-in fade-in slide-in-from-bottom-1 duration-200">
            <SectionView id={active} />
          </div>
        </main>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur-md md:hidden">
        <div className="mx-auto flex max-w-[600px] items-stretch justify-between px-2 py-1.5">
          {SECTIONS.map((s) => {
            const isActive = s.id === active;
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                aria-label={s.label}
                className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg px-1 py-1.5 text-[10px] font-medium transition-colors ${
                  isActive ? "text-accent" : "text-ink-muted"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="truncate">{s.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

/* ---------- Sections ---------- */

function SectionView({ id }: { id: SectionId }) {
  switch (id) {
    case "agents":
      return <AgentsSection />;
    case "knowledge":
      return <KnowledgeSection />;
    case "channels":
      return <ChannelsSection />;
    case "leads":
      return <LeadsSection />;
    case "billing":
      return <BillingSection />;
    case "settings":
      return <SettingsSection />;
  }
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[20px] border border-border bg-surface p-5 shadow-[var(--shadow-md),var(--shadow-rim)] md:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

function AgentsSection() {
  const agents = [
    { name: "Менеджер автосервиса", status: "Активен", channels: "Telegram, Сайт", leads: 124 },
    { name: "Менеджер клиники", status: "Черновик", channels: "WhatsApp", leads: 0 },
  ];
  return (
    <div className="space-y-3">
      {agents.map((a) => (
        <Card key={a.name}>
          <div className="flex items-start gap-4">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
              <Bot className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-[15px] font-semibold text-foreground">{a.name}</h3>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                    a.status === "Активен"
                      ? "border-accent/40 bg-accent/10 text-foreground"
                      : "border-border bg-surface-muted text-ink-muted"
                  }`}
                >
                  {a.status}
                </span>
              </div>
              <p className="mt-1 text-[12.5px] text-ink-muted">Каналы: {a.channels}</p>
            </div>
            <div className="text-right">
              <div className="font-display text-[22px] font-semibold tracking-[-0.02em] text-foreground">
                {a.leads}
              </div>
              <p className="text-[11px] uppercase tracking-[0.1em] text-ink-subtle">лидов</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function KnowledgeSection() {
  const items = ["Прайс автосервиса.pdf", "FAQ.docx", "Условия записи.txt"];
  return (
    <Card>
      <h2 className="text-[15px] font-semibold text-foreground">Документы</h2>
      <p className="mt-1 text-[13px] text-ink-muted">Файлы, на которых обучается агент.</p>
      <ul className="mt-4 divide-y divide-border">
        {items.map((f) => (
          <li key={f} className="flex items-center justify-between py-3 text-[13.5px] text-foreground">
            <span>{f}</span>
            <span className="text-[12px] text-ink-subtle">обновлено сегодня</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function ChannelsSection() {
  const channels = [
    { name: "Telegram", on: true },
    { name: "Сайт", on: true },
    { name: "WhatsApp", on: false },
    { name: "Avito", on: false },
    { name: "MAX", on: false },
    { name: "VK", on: false },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {channels.map((c) => (
        <Card key={c.name} className="!p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[14px] font-semibold text-foreground">{c.name}</h3>
              <p className="mt-0.5 text-[12px] text-ink-muted">
                {c.on ? "Подключён" : "Не подключён"}
              </p>
            </div>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                c.on
                  ? "bg-accent text-accent-foreground"
                  : "border border-border bg-surface-muted text-ink-muted"
              }`}
            >
              {c.on ? "вкл" : "выкл"}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}

function LeadsSection() {
  const leads = [
    { name: "Алексей К.", phone: "+7 999 123-45-67", status: "Горячий", time: "5 мин назад" },
    { name: "Марина С.", phone: "+7 905 222-11-00", status: "Тёплый", time: "1 час назад" },
    { name: "Дмитрий П.", phone: "+7 911 555-77-88", status: "Новый", time: "вчера" },
  ];
  return (
    <Card className="!p-0">
      <div className="border-b border-border px-5 py-4 md:px-6">
        <h2 className="text-[15px] font-semibold text-foreground">Последние лиды</h2>
      </div>
      <ul className="divide-y divide-border">
        {leads.map((l) => (
          <li key={l.phone} className="flex items-center justify-between gap-4 px-5 py-4 md:px-6">
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold text-foreground">{l.name}</p>
              <p className="truncate text-[12.5px] text-ink-muted">{l.phone}</p>
            </div>
            <span className="hidden rounded-full border border-border bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-foreground sm:inline-block">
              {l.status}
            </span>
            <span className="shrink-0 text-[12px] text-ink-subtle">{l.time}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function BillingSection() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
      <Card>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
          Текущий тариф
        </p>
        <h2 className="mt-1 font-display text-[24px] font-semibold tracking-[-0.02em] text-foreground">
          Старт
        </h2>
        <p className="mt-1 text-[13px] text-ink-muted">12 дней пробного периода осталось.</p>
        <button
          type="button"
          className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-[13px] font-semibold text-accent-foreground transition-[transform] hover:-translate-y-px"
        >
          Перейти на платный
        </button>
      </Card>
      <Card>
        <h3 className="text-[14px] font-semibold text-foreground">Использование</h3>
        <ul className="mt-3 space-y-2 text-[13px] text-ink-muted">
          <li className="flex justify-between"><span>Диалогов</span><span className="text-foreground">214 / 1000</span></li>
          <li className="flex justify-between"><span>Каналов</span><span className="text-foreground">2 / 3</span></li>
          <li className="flex justify-between"><span>Агентов</span><span className="text-foreground">2 / 2</span></li>
        </ul>
      </Card>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="space-y-3">
      <Card>
        <h3 className="text-[14px] font-semibold text-foreground">Профиль</h3>
        <p className="mt-1 text-[13px] text-ink-muted">Иван Петров · ip@avreya.ru</p>
      </Card>
      <Card>
        <h3 className="text-[14px] font-semibold text-foreground">Уведомления</h3>
        <p className="mt-1 text-[13px] text-ink-muted">Email и Telegram при новом лиде.</p>
      </Card>
    </div>
  );
}
