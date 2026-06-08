/**
 * /app/settings — tabbed settings page (Профиль / Тариф / Команда / Виджет).
 *
 * All actions are mocked. // TODO: replace with real API
 */
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import {
  Camera, Check, Trash2, Plus, X, Copy, MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [{ title: "Настройки — botme" }],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="min-h-full bg-bg-elevated text-foreground">
      <div className="px-6 py-5 border-b border-border">
        <h1 className="text-2xl font-semibold">Настройки</h1>
      </div>

      <Tabs defaultValue="profile" className="px-6 py-6">
        <TabsList className="bg-bg-elevated border border-border mb-6">
          <TabsTrigger value="profile"  className="data-[state=active]:bg-bg-soft data-[state=active]:text-foreground">Профиль</TabsTrigger>
          <TabsTrigger value="billing"  className="data-[state=active]:bg-bg-soft data-[state=active]:text-foreground">Тариф</TabsTrigger>
          <TabsTrigger value="team"     className="data-[state=active]:bg-bg-soft data-[state=active]:text-foreground">Команда</TabsTrigger>
          <TabsTrigger value="widget"   className="data-[state=active]:bg-bg-soft data-[state=active]:text-foreground">Виджет</TabsTrigger>
        </TabsList>

        <TabsContent value="profile"><ProfileTab /></TabsContent>
        <TabsContent value="billing"><BillingTab /></TabsContent>
        <TabsContent value="team"><TeamTab /></TabsContent>
        <TabsContent value="widget"><WidgetTab /></TabsContent>
      </Tabs>
    </div>
  );
}

// ===== Profile ==============================================================

function ProfileTab() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName]   = useState("Иван Петров");
  const [email, setEmail] = useState("ivan@example.com");
  const [phone, setPhone] = useState("+7 (916) 000-00-00");
  const [pwd, setPwd]     = useState({ cur: "", n1: "", n2: "" });
  const [lang, setLang]   = useState("ru");
  const [tz, setTz]       = useState("Europe/Moscow");
  const fileRef = useRef<HTMLInputElement>(null);

  const onPickAvatar = (f: File | null) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result as string);
    reader.readAsDataURL(f);
  };

  return (
    <Card>
      <div className="flex items-center gap-5 mb-6">
        <button
          onClick={() => fileRef.current?.click()}
          className="relative h-20 w-20 rounded-full bg-bg-elevated border border-border overflow-hidden flex items-center justify-center text-foreground/40 hover:text-foreground"
        >
          {avatar ? (
            <img src={avatar} alt="avatar" className="h-full w-full object-cover" />
          ) : (
            <span className="text-2xl font-semibold text-background bg-accent h-full w-full flex items-center justify-center">
              {name.slice(0, 1)}
            </span>
          )}
          <span className="absolute inset-0 bg-foreground/40 opacity-0 hover:opacity-100 flex items-center justify-center transition">
            <Camera className="h-5 w-5 text-foreground" />
          </span>
        </button>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => onPickAvatar(e.target.files?.[0] ?? null)} />
        <div>
          <div className="text-base font-medium">Фото профиля</div>
          <div className="text-xs text-foreground/50">JPG или PNG, до 5 MB</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Field label="Имя"><DarkInput value={name} onChange={(e) => setName(e.target.value)} /></Field>
        <Field label="Email"><DarkInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
        <Field label="Телефон"><DarkInput value={phone} onChange={(e) => setPhone(e.target.value)} /></Field>
      </div>

      <SectionTitle>Сменить пароль</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Field label="Текущий пароль"><DarkInput type="password" value={pwd.cur} onChange={(e) => setPwd({ ...pwd, cur: e.target.value })} /></Field>
        <Field label="Новый пароль"><DarkInput type="password" value={pwd.n1} onChange={(e) => setPwd({ ...pwd, n1: e.target.value })} /></Field>
        <Field label="Повторите"><DarkInput type="password" value={pwd.n2} onChange={(e) => setPwd({ ...pwd, n2: e.target.value })} /></Field>
      </div>

      <SectionTitle>Локализация</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Field label="Язык интерфейса">
          <DarkSelect value={lang} onValueChange={setLang} options={[
            { value: "ru", label: "🇷🇺 Русский" },
            { value: "en", label: "🇬🇧 English" },
          ]} />
        </Field>
        <Field label="Часовой пояс">
          <DarkSelect value={tz} onValueChange={setTz} options={[
            { value: "Europe/Moscow", label: "(GMT+3) Москва" },
            { value: "Europe/Kaliningrad", label: "(GMT+2) Калининград" },
            { value: "Asia/Yekaterinburg", label: "(GMT+5) Екатеринбург" },
            { value: "Asia/Novosibirsk", label: "(GMT+7) Новосибирск" },
            { value: "Asia/Vladivostok", label: "(GMT+10) Владивосток" },
            { value: "Europe/London", label: "(GMT+0) London" },
            { value: "America/New_York", label: "(GMT-5) New York" },
          ]} />
        </Field>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => toast.success("Профиль сохранён")} className="bg-accent text-background hover:bg-accent-hover">
          Сохранить
        </Button>
      </div>
    </Card>
  );
}

