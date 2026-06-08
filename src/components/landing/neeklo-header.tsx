/**
 * NeekloHeader — премиальный sticky-хедер.
 * Логотип слева, центрированное меню, справа theme-toggle + 2 CTA.
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

const nav = [
  { to: "/media" as const, label: "Медиа-помощник" },
  { to: "/site" as const, label: "Сайты" },
  { to: "/" as const, hash: "how", label: "Как работает" },
  { to: "/" as const, hash: "pricing", label: "Тарифы" },
  { to: "/" as const, hash: "faq", label: "FAQ" },
];

export function NeekloHeader() {
  const [open, setOpen] = useState(false);
  const { data: user } = useCurrentUser();
  const isAuthed = !!user;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-lg">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          {/* Left: logo */}
          <Link to="/" className="flex items-center gap-2" aria-label="Neeklo — на главную">
            <NeekloLogo />
          </Link>

          {/* Center: nav */}
          <nav aria-label="Главное меню" className="hidden flex-1 justify-center md:flex">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    hash={item.hash}
                    className="inline-flex h-9 items-center rounded-md px-3 text-[13.5px] font-medium text-ink-muted transition-colors hover:bg-surface-muted hover:text-foreground"
                    activeProps={{ className: "text-foreground" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: actions */}
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
                    Создать сервис
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile burger */}
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
                className="rounded-md px-3 py-3 text-[15px] font-medium text-foreground hover:bg-surface-muted"
              >
                {item.label}
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
                      Создать сервис
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
