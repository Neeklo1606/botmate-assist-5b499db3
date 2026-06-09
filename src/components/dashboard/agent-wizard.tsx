/**
 * AgentWizard — полноэкранная модалка создания агента.
 * Левая колонка: 4 шага. Правая: живой превью карточки.
 */
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  Plus,
  Sparkles,
  X,
} from "lucide-react";

export interface AgentDraft {
  id: string;
  name: string;
  niche: string;
  status: "draft";
  channels: never[];
  dialogsToday: number;
  leads: number;
  tone: ToneId;
  greeting: string;
  autonomy: number;
  handoff: boolean;
  fields: string[];
}

type ToneId = "business" | "friendly" | "expert";

interface Template {
  id: string;
  niche: string;
  tone: ToneId;
  greeting: string;
  emoji: string;
}

const TEMPLATES: Template[] = [
  { id: "clinic", niche: "Клиника", tone: "business", greeting: "Здравствуйте! Подскажу по услугам и помогу записаться на приём.", emoji: "🩺" },
  { id: "auto", niche: "Автосервис", tone: "friendly", greeting: "Привет! Расскажу про услуги и запишу на удобное время.", emoji: "🔧" },
  { id: "beauty", niche: "Салон", tone: "friendly", greeting: "Здравствуйте! Помогу подобрать мастера и записать вас.", emoji: "💅" },
  { id: "realty", niche: "Недвижимость", tone: "expert", greeting: "Здравствуйте. Подберу варианты и отвечу на вопросы по объектам.", emoji: "🏠" },
  { id: "shop", niche: "Магазин", tone: "friendly", greeting: "Привет! Подскажу по наличию, цене и доставке.", emoji: "🛍️" },
  { id: "universal", niche: "Универсальный", tone: "business", greeting: "Здравствуйте! Я помогу с вашим вопросом.", emoji: "✨" },
];

const TONES: { id: ToneId; label: string }[] = [
  { id: "business", label: "Деловой" },
  { id: "friendly", label: "Дружелюбный" },
  { id: "expert", label: "Экспертный" },
];

const AUTONOMY_LABELS = ["Только отвечает", "Квалифицирует", "Назначает звонок"];

const ALL_FIELDS = ["Имя", "Телефон", "Услуга", "Бюджет", "Срочность", "Адрес"];

const STEP_TITLES = ["Шаблон", "Параметры", "Поля заявки", "Готово"];

interface Props {
  onClose: () => void;
  onSave: (a: AgentDraft) => void;
}

