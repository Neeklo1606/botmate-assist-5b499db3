/**
 * /login — вход по email/password (mock).
 * После успеха — редирект по ?redirect= или на /app.
 */
import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useLoginWithEmail } from "@/lib/hooks/use-auth";

interface LoginSearch {
  redirect?: string;
}

export const Route = createFileRoute("/_authshell/login")({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  component: LoginPage,
});

function LoginPage() {
  const { redirect } = useSearch({ from: "/_auth/login" });
  const navigate = useNavigate();
  const login = useLoginWithEmail();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Введите email и пароль");
      return;
    }
    // TODO: replace with real API — POST /api/auth/login
    login.mutate(
      { email, password },
      {
        onSuccess: (user) => {
          toast.success(`С возвращением, ${user.name.split(" ")[0]}`);
          if (redirect) navigate({ href: redirect });
          else navigate({ to: "/app" });
        },
        onError: () => toast.error("Неверный email или пароль"),
      },
    );
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-7 shadow-[var(--shadow-md),var(--shadow-rim)] md:p-8">
      <h1 className="text-center font-display text-[22px] font-semibold tracking-[-0.02em] text-foreground">
        Войти в Avreya
      </h1>
      <p className="mt-1.5 text-center text-[13px] text-ink-muted">
        Используйте email и пароль аккаунта
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-ink-muted">
            Email
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="h-11"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-ink-muted">
            Пароль
          </label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="h-11"
          />
        </div>

        <div className="pt-0.5 text-right">
          <Link
            to="/login"
            className="text-xs font-medium text-ink-subtle transition-colors hover:text-foreground"
          >
            Забыли пароль?
          </Link>
        </div>

        <button
          type="submit"
          disabled={login.isPending}
          className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-foreground text-[13.5px] font-semibold text-background shadow-xs transition-[opacity,transform] hover:-translate-y-px disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {login.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Входим…
            </>
          ) : (
            "Войти"
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-[13px] text-ink-muted">
        Нет аккаунта?{" "}
        <Link
          to="/signup"
          className="font-semibold text-foreground underline-offset-4 hover:underline"
        >
          Создать
        </Link>
      </p>
    </div>
  );
}
