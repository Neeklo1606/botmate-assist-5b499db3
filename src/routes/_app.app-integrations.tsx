/**
 * /app/app-integrations — third-party integrations grid.
 *
 * All actions are mocked. // TODO: replace with real API
 */
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/app-integrations")({
  head: () => ({
    meta: [{ title: "Интеграции — botme" }],
  }),
  component: IntegrationsPage,
});

type Method = "apikey" | "oauth";

interface Integration {
  id: string;
  name: string;
  description: string;
  logo: string;
  logoBg: string;
  method: Method;
  comingSoon?: boolean;
}

const INTEGRATIONS: Integration[] = [
  { id: "openai",   name: "OpenAI",   description: "Подключить API ключ для генерации ответов", logo: "AI", logoBg: "#10a37f", method: "apikey" },
  { id: "amocrm",   name: "amoCRM",   description: "Синхронизация лидов в воронку продаж",     logo: "amo", logoBg: "#0096ff", method: "oauth" },
  { id: "bitrix24", name: "Bitrix24", description: "CRM интеграция: лиды, сделки, контакты",   logo: "B24", logoBg: "#1ba9e3", method: "oauth" },
  { id: "telegram", name: "Telegram", description: "Уведомления операторам о новых лидах",     logo: "TG",  logoBg: "#229ed9", method: "apikey" },
  { id: "whatsapp", name: "WhatsApp", description: "Coming soon — отвечайте клиентам в WhatsApp", logo: "WA", logoBg: "#25d366", method: "oauth", comingSoon: true },
  { id: "zapier",   name: "Zapier",   description: "Coming soon — автоматизация с 5000+ сервисов", logo: "Zp", logoBg: "#ff4f00", method: "oauth", comingSoon: true },
];

function IntegrationsPage() {
  const [connected, setConnected] = useState<Set<string>>(new Set(["telegram"]));
  const [active, setActive] = useState<Integration | null>(null);

  return (
    <div className="min-h-full bg-bg-elevated text-foreground">
      <div className="px-6 py-5 border-b border-border">
        <h1 className="text-2xl font-semibold">Интеграции</h1>
        <p className="text-sm text-foreground/50 mt-1">Подключите сервисы и расширьте возможности ассистента</p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {INTEGRATIONS.map((it) => {
          const isConnected = connected.has(it.id);
          return (
            <div
              key={it.id}
              className={cn(
                "rounded-lg border p-5 flex items-start gap-4 transition-colors",
                it.comingSoon
                  ? "border-border bg-bg-soft/50 opacity-60"
                  : "border-border bg-bg-elevated hover:border-border-strong"
              )}
            >
              <div
                className="h-12 w-12 rounded-lg flex items-center justify-center text-foreground text-xs font-bold shrink-0"
                style={{ background: it.logoBg }}
              >
                {it.logo}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base font-medium">{it.name}</span>
                  {it.comingSoon && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-bg-soft text-foreground/60 border border-border-strong">
                      Coming soon
                    </span>
                  )}
                  {isConnected && !it.comingSoon && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30 inline-flex items-center gap-1">
                      <Check className="h-2.5 w-2.5" /> Подключён
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground/60 mt-1">{it.description}</p>

                <div className="mt-3 flex gap-2">
                  {it.comingSoon ? (
                    <Button
                      size="sm" variant="outline" disabled
                      className="border-border bg-transparent text-foreground/40"
                    >
                      Скоро
                    </Button>
                  ) : isConnected ? (
                    <>
                      <Button
                        size="sm" variant="outline"
                        onClick={() => setActive(it)}
                        className="border-border bg-transparent text-foreground hover:bg-bg-soft"
                      >
                        Настроить
                      </Button>
                      <Button
                        size="sm" variant="ghost"
                        onClick={() => {
                          setConnected((s) => { const n = new Set(s); n.delete(it.id); return n; });
                          toast("Отключено");
                        }}
                        className="text-foreground/60 hover:bg-bg-soft hover:text-destructive"
                      >
                        Отключить
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => setActive(it)}
                      className="bg-accent text-background hover:bg-accent-hover"
                    >
                      Подключить
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {active && (
        <ConnectModal
          integration={active}
          isConnected={connected.has(active.id)}
          onClose={() => setActive(null)}
          onConnect={() => {
            setConnected((s) => new Set(s).add(active.id));
            toast.success(`${active.name} подключён`);
            setActive(null);
          }}
        />
      )}
    </div>
  );
}

function ConnectModal({
  integration, isConnected, onClose, onConnect,
}: {
  integration: Integration;
  isConnected: boolean;
  onClose: () => void;
  onConnect: () => void;
}) {
  const [apiKey, setApiKey] = useState("");

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="bg-bg-base border-border text-foreground max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span
              className="h-8 w-8 rounded flex items-center justify-center text-foreground text-[10px] font-bold"
              style={{ background: integration.logoBg }}
            >{integration.logo}</span>
            {isConnected ? "Настроить" : "Подключить"} {integration.name}
          </DialogTitle>
        </DialogHeader>

        {integration.method === "apikey" ? (
          <div className="space-y-3 py-2">
            <div className="text-sm text-foreground/70">
              Вставьте API ключ из личного кабинета {integration.name}.
            </div>
            <Input
              type="password"
              placeholder={integration.id === "openai" ? "sk-..." : "API key"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-bg-elevated border-border text-foreground placeholder:text-foreground/40 font-mono"
            />
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
            >
              Где взять ключ? <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        ) : (
          <div className="space-y-3 py-2">
            <div className="rounded-md border border-border bg-bg-elevated p-4 text-sm text-foreground/80 space-y-2">
              <div className="flex items-center gap-2 text-accent">
                <Sparkles className="h-4 w-4" /> OAuth подключение
              </div>
              <ol className="list-decimal list-inside space-y-1 text-foreground/70 text-xs">
                <li>Нажмите «Подключить через OAuth»</li>
                <li>Авторизуйтесь в {integration.name}</li>
                <li>Разрешите доступ Botmate к вашим данным</li>
              </ol>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose} className="text-foreground/70 hover:bg-bg-soft">Отмена</Button>
          <Button
            onClick={onConnect}
            disabled={integration.method === "apikey" && !apiKey.trim()}
            className="bg-accent text-background hover:bg-accent-hover disabled:opacity-40"
          >
            {integration.method === "apikey" ? "Сохранить ключ" : "Подключить через OAuth"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