export function AgentWizard({ onClose, onSave }: Props) {
  const [step, setStep] = useState(0);
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [niche, setNiche] = useState("");
  const [tone, setTone] = useState<ToneId>("friendly");
  const [greeting, setGreeting] = useState("");
  const [autonomy, setAutonomy] = useState(1);
  const [handoff, setHandoff] = useState(true);
  const [fields, setFields] = useState<string[]>(["Имя", "Телефон", "Услуга"]);

  const draft: AgentDraft = useMemo(
    () => ({
      id: `a${Date.now()}`,
      name: name || "Новый агент",
      niche: niche || "Универсальный",
      status: "draft",
      channels: [],
      dialogsToday: 0,
      leads: 0,
      tone,
      greeting,
      autonomy,
      handoff,
      fields,
    }),
    [name, niche, tone, greeting, autonomy, handoff, fields],
  );

  const pickTemplate = (t: Template) => {
    setTemplateId(t.id);
    setNiche(t.niche);
    setTone(t.tone);
    setGreeting(t.greeting);
    if (!name) setName(`Менеджер · ${t.niche.toLowerCase()}`);
  };

  const toggleField = (f: string) =>
    setFields((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const canNext =
    (step === 0 && !!templateId) ||
    (step === 1 && name.trim().length > 0 && greeting.trim().length > 0) ||
    (step === 2 && fields.length > 0) ||
    step === 3;

  const next = () => (step < 3 ? setStep(step + 1) : onSave(draft));
  const back = () => (step > 0 ? setStep(step - 1) : null);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-bg-alt animate-in fade-in duration-200">
      {/* Header */}
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-surface px-5 md:h-16 md:px-7">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-accent/15 text-accent">
          <Sparkles className="h-4 w-4" />
        </div>
        <h1 className="min-w-0 flex-1 truncate font-display text-[16px] font-semibold tracking-[-0.01em] text-foreground md:text-[18px]">
          Новый агент
        </h1>
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="grid h-9 w-9 place-items-center rounded-full text-ink-muted transition-colors hover:bg-surface-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      {/* Body */}
      <div className="grid min-h-0 flex-1 lg:grid-cols-[1fr_420px]">
        {/* Left: steps */}
        <div className="flex min-h-0 flex-col overflow-y-auto px-5 py-6 md:px-10 md:py-8">
          <Stepper step={step} />

          <div key={step} className="mt-7 animate-in fade-in slide-in-from-bottom-1 duration-200">
            {step === 0 && (
              <StepTemplate
                templateId={templateId}
                onPick={pickTemplate}
              />
            )}
            {step === 1 && (
              <StepParams
                name={name}
                setName={setName}
                tone={tone}
                setTone={setTone}
                greeting={greeting}
                setGreeting={setGreeting}
                autonomy={autonomy}
                setAutonomy={setAutonomy}
                handoff={handoff}
                setHandoff={setHandoff}
              />
            )}
            {step === 2 && (
              <StepFields fields={fields} onToggle={toggleField} />
            )}
            {step === 3 && <StepSummary draft={draft} />}
          </div>

          <div className="mt-auto flex items-center justify-between gap-3 pt-8">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-surface px-5 text-[13px] font-semibold text-foreground transition-[transform,opacity] hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            >
              <ArrowLeft className="h-4 w-4" /> Назад
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!canNext}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-[13.5px] font-semibold text-accent-foreground shadow-xs transition-[transform,opacity] hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {step === 3 ? "Сохранить агента" : "Далее"} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right: live preview */}
        <div className="hidden border-l border-border bg-surface lg:block">
          <div className="sticky top-0 px-7 py-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
              Превью
            </p>
            <AgentPreviewCard draft={draft} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stepper({ step }: { step: number }) {
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

function SectionTitle({ step, title, hint }: { step: number; title: string; hint?: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-subtle">
        Шаг {step} из 4
      </p>
      <h2 className="mt-1.5 font-display text-[24px] font-semibold tracking-[-0.02em] text-foreground md:text-[28px]">
        {title}
      </h2>
      {hint && <p className="mt-1.5 text-[13.5px] text-ink-muted">{hint}</p>}
    </div>
  );
}

function StepTemplate({
  templateId,
  onPick,
}: {
  templateId: string | null;
  onPick: (t: Template) => void;
}) {
  return (
    <div className="space-y-5">
      <SectionTitle step={1} title="Выберите шаблон" hint="Шаблон предзаполнит тон и приветствие — потом можно поменять." />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {TEMPLATES.map((t) => {
          const active = templateId === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onPick(t)}
              className={`relative flex flex-col items-start gap-3 rounded-[16px] border p-5 text-left transition-[transform,border-color,background-color] hover:-translate-y-px ${
                active
                  ? "border-accent bg-accent/8"
                  : "border-border bg-surface hover:border-foreground/30"
              }`}
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-surface-muted text-[18px]">
                {t.emoji}
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-foreground">{t.niche}</h3>
                <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-ink-muted">
                  {t.greeting}
                </p>
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
    </div>
  );
}

function StepParams({
  name,
  setName,
  tone,
  setTone,
  greeting,
  setGreeting,
  autonomy,
  setAutonomy,
  handoff,
  setHandoff,
}: {
  name: string;
  setName: (v: string) => void;
  tone: ToneId;
  setTone: (v: ToneId) => void;
  greeting: string;
  setGreeting: (v: string) => void;
  autonomy: number;
  setAutonomy: (v: number) => void;
  handoff: boolean;
  setHandoff: (v: boolean) => void;
}) {
  return (
    <div className="space-y-6">
      <SectionTitle step={2} title="Параметры агента" />
      <Field label="Имя агента">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Например, Менеджер автосервиса"
          className="h-11 w-full rounded-xl border border-border bg-surface px-3.5 text-[14px] text-foreground outline-none transition-colors placeholder:text-ink-subtle focus:border-foreground/40"
        />
      </Field>
      <Field label="Тон общения">
        <div className="grid gap-2 sm:grid-cols-3">
          {TONES.map((t) => {
            const active = tone === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTone(t.id)}
                className={`h-11 rounded-xl border text-[13.5px] font-medium transition-colors ${
                  active
                    ? "border-accent bg-accent/10 text-foreground"
                    : "border-border bg-surface text-foreground hover:border-foreground/40"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </Field>
      <Field label="Приветственное сообщение">
        <textarea
          rows={3}
          value={greeting}
          onChange={(e) => setGreeting(e.target.value)}
          placeholder="Что агент скажет в первом сообщении"
          className="w-full rounded-xl border border-border bg-surface px-3.5 py-3 text-[14px] text-foreground outline-none transition-colors placeholder:text-ink-subtle focus:border-foreground/40"
        />
      </Field>
      <Field
        label="Уровень автономности"
        right={
          <span className="text-[12px] font-medium text-foreground">
            {AUTONOMY_LABELS[autonomy]}
          </span>
        }
      >
        <input
          type="range"
          min={0}
          max={2}
          step={1}
          value={autonomy}
          onChange={(e) => setAutonomy(Number(e.target.value))}
          className="w-full accent-[var(--accent)]"
        />
        <div className="mt-1.5 flex justify-between text-[11px] text-ink-subtle">
          {AUTONOMY_LABELS.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </Field>
      <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface p-4">
        <div>
          <p className="text-[14px] font-semibold text-foreground">
            Передавать горячие лиды менеджеру
          </p>
          <p className="mt-0.5 text-[12.5px] text-ink-muted">
            Уведомление в Telegram и пометка «Горячий» в карточке.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setHandoff(!handoff)}
          role="switch"
          aria-checked={handoff}
          className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
            handoff ? "bg-accent" : "bg-border"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-surface shadow transition-transform ${
              handoff ? "translate-x-[22px]" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

function StepFields({
  fields,
  onToggle,
}: {
  fields: string[];
  onToggle: (f: string) => void;
}) {
  return (
    <div className="space-y-5">
      <SectionTitle step={3} title="Поля заявки" hint="Что агент будет собирать в карточке лида." />
      <div className="flex flex-wrap gap-2">
        {ALL_FIELDS.map((f) => {
          const active = fields.includes(f);
          return (
            <button
              key={f}
              type="button"
              onClick={() => onToggle(f)}
              className={`inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-[13px] font-medium transition-[transform,background-color,border-color,color] hover:-translate-y-px ${
                active
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-surface text-foreground hover:border-foreground/40"
              }`}
            >
              {active ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <Plus className="h-3.5 w-3.5" />}
              {f}
            </button>
          );
        })}
      </div>
      <p className="text-[12.5px] text-ink-muted">
        Выбрано: {fields.length}. Можно убрать — кликните по чипу ещё раз.
      </p>
    </div>
  );
}

function StepSummary({ draft }: { draft: AgentDraft }) {
  return (
    <div className="space-y-5">
      <SectionTitle step={4} title="Всё готово" hint="Проверьте и сохраните — агента можно дообучить потом." />
      <div className="rounded-[18px] border border-border bg-surface p-5">
        <Row label="Имя" value={draft.name} />
        <Row label="Ниша" value={draft.niche} />
        <Row label="Тон" value={TONES.find((t) => t.id === draft.tone)?.label ?? "—"} />
        <Row label="Автономность" value={AUTONOMY_LABELS[draft.autonomy]} />
        <Row label="Передача лидов" value={draft.handoff ? "Включена" : "Выключена"} />
        <Row label="Поля заявки" value={draft.fields.join(", ") || "—"} />
        <Row label="Приветствие" value={draft.greeting || "—"} multiline />
      </div>
    </div>
  );
}

function Row({
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
      <div className="w-36 shrink-0 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-subtle">
        {label}
      </div>
      <div className={`flex-1 text-[14px] text-foreground ${multiline ? "whitespace-pre-wrap" : ""}`}>
        {value}
      </div>
    </div>
  );
}

function Field({
  label,
  right,
  children,
}: {
  label: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="block text-xs font-medium text-ink-muted">{label}</label>
        {right}
      </div>
      {children}
    </div>
  );
}

/* ---------- Live preview ---------- */

function AgentPreviewCard({ draft }: { draft: AgentDraft }) {
  const toneLabel = TONES.find((t) => t.id === draft.tone)?.label ?? "—";
  return (
    <div className="mt-4 rounded-[20px] border border-border bg-bg-alt p-5 shadow-[var(--shadow-md),var(--shadow-rim)]">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
          <Bot className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[15.5px] font-semibold text-foreground">
            {draft.name}
          </h3>
          <p className="mt-0.5 text-[12.5px] text-ink-muted">
            {draft.niche} · {toneLabel}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-2.5 py-1 text-[11px] font-semibold text-ink-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-ink-subtle" />
          Черновик
        </span>
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-surface p-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-subtle">
          Первое сообщение
        </p>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-foreground">
          {draft.greeting || "—"}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-subtle">
          Собирает в карточку
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {draft.fields.length === 0 ? (
            <span className="text-[12.5px] text-ink-subtle">Не выбрано</span>
          ) : (
            draft.fields.map((f) => (
              <span
                key={f}
                className="rounded-full border border-border bg-surface px-2.5 py-1 text-[11.5px] font-medium text-foreground"
              >
                {f}
              </span>
            ))
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <PreviewMetric label="Автономность" value={AUTONOMY_LABELS[draft.autonomy]} />
        <PreviewMetric label="Передача" value={draft.handoff ? "Вкл" : "Выкл"} />
      </div>
    </div>
  );
}

function PreviewMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ink-subtle">
        {label}
      </p>
      <p className="mt-0.5 text-[13px] font-semibold text-foreground">{value}</p>
    </div>
  );
}
