/**
 * NeekloHeader — премиальный floating sticky-хедер.
 *
 * Поведение:
 * - Хедер закреплён к верху вьюпорта и представлен в виде центрированной
 *   «капсулы» (floating island): не полноразмерный бар, а островок с
 *   max-width, лежащий в центре экрана.
 * - При скролле капсула сжимается: уменьшается max-width, высота, паддинги;
 *   усиливаются blur / shadow / border. Переходы плавные (≈320ms).
 * - 3-частная композиция: слева — логотип, в центре — pill-навигация,
 *   справа — theme toggle + Войти + Подключить. Левая и правая колонки
 *   равны по ширине (flex-1 basis-0), благодаря чему центр оптически
 *   совпадает с центром капсулы.
 *
 * Используется во всех маркетинговых маршрутах через _marketing layout.
 */
import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NeekloLogo } from "@/components/brand/neeklo-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCurrentUser } from "@/lib/hooks/use-auth";
import { cn } from "@/lib/utils";

/**
 * Scroll-spy: следит за in-page #section якорями и возвращает текущий
 * видимый. Нужен, чтобы hash-пункты подсвечивались по реально видимой
 * секции, а не сразу все три (когда они все указывают на "/").
 */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [ids.join("|")]);
  return active;
}

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

const EASE = "cubic-bezier(0.22, 0.61, 0.36, 1)";

export function NeekloHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: user } = useCurrentUser();
  const isAuthed = !!user;
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const activeSection = useActiveSection(
    nav.filter((n) => n.hash).map((n) => n.hash as string),
  );

  const isItemActive = (item: NavItem) => {
    if (item.hash) return pathname === "/" && activeSection === item.hash;
    return pathname === item.to || pathname.startsWith(item.to + "/");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

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
        "sticky top-0 z-[80] w-full",
        // Outer vertical breathing — компрессия отступа сверху при скролле
        "transition-[padding] duration-[320ms]",
        scrolled ? "pt-2 md:pt-3" : "pt-3 md:pt-5",
      )}
      style={{ transitionTimingFunction: EASE }}
    >
      {/* Floating capsule — центрированный остров, шириной по max-w */}
      <div
        className={cn(
          "mx-auto px-3 sm:px-4 md:px-6",
          "transition-[max-width,padding] duration-[320ms]",
          scrolled
            ? "max-w-[1040px]"
            : "max-w-[1200px]",
        )}
        style={{ transitionTimingFunction: EASE }}
      >
        <div
          className={cn(
            "relative isolate grid items-center gap-3 overflow-hidden md:gap-4",
            "grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]",
            "rounded-full border backdrop-blur-xl",
            "transition-[height,padding,background-color,border-color,box-shadow,backdrop-filter]",
            "duration-[320ms]",
            scrolled
              ? [
                  "h-[58px] md:h-[62px]",
                  "px-2.5 md:px-3",
                  "border-border/75 bg-background",
                  "shadow-[var(--shadow-rim),0_8px_28px_-12px_oklch(0.2_0.01_110/0.18)]",
                ].join(" ")
              : [
                  "h-[64px] md:h-[72px]",
                  "px-3 md:px-4",
                  "border-border/55 bg-background",
                  "shadow-[var(--shadow-rim),0_4px_18px_-12px_oklch(0.2_0.01_110/0.12)]",
                ].join(" "),
          )}
          style={{ transitionTimingFunction: EASE }}
        >

          {/* LEFT — logo */}
          <div className="flex min-w-0 items-center">
            <Link
              to="/"
              className="group inline-flex h-10 items-center gap-2.5 rounded-full px-1.5 py-1 transition-opacity duration-200 hover:opacity-85 sm:h-11 lg:h-12"
              aria-label="Avreya, на главную"
            >
              <NeekloLogo />
            </Link>
          </div>

          {/* CENTER — pill nav */}
          <nav
            aria-label="Главное меню"
            className="hidden lg:flex"
          >
            <ul
              className={cn(
                "flex items-center gap-0.5 rounded-full",
                "transition-[gap,padding] duration-[320ms]",
                scrolled ? "px-0.5 py-0.5" : "px-1 py-0.5",
              )}
              style={{ transitionTimingFunction: EASE }}
            >
              {nav.map((item) => {
                const active = isItemActive(item);
                return (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      hash={item.hash}
                      data-active={active ? "true" : undefined}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group/nav relative inline-flex h-[30px] items-center gap-1.5 rounded-full px-2.5 xl:px-3.5",
                        "text-[12.5px] font-medium tracking-[-0.005em] whitespace-nowrap",
                        "transition-colors duration-200",
                        active
                          ? "bg-surface-muted text-foreground"
                          : "text-ink-muted hover:bg-surface-muted/60 hover:text-foreground",
                      )}
                    >
                      {item.label}
                      {item.soon && (
                        <span
                          className={cn(
                            "hidden xl:inline rounded-full bg-foreground/[0.05] px-1.5 py-[1px]",
                            "text-[9px] font-semibold uppercase tracking-[0.1em] text-ink-subtle",
                          )}
                        >
                          скоро
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>


          {/* RIGHT — actions cluster */}
          <div className="hidden items-center justify-end gap-1 lg:flex">
            <ThemeToggle />
            <span
              aria-hidden
              className="mx-1.5 h-5 w-px"
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
                    "shadow-xs transition-shadow duration-200 hover:shadow-sm",
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

          {/* MOBILE — right column compresses to: theme + burger */}
          <div className="col-start-3 flex items-center justify-end gap-1 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "relative inline-flex h-9 w-9 items-center justify-center rounded-full",
                "border border-border/70 bg-background/70 text-foreground backdrop-blur",
                "transition-colors duration-200 hover:bg-surface-muted",
              )}
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
              aria-controls="mobile-nav-overlay"
            >
              <Menu
                className={cn(
                  "absolute h-[18px] w-[18px] transition-all duration-300",
                  open ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100",
                )}
                style={{ transitionTimingFunction: EASE }}
              />
              <X
                className={cn(
                  "absolute h-[18px] w-[18px] transition-all duration-300",
                  open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0",
                )}
                style={{ transitionTimingFunction: EASE }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        id="mobile-nav-overlay"
        className={cn(
          "fixed inset-x-0 bottom-0 top-[76px] z-[70] lg:hidden",
          "transition-[opacity,transform] duration-[360ms]",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1.5 opacity-0",
        )}
        style={{ transitionTimingFunction: EASE }}
      >
        <div aria-hidden className="absolute inset-0 bg-background/96 backdrop-blur-2xl" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[-15%] h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, var(--color-accent-glow), transparent 70%)",
          }}
        />

        <div className="relative flex h-full flex-col">
          <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
            <nav aria-label="Меню" className="flex flex-col gap-1 pt-6">
              {nav.map((item, i) => (
                <Link
                  key={item.label}
                  to={item.to}
                  hash={item.hash}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group flex items-center justify-between rounded-2xl px-4 py-4",
                    "font-display text-[22px] font-medium tracking-[-0.02em] text-foreground",
                    "transition-[background-color,transform] duration-300",
                    "hover:bg-surface-muted",
                    open && "animate-fade-in",
                  )}
                  style={
                    open
                      ? {
                          animationDelay: `${60 + i * 40}ms`,
                          animationFillMode: "backwards",
                          transitionTimingFunction: EASE,
                        }
                      : { transitionTimingFunction: EASE }
                  }
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
          </div>

          <div className="mt-auto px-4 pb-[max(24px,env(safe-area-inset-bottom))] pt-6">
            <div className="mx-auto w-full max-w-[1200px]">
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
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
