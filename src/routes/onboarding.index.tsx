/**
 * /onboarding — публичный мок-мастер настройки агента (4 шага).
 */
import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  Globe,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { NeekloLogo } from "@/components/brand/neeklo-logo";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/onboarding/")({
  head: () => ({ meta: [{ title: "Онбординг — Avreya" }] }),
  component: OnboardingPage,
});

const NICHES = [
  "Автосервис",
  "Клиника",
  "Салон",
  "Недвижимость",
  "Магазин",
  "Ремонт",
  "Юристы",
  "Доставка",
  "Другое",
];

const PRODUCTS = [
  { id: "assistant", title: "AI-менеджер заявок", desc: "Отвечает 24/7, собирает лиды, передаёт в CRM.", icon: Bot },
  { id: "site", title: "AI-сайт под услугу", desc: "Готовая посадочная под нишу с формой заявки.", icon: Globe },
  { id: "media", title: "AI-медиа", desc: "Контент для соцсетей: посты, рилсы, идеи.", icon: Sparkles },
];

const CHANNELS = ["Telegram", "Сайт", "Avito", "MAX", "WhatsApp", "VK"];
const TONES = [
  { id: "business", label: "Деловой", desc: "Чётко, по делу, без эмодзи." },
  { id: "friendly", label: "Дружелюбный", desc: "Тепло, на «ты», с улыбкой." },
  { id: "expert", label: "Экспертный", desc: "Уверенно, со ссылками на опыт." },
];

const STEP_TITLES = ["Ваш бизнес", "Что нужно", "Каналы", "Тон и данные"];

interface State {
  niche: string;
  products: string[];
  channels: string[];
  siteUrl: string;
  tone: string;
  description: string;
}