// ===== Billing ==============================================================

const PLANS = [
  { id: "free",     name: "Free",     price: "0",     dialogs: "100",   video: "0",    tracking: false, crm: false, api: false },
  { id: "start",    name: "Start",    price: "990",   dialogs: "500",   video: "60",   tracking: true,  crm: false, api: false },
  { id: "business", name: "Business", price: "2 490", dialogs: "2 000", video: "600",  tracking: true,  crm: true,  api: false },
  { id: "pro",      name: "Pro",      price: "6 990", dialogs: "10 000", video: "3 000", tracking: true, crm: true,  api: true },
] as const;

function BillingTab() {
  const current = "business";
  const usage = [
    { label: "Диалоги",      value: 847, max: 2000, unit: "" },
    { label: "Видео минуты", value: 234, max: 600,  unit: " мин" },
    { label: "Хранилище",    value: 1.2, max: 5,    unit: " ГБ" },
  ];

  return (
    <div className="space-y-6">
      {/* Current plan */}
      <Card>
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-xs uppercase tracking-wider text-foreground/40">Текущий тариф</div>
            <div className="text-2xl font-semibold mt-1">
              Business · <span className="text-accent">2 490 ₽</span>
              <span className="text-base text-foreground/50">/мес</span>
            </div>
          </div>
          <Button onClick={() => toast.success("Откроется страница оплаты (mock)")} className="bg-accent text-background hover:bg-accent-hover">
            Повысить тариф
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {usage.map((u) => {
            const pct = Math.min(100, (u.value / u.max) * 100);
            const danger = pct > 80;
            return (
              <div key={u.label} className="rounded-md border border-border bg-bg-elevated p-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-foreground/70">{u.label}</span>
                  <span className="text-foreground">{u.value}{u.unit} / {u.max}{u.unit}</span>
                </div>
                <div className="h-2 rounded bg-bg-soft overflow-hidden">
                  <div
                    className={cn("h-full transition-all", danger ? "bg-warning" : "bg-accent")}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Plan comparison */}
      <Card>
        <SectionTitle>Сравнение тарифов</SectionTitle>
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm">
            <thead className="text-foreground/50">
              <tr>
                <th className="text-left p-3 font-medium">Тариф</th>
                <th className="text-left p-3 font-medium">Диалоги</th>
                <th className="text-left p-3 font-medium">Видео мин</th>
                <th className="text-left p-3 font-medium">Трекинг</th>
                <th className="text-left p-3 font-medium">CRM</th>
                <th className="text-left p-3 font-medium">API</th>
                <th className="text-left p-3 font-medium">Цена</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {PLANS.map((p) => {
                const isCurrent = p.id === current;
                return (
                  <tr key={p.id} className={cn(
                    "border-t border-border",
                    isCurrent && "bg-accent/5"
                  )}>
                    <td className="p-3 font-medium">
                      {p.name}
                      {isCurrent && (
                        <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30">
                          текущий
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-foreground/80">{p.dialogs}</td>
                    <td className="p-3 text-foreground/80">{p.video || "—"}</td>
                    <td className="p-3">{p.tracking ? <Check className="h-4 w-4 text-accent" /> : <X className="h-4 w-4 text-foreground/30" />}</td>
                    <td className="p-3">{p.crm ? <Check className="h-4 w-4 text-accent" /> : <X className="h-4 w-4 text-foreground/30" />}</td>
                    <td className="p-3">{p.api ? <Check className="h-4 w-4 text-accent" /> : <X className="h-4 w-4 text-foreground/30" />}</td>
                    <td className="p-3 text-foreground">{p.price} ₽</td>
                    <td className="p-3 text-right">
                      {!isCurrent && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toast.success(`Переход на ${p.name} (mock)`)}
                          className="border-border bg-transparent text-foreground hover:bg-bg-soft"
                        >
                          Выбрать
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ===== Team =================================================================

interface Member { id: string; name: string; email: string; role: "owner" | "admin" | "operator"; avatar: string; }

const ROLE_META: Record<Member["role"], { label: string; color: string; bg: string }> = {
  owner:    { label: "Владелец", color: "#a8ff57", bg: "#a8ff5710" },
  admin:    { label: "Админ",    color: "#57c7ff", bg: "#57c7ff10" },
  operator: { label: "Оператор", color: "#facc15", bg: "#facc1510" },
};

const INITIAL_TEAM: Member[] = [
  { id: "u1", name: "Иван Петров",  email: "ivan@example.com",  role: "owner",    avatar: "И" },
  { id: "u2", name: "Мария Кузьмина", email: "maria@example.com", role: "admin",    avatar: "М" },
  { id: "u3", name: "Анна Соколова", email: "anna@example.com",  role: "operator", avatar: "А" },
];

function TeamTab() {
  const [members, setMembers] = useState<Member[]>(INITIAL_TEAM);
  const [open, setOpen] = useState(false);
  const [invite, setInvite] = useState<{ email: string; role: Member["role"] }>({ email: "", role: "operator" });

  const sendInvite = () => {
    if (!invite.email.trim()) return;
    setMembers((m) => [...m, {
      id: `u${Date.now()}`,
      name: invite.email.split("@")[0],
      email: invite.email,
      role: invite.role,
      avatar: invite.email.slice(0, 1).toUpperCase(),
    }]);
    setInvite({ email: "", role: "operator" });
    setOpen(false);
    toast.success("Приглашение отправлено");
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-5">
        <SectionTitle className="mb-0">Участники</SectionTitle>
        <Button onClick={() => setOpen(true)} className="bg-accent text-background hover:bg-accent-hover">
          <Plus className="h-4 w-4 mr-1.5" /> Пригласить участника
        </Button>
      </div>

      <div className="space-y-2">
        {members.map((m) => (
          <div key={m.id} className="flex items-center gap-3 rounded-md border border-border bg-bg-elevated p-3">
            <div className="h-10 w-10 rounded-full bg-accent text-background font-semibold flex items-center justify-center">
              {m.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{m.name}</div>
              <div className="text-xs text-foreground/50 truncate">{m.email}</div>
            </div>
            <span
              className="text-xs px-2 py-0.5 rounded-full border"
              style={{ background: ROLE_META[m.role].bg, color: ROLE_META[m.role].color, borderColor: ROLE_META[m.role].color + "40" }}
            >
              {ROLE_META[m.role].label}
            </span>
            {m.role !== "owner" && (
              <button
                onClick={() => { setMembers((arr) => arr.filter((x) => x.id !== m.id)); toast("Участник удалён"); }}
                className="p-2 rounded hover:bg-destructive/10 text-foreground/60 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-bg-base border-border text-foreground">
          <DialogHeader><DialogTitle>Пригласить участника</DialogTitle></DialogHeader>
          <div className="space-y-3 py-2">
            <Field label="Email">
              <DarkInput
                type="email"
                value={invite.email}
                onChange={(e) => setInvite({ ...invite, email: e.target.value })}
                placeholder="user@example.com"
              />
            </Field>
            <Field label="Роль">
              <DarkSelect
                value={invite.role}
                onValueChange={(v) => setInvite({ ...invite, role: v as Member["role"] })}
                options={[
                  { value: "admin",    label: "Админ" },
                  { value: "operator", label: "Оператор" },
                ]}
              />
            </Field>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)} className="text-foreground/70 hover:bg-bg-soft">Отмена</Button>
            <Button onClick={sendInvite} className="bg-accent text-background hover:bg-accent-hover">Отправить</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

// ===== Widget ===============================================================

const POSITIONS = [
  { id: "br", label: "Bottom Right",  cls: "bottom-3 right-3" },
  { id: "bl", label: "Bottom Left",   cls: "bottom-3 left-3" },
  { id: "bc", label: "Bottom Center", cls: "bottom-3 left-1/2 -translate-x-1/2" },
] as const;

function WidgetTab() {
  const [color, setColor] = useState("#a8ff57");
  const [position, setPosition] = useState<typeof POSITIONS[number]["id"]>("br");
  const [title, setTitle] = useState("Botmate");
  const [greeting, setGreeting] = useState("Здравствуйте! Чем могу помочь?");
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const snippet = useMemo(() => `<script src="https://cdn.botmate.ai/widget.js"
  data-key="bm_pub_xxxxxxxxxxxxx"
  data-color="${color}"
  data-position="${position}"
  data-title="${title}">
</script>`, [color, position, title]);

  const pos = POSITIONS.find((p) => p.id === position)!;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <SectionTitle>Внешний вид</SectionTitle>

        <Field label="Основной цвет">
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-10 w-14 rounded border border-border bg-transparent cursor-pointer"
            />
            <DarkInput value={color} onChange={(e) => setColor(e.target.value)} className="flex-1" />
          </div>
        </Field>

        <Field label="Положение на странице">
          <div className="grid grid-cols-3 gap-2">
            {POSITIONS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPosition(p.id)}
                className={cn(
                  "rounded-md border px-3 py-2 text-xs",
                  position === p.id
                    ? "border-accent bg-accent/10 text-foreground"
                    : "border-border bg-bg-elevated text-foreground/70 hover:border-border-strong"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Заголовок виджета"><DarkInput value={title} onChange={(e) => setTitle(e.target.value)} /></Field>
        <Field label="Приветствие">
          <Textarea
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
            rows={2}
            className="bg-bg-elevated border-border text-foreground placeholder:text-foreground/40 resize-none"
          />
        </Field>

        <Field label="Аватар бота">
          <div className="flex items-center gap-3">
            <button
              onClick={() => fileRef.current?.click()}
              className="h-12 w-12 rounded-full bg-bg-elevated border border-border overflow-hidden flex items-center justify-center"
            >
              {avatar
                ? <img src={avatar} alt="" className="h-full w-full object-cover" />
                : <Camera className="h-4 w-4 text-foreground/40" />}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                const r = new FileReader();
                r.onload = () => setAvatar(r.result as string);
                r.readAsDataURL(f);
              }}
            />
            <Button
              variant="outline"
              onClick={() => fileRef.current?.click()}
              className="border-border bg-transparent text-foreground hover:bg-bg-soft"
            >
              Загрузить
            </Button>
          </div>
        </Field>

        <SectionTitle className="mt-6">Код установки</SectionTitle>
        <div className="relative rounded-md border border-border bg-bg-base p-3">
          <pre className="text-xs text-accent font-mono overflow-x-auto whitespace-pre">{snippet}</pre>
          <button
            onClick={() => { navigator.clipboard.writeText(snippet); toast.success("Скопировано"); }}
            className="absolute top-2 right-2 p-1.5 rounded hover:bg-bg-soft text-foreground/60"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex justify-end mt-5">
          <Button onClick={() => toast.success("Виджет сохранён")} className="bg-accent text-background hover:bg-accent-hover">
            Сохранить
          </Button>
        </div>
      </Card>

      {/* Live preview */}
      <Card>
        <SectionTitle>Превью</SectionTitle>
        <div className="relative rounded-lg border border-border bg-gradient-to-br from-surface to-background h-[460px] overflow-hidden">
          {/* Mock browser chrome */}
          <div className="h-7 border-b border-border bg-bg-base flex items-center gap-1.5 px-3">
            <span className="h-2 w-2 rounded-full bg-destructive" />
            <span className="h-2 w-2 rounded-full bg-warning" />
            <span className="h-2 w-2 rounded-full bg-success" />
            <div className="ml-3 flex-1 h-4 rounded bg-bg-elevated text-[10px] text-foreground/40 px-2 leading-4 truncate">
              https://example.com
            </div>
          </div>

          {/* Mock page content */}
          <div className="p-6 space-y-3">
            <div className="h-6 w-1/3 rounded bg-bg-soft" />
            <div className="h-3 w-3/4 rounded bg-bg-soft" />
            <div className="h-3 w-2/3 rounded bg-bg-soft" />
            <div className="h-3 w-1/2 rounded bg-bg-soft" />
            <div className="grid grid-cols-3 gap-3 pt-4">
              {[1,2,3].map((i) => <div key={i} className="h-20 rounded bg-bg-elevated" />)}
            </div>
          </div>

          {/* Widget bubble */}
          <div className={cn("absolute", pos.cls)}>
            <button
              className="h-14 w-14 rounded-full shadow-lg flex items-center justify-center"
              style={{ background: color }}
            >
              {avatar
                ? <img src={avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                : <MessageCircle className="h-6 w-6 text-background" />}
            </button>
          </div>
        </div>
        <div className="mt-3 text-xs text-foreground/40">
          Виджет «{title}» появится в позиции {pos.label} с приветствием: «{greeting}»
        </div>
      </Card>
    </div>
  );
}

// ===== UI helpers ===========================================================

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border border-border bg-bg-elevated p-5">{children}</div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div className="text-xs uppercase tracking-wider text-foreground/40 mb-1.5">{label}</div>
      {children}
    </div>
  );
}

function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("text-sm font-medium text-foreground/80 mb-3", className)}>{children}</div>;
}

function DarkInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Input
      {...props}
      className={cn("bg-bg-elevated border-border text-foreground placeholder:text-foreground/40 h-10", props.className)}
    />
  );
}

function DarkSelect({
  value, onValueChange, options,
}: {
  value: string;
  onValueChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="bg-bg-elevated border-border text-foreground h-10">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-bg-elevated border-border text-foreground">
        {options.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}
