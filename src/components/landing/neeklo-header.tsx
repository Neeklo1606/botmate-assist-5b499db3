/**
 * NeekloHeader. Премиальный sticky-хедер продуктовой компании.
 * Главный CTA. Медиа и Сайты помечены как «Скоро».
 */
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { NeekloLogo } from "@/components/brand/neeklo-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCurrentUser } from "@/lib/hooks/use-auth";
import { cn } from "@/lib/utils";

type NavItem = {
  to: "/" | "/media" | "/site";
  hash?: string;
  label: string;
  soon?: boolean;
};

const nav: NavItem[] = [
  { to: "/", hash: "product", label: "Продукт" },
  { to: "/", hash: "integrations", label: "Интеграции" },
  { to: "/", hash: "pricing", label: "Тарифы" },
  { to: "/media", label: "Медиа", soon: true },
  { to: "/site", label: "Сайты", soon: true },
];

export function NeekloHeader() {
  const [open, setOpen] = useState(false);
  const { data: user } = useCurrentUser();
  const isAuthed = !!user;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-lg">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2" aria-label="Neeklo, на главную">
            <NeekloLogo />
            <span className="hidden rounded-full border border-border bg-surface px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-wide text-ink-muted sm:inline-flex">
              Продукт
            </span>
          </Link>

          <nav aria-label="Главное меню" className="hidden flex-1 justify-center md:flex">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    hash={item.hash}
                    className="inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-[13.5px] font-medium text-ink-muted transition-colors hover:bg-surface-muted hover:text-foreground"
                    activeProps={{ className: "text-foreground" }}
                  >
                    {item.label}
                    {item.soon && (
                      <span className="rounded-full border border-border bg-surface px-1.5 py-[1px] text-[9.5px] font-semibold uppercase tracking-wide text-ink-subtle">
                        скоро
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            {isAuthed ? (
              <Button asChild variant="brand" size="sm">
                <Link to="/app">В кабинет</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghostInk" size="sm">
                  <Link to="/login">Войти</Link>
                </Button>
                <Button asChild variant="brand" size="sm">
                  <Link to="/onboarding/assistant">
                    Подключить
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </Link>
                </Button>
              </>
            )}
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground hover:bg-surface-muted"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </Container>

      <div
        className={cn(
          "border-t border-border bg-background md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <Container>
          <nav aria-label="Меню" className="flex flex-col gap-1 py-3">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                hash={item.hash}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-md px-3 py-3 text-[15px] font-medium text-foreground hover:bg-surface-muted"
              >
                <span>{item.label}</span>
                {item.soon && (
                  <span className="rounded-full border border-border bg-surface px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-subtle">
                    скоро
                  </span>
                )}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 pt-2">
              {isAuthed ? (
                <Button asChild variant="brand" size="md" className="flex-1">
                  <Link to="/app" onClick={() => setOpen(false)}>
                    В кабинет
                  </Link>
                </Button>
              ) : (
                <>
                  <Button asChild variant="outline" size="md" className="flex-1">
                    <Link to="/login" onClick={() => setOpen(false)}>
                      Войти
                    </Link>
                  </Button>
                  <Button asChild variant="brand" size="md" className="flex-1">
                    <Link to="/onboarding/assistant" onClick={() => setOpen(false)}>
                      Подключить
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
