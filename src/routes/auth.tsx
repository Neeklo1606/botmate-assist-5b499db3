/**
 * /auth — мок-страница входа в Avreya.
 * Любой клик ведёт на /onboarding.
 */
import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { NeekloLogo } from "@/components/brand/neeklo-logo";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  const go = () => navigate({ to: "/onboarding" });

  const handlePhone = (e: FormEvent) => {
    e.preventDefault();
    go();
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/70">
        <div className="container-px mx-auto flex h-14 max-w-[1200px] items-center justify-between">
          <Link to="/" aria-label="Avreya — на главную" className="transition-opacity hover:opacity-80">
            <NeekloLogo />
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-ink-muted transition-colors hover:text-foreground"
          >
            ← На главную
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-12">
        <div className="w-full max-w-[420px] rounded-[20px] border border-border bg-surface p-7 shadow-[var(--shadow-md),var(--shadow-rim)] md:p-8">
          <div className="flex justify-center">
            <NeekloLogo />
          </div>

          <h1 className="mt-6 text-center font-display text-[24px] font-semibold tracking-[-0.02em] text-foreground">
            Вход в Avreya
          </h1>
          <p className="mt-1.5 text-center text-[13.5px] text-ink-muted">
            Запуск AI-менеджера за 3 дня
          </p>

          <div className="mt-7 space-y-2.5">
            <button
              type="button"
              onClick={go}
              className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-accent text-[14px] font-semibold text-accent-foreground shadow-xs transition-[opacity,transform] hover:-translate-y-px"
            >
              <span className="grid h-5 w-5 place-items-center rounded-[6px] bg-accent-foreground/15 text-[10px] font-bold tracking-tight">
                M
              </span>
              Войти через MAX
            </button>

            <button
              type="button"
              onClick={go}
              className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full border border-border bg-surface text-[14px] font-semibold text-foreground transition-[opacity,transform,border-color] hover:-translate-y-px hover:border-foreground/40"
            >
              <Send className="h-4 w-4" />
              Войти через Telegram
            </button>
          </div>

          <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-ink-subtle">
            <div className="h-px flex-1 bg-border" />
            или
            <div className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handlePhone} className="space-y-2.5">
            <label htmlFor="phone" className="block text-xs font-medium text-ink-muted">
              Номер телефона
            </label>
            <div className="flex gap-2">
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 ___ ___ __ __"
                className="h-12 flex-1 rounded-full border border-border bg-background px-4 text-[14px] text-foreground outline-none transition-colors placeholder:text-ink-subtle focus:border-foreground/40"
              />
              <button
                type="submit"
                className="inline-flex h-12 shrink-0 items-center justify-center rounded-full border border-border bg-surface px-4 text-[13px] font-semibold text-foreground transition-[transform,border-color] hover:-translate-y-px hover:border-foreground/40"
              >
                Получить код
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-[11.5px] leading-relaxed text-ink-subtle">
            Нажимая, вы соглашаетесь с{" "}
            <Link to="/legal/privacy" className="underline-offset-2 hover:underline">
              политикой конфиденциальности
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
