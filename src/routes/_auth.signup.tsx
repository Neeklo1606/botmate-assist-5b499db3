/**
 * /signup — регистрация по email/password (mock).
 * После успеха → /onboarding.
 */
import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useSignupWithEmail } from "@/lib/hooks/use-auth";

export const Route = createFileRoute("/_auth/signup")({
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const signup = useSignupWithEmail();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Заполните все поля");
      return;
    }
    if (password.length < 6) {
      toast.error("Пароль должен быть не короче 6 символов");
      return;
    }
    // TODO: replace with real API — POST /api/auth/signup
    signup.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          toast.success("Аккаунт создан. Поехали!");
          navigate({ to: "/onboarding" });
        },
        onError: () => toast.error("Не удалось создать аккаунт"),
      },
    );
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-7 shadow-[var(--shadow-md),var(--shadow-rim)] md:p-8">
      <h1 className="text-center font-display text-[22px] font-semibold tracking-[-0.02em] text-foreground">
        Создать аккаунт
      </h1>
      <p className="mt-1.5 text-center text-[13px] text-ink-muted">
        Бесплатно. Без карты. Полный доступ 14 дней.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-ink-muted">
            Имя
          </label>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Иван Иванов"
            className="h-11"
          />
        </div>
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Минимум 6 символов"
            className="h-11"
          />
        </div>

        <button
          type="submit"
          disabled={signup.isPending}
          className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-foreground text-[13.5px] font-semibold text-background shadow-xs transition-[opacity,transform] hover:-translate-y-px disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {signup.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Создаём аккаунт…
            </>
          ) : (
            "Создать аккаунт"
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-[13px] text-ink-muted">
        Уже есть аккаунт?{" "}
        <Link
          to="/login"
          className="font-semibold text-foreground underline-offset-4 hover:underline"
        >
          Войти
        </Link>
      </p>
    </div>
  );
}