function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [s, setS] = useState<State>({
    niche: "",
    products: [],
    channels: [],
    siteUrl: "",
    tone: "friendly",
    description: "",
  });

  const toggle = (key: "products" | "channels", value: string) => {
    setS((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const canNext =
    (step === 0 && !!s.niche) ||
    (step === 1 && s.products.length > 0) ||
    (step === 2 && s.channels.length > 0) ||
    step === 3;

  const next = () => {
    if (step < 3) setStep(step + 1);
    else setDone(true);
  };
  const back = () => (step > 0 ? setStep(step - 1) : null);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/70">
        <div className="container-px mx-auto flex h-14 max-w-[1200px] items-center justify-between">
          <Link to="/" aria-label="Avreya" className="transition-opacity hover:opacity-80">
            <NeekloLogo />
          </Link>
          <Link to="/" className="text-sm font-medium text-ink-muted transition-colors hover:text-foreground">
            Выйти
          </Link>
        </div>
      </header>

      <main className="container-px mx-auto w-full max-w-[760px] flex-1 py-10 md:py-14">
        {!done ? (
          <>
            <ProgressBar step={step} />

            <div key={step} className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="rounded-[20px] border border-border bg-surface p-6 shadow-[var(--shadow-md),var(--shadow-rim)] md:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-subtle">
                  Шаг {step + 1} из 4
                </p>
                <h1 className="mt-1.5 font-display text-[26px] font-semibold tracking-[-0.02em] text-foreground md:text-[32px]">
                  {STEP_TITLES[step]}
                </h1>

                <div className="mt-6">
                  {step === 0 && <StepNiche s={s} setS={setS} />}
                  {step === 1 && <StepProducts s={s} toggle={toggle} />}
                  {step === 2 && <StepChannels s={s} setS={setS} toggle={toggle} />}
                  {step === 3 && <StepTone s={s} setS={setS} />}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-surface px-5 text-[13px] font-semibold text-foreground transition-[opacity,transform] hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  <ArrowLeft className="h-4 w-4" /> Назад
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={!canNext}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-[13.5px] font-semibold text-accent-foreground shadow-xs transition-[opacity,transform] hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {step === 3 ? "Создать агента" : "Далее"} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <Summary s={s} onLead={() => setLeadOpen(true)} onCabinet={() => navigate({ to: "/app" })} />
        )}
      </main>

      {leadOpen && <LeadModal onClose={() => setLeadOpen(false)} />}
    </div>
  );
}

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2">
      {STEP_TITLES.map((title, i) => (
        <div key={title} className="flex flex-1 flex-col gap-1.5">
          <div
            className={`h-1.5 rounded-full transition-colors duration-300 ${
              i <= step ? "bg-accent" : "bg-border"
            }`}
          />
          <span
            className={`hidden text-[11px] font-medium uppercase tracking-[0.1em] transition-colors md:block ${
              i === step ? "text-foreground" : "text-ink-subtle"
            }`}
          >
            {i + 1}. {title}
          </span>
        </div>
      ))}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-11 rounded-full border px-4 text-[13.5px] font-medium transition-[transform,background-color,border-color,color] hover:-translate-y-px ${
        active
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border bg-surface text-foreground hover:border-foreground/40"
      }`}
    >
      {children}
    </button>
  );
}

function StepNiche({ s, setS }: { s: State; setS: (u: State) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {NICHES.map((n) => (
        <Chip key={n} active={s.niche === n} onClick={() => setS({ ...s, niche: n })}>
          {n}
        </Chip>
      ))}
    </div>
  );
}

function StepProducts({
  s,
  toggle,
}: {
  s: State;
  toggle: (k: "products" | "channels", v: string) => void;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {PRODUCTS.map((p) => {
        const active = s.products.includes(p.id);
        const Icon = p.icon;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => toggle("products", p.id)}
            className={`relative flex flex-col items-start gap-3 rounded-[16px] border p-5 text-left transition-[transform,border-color,background-color] hover:-translate-y-px ${
              active
                ? "border-accent bg-accent/8"
                : "border-border bg-surface hover:border-foreground/30"
            }`}
          >
            <div
              className={`grid h-10 w-10 place-items-center rounded-xl transition-colors ${
                active ? "bg-accent text-accent-foreground" : "bg-surface-muted text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-foreground">{p.title}</h3>
              <p className="mt-1 text-[12.5px] leading-relaxed text-ink-muted">{p.desc}</p>
            </div>
            {active && (
              <div className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-accent text-accent-foreground">
                <Check className="h-3 w-3" strokeWidth={3} />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

function StepChannels({
  s,
  setS,
  toggle,
}: {
  s: State;
  setS: (u: State) => void;
  toggle: (k: "products" | "channels", v: string) => void;
}) {
  const siteSelected = s.channels.includes("Сайт");
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {CHANNELS.map((c) => (
          <Chip key={c} active={s.channels.includes(c)} onClick={() => toggle("channels", c)}>
            {c}
          </Chip>
        ))}
      </div>
      {siteSelected && (
        <div className="animate-in fade-in slide-in-from-top-1 duration-200">
          <label htmlFor="site" className="mb-1.5 block text-xs font-medium text-ink-muted">
            Ссылка на сайт (если есть)
          </label>
          <Input
            id="site"
            type="url"
            value={s.siteUrl}
            onChange={(e) => setS({ ...s, siteUrl: e.target.value })}
            placeholder="https://example.com"
            className="h-11"
          />
        </div>
      )}
    </div>
  );
}

function StepTone({ s, setS }: { s: State; setS: (u: State) => void }) {
  return (
    <div className="space-y-5">
      <div className="grid gap-2.5 md:grid-cols-3">
        {TONES.map((t) => {
          const active = s.tone === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setS({ ...s, tone: t.id })}
              className={`rounded-[14px] border p-4 text-left transition-[transform,border-color,background-color] hover:-translate-y-px ${
                active
                  ? "border-accent bg-accent/8"
                  : "border-border bg-surface hover:border-foreground/30"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`grid h-4 w-4 place-items-center rounded-full border-2 transition-colors ${
                    active ? "border-accent bg-accent" : "border-border"
                  }`}
                >
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-accent-foreground" />}
                </span>
                <span className="text-[14px] font-semibold text-foreground">{t.label}</span>
              </div>
              <p className="mt-1.5 pl-6 text-[12px] text-ink-muted">{t.desc}</p>
            </button>
          );
        })}
      </div>

      <div>
        <label htmlFor="desc" className="mb-1.5 block text-xs font-medium text-ink-muted">
          Опишите бизнес и частые вопросы клиентов
        </label>
        <Textarea
          id="desc"
          rows={5}
          value={s.description}
          onChange={(e) => setS({ ...s, description: e.target.value })}
          placeholder="Что вы делаете, какие услуги, что чаще всего спрашивают…"
        />
      </div>

      <button
        type="button"
        onClick={() => toast("Загрузка файлов появится после подключения аккаунта")}
        className="inline-flex h-11 items-center gap-2 rounded-full border border-dashed border-border bg-surface px-5 text-[13px] font-medium text-ink-muted transition-colors hover:border-foreground/40 hover:text-foreground"
      >
        <Upload className="h-4 w-4" /> Загрузить прайс / FAQ
      </button>
    </div>
  );
}

function Summary({
  s,
  onCabinet,
  onLead,
}: {
  s: State;
  onCabinet: () => void;
  onLead: () => void;
}) {
  const productLabels = PRODUCTS.filter((p) => s.products.includes(p.id)).map((p) => p.title);
  const toneLabel = TONES.find((t) => t.id === s.tone)?.label ?? "—";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground">
          <Check className="h-6 w-6" strokeWidth={3} />
        </div>
        <h1 className="mt-4 font-display text-[28px] font-semibold tracking-[-0.02em] text-foreground md:text-[34px]">
          Техническое задание готово
        </h1>
        <p className="mt-2 text-[14px] text-ink-muted">
          Мы собрали ваши ответы. Можно идти в кабинет или передать нам — внедрим под ключ за 3 дня.
        </p>
      </div>

      <div className="mt-7 rounded-[20px] border border-border bg-surface p-6 shadow-[var(--shadow-md),var(--shadow-rim)] md:p-8">
        <SummaryRow label="Ниша" value={s.niche || "—"} />
        <SummaryRow label="Услуги" value={productLabels.length ? productLabels.join(", ") : "—"} />
        <SummaryRow label="Каналы" value={s.channels.length ? s.channels.join(", ") : "—"} />
        {s.siteUrl && <SummaryRow label="Сайт" value={s.siteUrl} />}
        <SummaryRow label="Тон" value={toneLabel} />
        <SummaryRow
          label="Описание"
          value={s.description || "—"}
          multiline
        />
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <button
          type="button"
          onClick={onCabinet}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent text-[14px] font-semibold text-accent-foreground shadow-xs transition-[transform] hover:-translate-y-px"
        >
          Перейти в кабинет <ArrowRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onLead}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-surface text-[14px] font-semibold text-foreground transition-[transform,border-color] hover:-translate-y-px hover:border-foreground/40"
        >
          Оставить заявку на внедрение под ключ
        </button>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-border/70 py-3 first:pt-0 last:border-0 last:pb-0 md:flex-row md:gap-6">
      <div className="w-32 shrink-0 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-subtle">
        {label}
      </div>
      <div
        className={`flex-1 text-[14px] text-foreground ${
          multiline ? "whitespace-pre-wrap" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function LeadModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      toast.error("Заполните имя и телефон");
      return;
    }
    toast.success("Заявка принята — мы свяжемся в течение часа");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[420px] rounded-[20px] border border-border bg-surface p-6 shadow-[var(--shadow-md),var(--shadow-rim)] md:p-7 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-display text-[20px] font-semibold tracking-[-0.02em] text-foreground">
              Внедрение под ключ
            </h2>
            <p className="mt-1 text-[13px] text-ink-muted">
              Соберём агента, подключим каналы и обучим за 3 дня.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="grid h-8 w-8 place-items-center rounded-full text-ink-muted transition-colors hover:bg-surface-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={submit} className="mt-5 space-y-3">
          <div>
            <label htmlFor="lead-name" className="mb-1.5 block text-xs font-medium text-ink-muted">
              Имя
            </label>
            <Input
              id="lead-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Как к вам обращаться"
              className="h-11"
            />
          </div>
          <div>
            <label htmlFor="lead-phone" className="mb-1.5 block text-xs font-medium text-ink-muted">
              Телефон
            </label>
            <Input
              id="lead-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 ___ ___ __ __"
              className="h-11"
            />
          </div>
          <button
            type="submit"
            className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-accent text-[13.5px] font-semibold text-accent-foreground shadow-xs transition-[transform] hover:-translate-y-px"
          >
            Отправить заявку
          </button>
        </form>
      </div>
    </div>
  );
}
