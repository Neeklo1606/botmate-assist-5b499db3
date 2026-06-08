/**
 * NeekloHeader — премиальный sticky-хедер.
 * Паттерн: прозрачный поверх hero, при скролле сжимается по высоте, получает
 * сильнее блюр + soft shadow. Центрированная pill-навигация. Полноэкранный
 * mobile overlay с крупной типографикой и сильным CTA.
 *
 * Применяется во всех маркетинговых маршрутах через _marketing layout.
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

  // Scroll-aware sticky state
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

  // Close mobile on Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className={cn(
        "sticky top-0 z-40",
        "transition-[background-color,border-color,box-shadow,backdrop-filter] duration-[420ms]",
        "ease-[cubic-bezier(0.2,0.8,0.2,1)]",
        scrolled
          ? "border-b border-border/70 bg-background/88 backdrop-blur-xl header-scrolled"
          : "border-b border-transparent bg-background/55 backdrop-blur-md",
      )}
    >
      <Container>
        <div
          className={cn(
            "flex items-center justify-between gap-6",
            "transition-[height] duration-[420ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]",
            scrolled ? "h-[52px] md:h-[58px]" : "h-14 md:h-[68px]",
          )}
        >
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 transition-opacity duration-200 hover:opacity-80"
            aria-label="Neeklo, на главную"
          >
            <NeekloLogo />
          </Link>

          {/* Centered pill nav */}
          <nav
            aria-label="Главное меню"
            className="hidden flex-1 justify-center md:flex"
          >
            <ul
              className={cn(
                "flex items-center gap-0.5 rounded-full border border-border/60 bg-background/70 px-1.5 py-1",
                "shadow-[var(--shadow-rim),0_1px_2px_0_oklch(0.2_0.01_110/0.04)] backdrop-blur-md",
                "transition-shadow duration-[420ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]",
              )}
            >
              {nav.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    hash={item.hash}
                    className={cn(
                      "inline-flex h-[30px] items-center gap-1.5 rounded-full px-3.5",
                      "text-[12.5px] font-medium tracking-[-0.005em] text-ink-muted",
                      "transition-colors duration-200 hover:text-foreground",
                    )}
                    activeProps={{
                      className: "bg-surface-muted text-foreground",
                    }}
                  >
                    {item.label}
                    {item.soon && (
                      <span
                        className={cn(
                          "rounded-full bg-foreground/[0.05] px-1.5 py-[1px]",
                          "text-[9px] font-semibold uppercase tracking-[0.1em] text-ink-subtle",
                        )}
                      >
                        скоро
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right cluster */}
          <div className="hidden items-center gap-1.5 md:flex">
            <ThemeToggle />
            <span
              aria-hidden
              className="mx-2 h-5 w-px"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, var(--color-border), transparent)",
              }}
            />
            {isAuthed ? (
              <Button
                asChild
                variant="brand"
                size="sm"
                className="h-9 rounded-full px-4 text-[13px]"
              >
                <Link to="/app">В кабинет</Link>
              </Button>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghostInk"
                  size="sm"
                  className="h-9 rounded-full px-3.5 text-[13px] text-ink-muted hover:text-foreground"
                >
                  <Link to="/login">Войти</Link>
                </Button>
                <Button
                  asChild
                  variant="brand"
                  size="sm"
                  className={cn(
                    "group/cta h-9 rounded-full pl-3.5 pr-4 text-[13px]",
                    "shadow-xs ring-1 ring-foreground/0 transition-shadow hover:shadow-sm",
                  )}
                >
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

          {/* Mobile trigger */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "relative inline-flex h-10 w-10 items-center justify-center rounded-full",
                "border border-border/70 bg-background/70 text-foreground backdrop-blur",
                "transition-colors duration-200 hover:bg-surface-muted",
              )}
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
              aria-controls="mobile-nav-overlay"
            >
              <Menu
                className={cn(
                  "absolute h-[18px] w-[18px] transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
                  open ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100",
                )}
              />
              <X
                className={cn(
                  "absolute h-[18px] w-[18px] transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
                  open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0",
                )}
              />
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile overlay — near-fullscreen, premium */}
      <div
        id="mobile-nav-overlay"
        className={cn(
          "fixed inset-x-0 bottom-0 top-14 z-30 md:hidden",
          "transition-[opacity,transform] duration-[360ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1.5 opacity-0",
        )}
      >
        {/* Layered surface — soft warm panel, not a flat sheet */}
        <div
          aria-hidden
          className="absolute inset-0 bg-background/96 backdrop-blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[-15%] h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, var(--color-accent-glow), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, color-mix(in oklab, var(--color-border) 90%, transparent), transparent)",
          }}
        />

        <div className="relative flex h-full flex-col">
          <Container>
            <nav
              aria-label="Меню"
              className="flex flex-col gap-1 pt-6"
            >
              {nav.map((item, i) => (
                <Link
                  key={item.label}
                  to={item.to}
                  hash={item.hash}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group flex items-center justify-between rounded-2xl px-4 py-4",
                    "font-display text-[22px] font-medium tracking-[-0.02em] text-foreground",
                    "transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
                    "hover:bg-surface-muted",
                    open && "animate-fade-in",
                  )}
                  style={open ? { animationDelay: `${60 + i * 40}ms`, animationFillMode: "backwards" } : undefined}
                >
                  <span className="inline-flex items-center gap-3">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full bg-accent/0 transition-colors duration-200 group-hover:bg-accent/70"
                    />
                    {item.label}
                  </span>
                  {item.soon ? (
                    <span className="rounded-full border border-border/80 bg-surface px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-subtle">
                      скоро
                    </span>
                  ) : (
                    <ArrowRight
                      className="h-4 w-4 text-ink-subtle transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground"
                      strokeWidth={1.75}
                    />
                  )}
                </Link>
              ))}
            </nav>
          </Container>

          {/* Bottom CTA cluster — pinned to safe-area */}
          <div className="mt-auto px-4 pb-[max(24px,env(safe-area-inset-bottom))] pt-6">
            <Container>
              <div className="rounded-3xl border border-border/70 bg-surface/80 p-3 shadow-[var(--shadow-rim),var(--shadow-md)] backdrop-blur">
                {isAuthed ? (
                  <Button asChild variant="brand" size="lg" className="w-full rounded-2xl">
                    <Link to="/app" onClick={() => setOpen(false)}>
                      В кабинет
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      asChild
                      variant="ghostInk"
                      size="lg"
                      className="flex-1 rounded-2xl text-ink-muted"
                    >
                      <Link to="/login" onClick={() => setOpen(false)}>
                        Войти
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="brand"
                      size="lg"
                      className="group/m flex-1 rounded-2xl"
                    >
                      <Link
                        to="/onboarding/assistant"
                        onClick={() => setOpen(false)}
                        className="gap-2"
                      >
                        Подключить
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover/m:translate-x-0.5"
                          strokeWidth={2}
                        />
                      </Link>
                    </Button>
                  </div>
                )}
                <p className="mt-3 px-2 text-center text-[11px] text-ink-subtle">
                  Один помощник. Весь твой бизнес.
                </p>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </header>
  );
}
