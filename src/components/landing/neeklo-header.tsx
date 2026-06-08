/**
 * NeekloHeader. Премиальный sticky-хедер продуктовой компании.
 * Прозрачный поверх hero, при скролле получает hairline и тонкую тень.
 */
import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const { data: user } = useCurrentUser();
  const isAuthed = !!user;

  // Scroll-aware sticky state: прозрачный сверху, hairline+shadow при скролле
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]",
        scrolled
          ? "border-b border-border/80 bg-background/85 backdrop-blur-xl header-scrolled"
          : "border-b border-transparent bg-background/50 backdrop-blur-md",
      )}
    >
      <Container>
        <div className="flex h-14 items-center justify-between gap-6 md:h-16">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 transition-opacity duration-200 hover:opacity-80"
            aria-label="Neeklo, на главную"
          >
            <NeekloLogo />
          </Link>

          {/* Centered nav */}
          <nav
            aria-label="Главное меню"
            className="hidden flex-1 justify-center md:flex"
          >
            <ul className="flex items-center gap-0.5 rounded-full border border-border/70 bg-background/70 px-1 py-1 shadow-xs backdrop-blur-md">
              {nav.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    hash={item.hash}
                    className="inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium text-ink-muted transition-colors duration-200 hover:text-foreground"
                    activeProps={{
                      className: "bg-surface-muted text-foreground",
                    }}
                  >
                    {item.label}
                    {item.soon && (
                      <span className="rounded-full bg-foreground/[0.06] px-1.5 py-[1px] text-[9px] font-semibold uppercase tracking-[0.1em] text-ink-subtle">
                        скоро
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right cluster */}
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <span className="mx-1.5 h-4 w-px bg-border" aria-hidden />
            {isAuthed ? (
              <Button asChild variant="brand" size="sm" className="rounded-full px-4">
                <Link to="/app">В кабинет</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghostInk" size="sm" className="rounded-full px-3.5">
                  <Link to="/login">Войти</Link>
                </Button>
                <Button asChild variant="brand" size="sm" className="group/cta rounded-full px-4">
                  <Link to="/onboarding/assistant" className="gap-2">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    Подключить
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover/cta:translate-x-0.5"
                      strokeWidth={2}
                    />
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile */}
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

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-x-0 top-[60px] z-30 origin-top border-t border-border bg-background/95 backdrop-blur-xl transition-all duration-300 md:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <Container>
          <nav aria-label="Меню" className="flex flex-col gap-1 py-5">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                hash={item.hash}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-3.5 text-[16px] font-medium text-foreground hover:bg-surface-muted"
              >
                <span>{item.label}</span>
                {item.soon && (
                  <span className="rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-subtle">
                    скоро
                  </span>
                )}
              </Link>
            ))}
            <div className="mt-3 flex gap-2 border-t border-border pt-4">
              {isAuthed ? (
                <Button asChild variant="brand" size="lg" className="flex-1">
                  <Link to="/app" onClick={() => setOpen(false)}>
                    В кабинет
                  </Link>
                </Button>
              ) : (
                <>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    <Link to="/login" onClick={() => setOpen(false)}>
                      Войти
                    </Link>
                  </Button>
                  <Button asChild variant="brand" size="lg" className="flex-1">
                    <Link
                      to="/onboarding/assistant"
                      onClick={() => setOpen(false)}
                    >
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
