/**
 * LeadWidget — плавающий продуктовый виджет AI-менеджера заявок.
 * Десктоп: фиксированная кнопка снизу-справа, открывается в панель.
 * Мобайл: bottom sheet на всю ширину.
 * Внутри: пошаговая квалификация + захват контакта + подтверждение.
 */
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  MessageSquare,
  Send,
  Sparkles,
  X,
} from "lucide-react";

type Role = "ai" | "user";
type Msg = { id: string; role: Role; text: string };

type Step =
  | "welcome"
  | "biz"
  | "channels"
  | "crm"
  | "offer"
  | "capture"
  | "done";

const BIZ = ["Услуги", "Ремонт / стройка", "Онлайн-школа", "Магазин", "Другое"];
const CHN = ["Сайт", "Telegram", "Instagram / WhatsApp", "Avito", "Звонки"];
const CRM = ["amoCRM", "Bitrix24", "Google Sheets", "Не использую"];
const OFFER = [
  "Подключить AI-менеджера",
  "Показать интеграции",
  "Посмотреть тарифы",
  "Оставить заявку",
];
const QUICK = [
  "Оставить заявку",
  "Узнать как работает",
  "Подключить AI-менеджера",
  "Показать интеграции",
  "Посмотреть тарифы",
];

export function LeadWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("welcome");
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: "m0",
      role: "ai",
      text: "Здравствуйте. Я AI-менеджер Avreya. Покажу за минуту, как мы соберём и квалифицируем заявку для вашего бизнеса.",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [lead, setLead] = useState({
    biz: "",
    channel: "",
    crm: "",
    offer: "",
    name: "",
    contact: "",
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Авто-скролл вниз
  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing, step, open]);

  // Esc закрывает
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Блокируем скролл body на мобиле, когда открыт
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    if (window.matchMedia("(max-width: 767px)").matches) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  function pushAi(text: string, then?: () => void) {
    setTyping(true);
    const id = "a" + Math.random().toString(36).slice(2, 8);
    window.setTimeout(() => {
      setMsgs((m) => [...m, { id, role: "ai", text }]);
      setTyping(false);
      then?.();
    }, 520);
  }
  function pushUser(text: string) {
    const id = "u" + Math.random().toString(36).slice(2, 8);
    setMsgs((m) => [...m, { id, role: "user", text }]);
  }

  function start() {
    setStep("biz");
    pushAi("С чего начнём? Какой у вас бизнес?");
  }

  function pick(option: string) {
    pushUser(option);
    if (step === "welcome") {
      // быстрые действия
      if (option === "Оставить заявку") {
        setLead((l) => ({ ...l, offer: option }));
        setStep("capture");
        pushAi("Оставьте имя и контакт. Менеджер вернётся в течение 10 минут.");
        return;
      }
      setStep("biz");
      pushAi("Хорошо. Уточню пару деталей, чтобы показать сценарий под вас. Какой у вас бизнес?");
      return;
    }
    if (step === "biz") {
      setLead((l) => ({ ...l, biz: option }));
      setStep("channels");
      pushAi("Откуда сейчас приходят заявки чаще всего?");
      return;
    }
    if (step === "channels") {
      setLead((l) => ({ ...l, channel: option }));
      setStep("crm");
      pushAi("Куда отправлять готовые заявки?");
      return;
    }
    if (step === "crm") {
      setLead((l) => ({ ...l, crm: option }));
      setStep("offer");
      pushAi(
        `Понял. Соберём AI-менеджера под «${lead.biz || option}», подключим ${option} и канал ${lead.channel}. Что дальше?`,
      );
      return;
    }
    if (step === "offer") {
      setLead((l) => ({ ...l, offer: option }));
      setStep("capture");
      pushAi("Оставьте имя и контакт — пришлём демо и расчёт под ваш сценарий.");
      return;
    }
  }

  function submitContact(e: React.FormEvent) {
    e.preventDefault();
    if (!lead.name.trim() || !lead.contact.trim()) return;
    pushUser(`${lead.name} · ${lead.contact}`);
    setStep("done");
    pushAi("Готово. Заявка передана команде Avreya и продублирована в Telegram.");
  }

  function reset() {
    setMsgs([
      {
        id: "m0",
        role: "ai",
        text: "Начнём заново. Какой у вас бизнес?",
      },
    ]);
    setLead({ biz: "", channel: "", crm: "", offer: "", name: "", contact: "" });
    setStep("biz");
  }

  const optionsForStep =
    step === "welcome"
      ? QUICK
      : step === "biz"
        ? BIZ
        : step === "channels"
          ? CHN
          : step === "crm"
            ? CRM
            : step === "offer"
              ? OFFER
              : [];

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Закрыть AI-менеджера" : "Открыть AI-менеджера"}
        aria-expanded={open}
        className="group fixed bottom-[88px] right-4 z-[55] inline-flex h-14 items-center gap-2.5 rounded-full border border-foreground/15 bg-foreground pl-2 pr-5 text-background shadow-lift transition-[transform,box-shadow] duration-300 ease-quart hover:-translate-y-0.5 active:translate-y-0 md:bottom-6 md:right-6"
      >
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-background/10 ring-1 ring-background/15">
          {open ? (
            <X className="h-4 w-4" strokeWidth={2} />
          ) : (
            <Bot className="h-4 w-4" strokeWidth={2} />
          )}
          {!open && (
            <>
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-foreground" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 animate-ping rounded-full bg-accent opacity-50" />
            </>
          )}
        </span>
        <span className="flex flex-col items-start leading-tight">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-background/60">
            {open ? "" : "Avreya"}
          </span>
          <span className="text-[13px] font-semibold">
            {open ? "Свернуть" : "AI-менеджер"}
          </span>
        </span>
      </button>

      {/* Backdrop (mobile) */}
      {open && (
        <button
          aria-hidden
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[50] bg-foreground/30 backdrop-blur-[2px] md:hidden"
        />
      )}

      {/* Panel */}
      <div
        role="dialog"
        aria-label="AI-менеджер Avreya"
        aria-hidden={!open}
        className={
          "fixed z-[54] flex flex-col overflow-hidden border border-border bg-surface text-foreground shadow-lift transition-all duration-300 " +
          // mobile: bottom sheet
          "inset-x-0 bottom-0 max-h-[88vh] rounded-t-3xl " +
          // desktop: floating panel
          "md:inset-auto md:bottom-24 md:right-6 md:max-h-[640px] md:w-[400px] md:rounded-2xl " +
          (open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-6 opacity-0")
        }
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-border bg-surface-muted/60 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-foreground">
              <Bot className="h-4 w-4 text-background" strokeWidth={2} />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-surface" />
            </div>
            <div className="leading-tight">
              <div className="text-[13.5px] font-semibold text-foreground">
                AI-менеджер · Avreya
              </div>
              <div className="inline-flex items-center gap-1.5 text-[10.5px] font-medium uppercase tracking-[0.12em] text-ink-subtle">
                <span className="h-1 w-1 rounded-full bg-accent" />
                онлайн · ответ за 7 сек
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Закрыть"
            className="rounded-md p-1.5 text-ink-muted transition-colors hover:bg-surface-muted hover:text-foreground"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        {/* Stepper */}
        {step !== "welcome" && step !== "done" && (
          <div className="flex items-center gap-1.5 border-b border-border bg-surface px-4 py-2.5 text-[10.5px] uppercase tracking-[0.1em] text-ink-subtle">
            <StepDot active={["biz", "channels", "crm", "offer", "capture"].includes(step)} done={step !== "biz"}>
              бизнес
            </StepDot>
            <ChevronRight className="h-3 w-3 text-border-strong" strokeWidth={2} />
            <StepDot active={["channels", "crm", "offer", "capture"].includes(step)} done={["crm", "offer", "capture"].includes(step)}>
              каналы
            </StepDot>
            <ChevronRight className="h-3 w-3 text-border-strong" strokeWidth={2} />
            <StepDot active={["crm", "offer", "capture"].includes(step)} done={["offer", "capture"].includes(step)}>
              CRM
            </StepDot>
            <ChevronRight className="h-3 w-3 text-border-strong" strokeWidth={2} />
            <StepDot active={["offer", "capture"].includes(step)} done={step === "capture"}>
              контакт
            </StepDot>
          </div>
        )}

        {/* Conversation */}
        <div
          ref={scrollRef}
          className="flex-1 space-y-3 overflow-y-auto bg-background px-4 py-4"
        >
          {msgs.map((m) => (
            <Bubble key={m.id} role={m.role}>
              {m.text}
            </Bubble>
          ))}

          {typing && (
            <Bubble role="ai">
              <span className="inline-flex items-center gap-1">
                <Dot delay={0} />
                <Dot delay={120} />
                <Dot delay={240} />
              </span>
            </Bubble>
          )}

          {/* Welcome state — кнопка начала */}
          {step === "welcome" && !typing && (
            <div className="pt-1">
              <button
                type="button"
                onClick={start}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-1.5 text-[12.5px] font-medium text-background hover:opacity-90"
              >
                Начать <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            </div>
          )}

          {/* Done state */}
          {step === "done" && (
            <div className="rounded-2xl border border-border bg-surface p-4">
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-semibold text-accent">
                <Check className="h-3 w-3" strokeWidth={3} />
                Заявка отправлена
              </div>
              <div className="space-y-1.5 text-[12.5px]">
                <Row k="Имя" v={lead.name} />
                <Row k="Контакт" v={lead.contact} />
                {lead.biz && <Row k="Бизнес" v={lead.biz} />}
                {lead.channel && <Row k="Каналы" v={lead.channel} />}
                {lead.crm && <Row k="Назначение" v={lead.crm} />}
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-[11px] text-ink-muted">
                <span className="inline-flex items-center gap-1.5">
                  <MessageSquare className="h-3 w-3" strokeWidth={2} />
                  Telegram · CRM
                </span>
                <button
                  type="button"
                  onClick={reset}
                  className="font-medium text-foreground underline-offset-2 hover:underline"
                >
                  Новый сценарий
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer: options или форма */}
        <div className="border-t border-border bg-surface px-3 py-3">
          {optionsForStep.length > 0 && !typing && (
            <div className="flex flex-wrap gap-1.5">
              {optionsForStep.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => pick(opt)}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-[12px] font-medium text-foreground transition-colors hover:border-foreground"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {step === "capture" && (
            <form onSubmit={submitContact} className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <input
                  ref={inputRef}
                  required
                  value={lead.name}
                  onChange={(e) => setLead((l) => ({ ...l, name: e.target.value }))}
                  placeholder="Имя"
                  className="h-10 rounded-lg border border-border bg-background px-3 text-[13px] text-foreground placeholder:text-ink-subtle focus:border-foreground focus:outline-none"
                />
                <input
                  required
                  value={lead.contact}
                  onChange={(e) => setLead((l) => ({ ...l, contact: e.target.value }))}
                  placeholder="Телефон или Telegram"
                  className="h-10 rounded-lg border border-border bg-background px-3 text-[13px] text-foreground placeholder:text-ink-subtle focus:border-foreground focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-foreground text-[13px] font-semibold text-background hover:opacity-90"
              >
                Отправить заявку
                <Send className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
              <p className="text-[10.5px] text-ink-subtle">
                Отправляя, вы соглашаетесь с обработкой данных. Менеджер увидит её через секунду.
              </p>
            </form>
          )}

          {step === "done" && (
            <div className="flex items-center justify-between text-[11px] text-ink-subtle">
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" strokeWidth={2} />
                AI-менеджер Avreya
              </span>
              <span>оператор подключится при необходимости</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Bubble({ role, children }: { role: Role; children: React.ReactNode }) {
  const isAi = role === "ai";
  return (
    <div className={"flex " + (isAi ? "justify-start" : "justify-end")}>
      <div
        className={
          "max-w-[85%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug " +
          (isAi
            ? "rounded-tl-sm border border-border bg-surface text-foreground"
            : "rounded-tr-sm bg-foreground text-background")
        }
      >
        {children}
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-ink-muted"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}

function StepDot({
  active,
  done,
  children,
}: {
  active: boolean;
  done: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 " +
        (done
          ? "bg-foreground/5 text-foreground"
          : active
            ? "bg-foreground text-background"
            : "text-ink-subtle")
      }
    >
      {done ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : null}
      {children}
    </span>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-ink-subtle">{k}</span>
      <span className="font-medium text-foreground">{v}</span>
    </div>
  );
}
