/**
 * _app — protected layout кабинета.
 *
 * Дизайн (Neeklo, Milk & Olive):
 * - Левый сайдбар 240px на --color-sidebar, тонкая hairline-граница.
 * - Активный пункт: foreground + олив-аккент слева (--color-accent).
 * - Профиль и Settings — внизу сайдбара.
 * - Основная область: --color-background, одна типографическая система.
 *
 * Если не авторизован → /login?redirect=<current>.
 */
import {
  Outlet,
  Link,
  createFileRoute,
  
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import {
  LayoutDashboard,
  Bot,
  BookOpen,
  MessageCircle,
  Users,
  Phone,
  Inbox,
  Plug,
  KeyRound,
  ShieldCheck,
  Settings,
  Bell,
  LogOut,
  Check,
  FolderKanban,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NeekloLogo } from "@/components/brand/neeklo-logo";
import { useCurrentUser, useLogout } from "@/lib/hooks/use-auth";
import {
  useNotifications,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
} from "@/lib/hooks/use-app";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Breadcrumbs } from "@/components/app/breadcrumbs";

export const Route = createFileRoute("/_app")({
  // Auth guard temporarily disabled — open access to /app for preview/testing.
  component: AppLayout,
});

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  exact?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/assistants", label: "Assistants", icon: Bot },
  { to: "/knowledge", label: "Knowledge", icon: BookOpen },
  { to: "/chat", label: "Chat", icon: MessageCircle },
  { to: "/visitors", label: "Visitors", icon: Users },
  { to: "/calls", label: "Calls", icon: Phone },
  { to: "/leads", label: "Leads", icon: Inbox },
  { to: "/app-integrations", label: "Integrations", icon: Plug },
  { to: "/api-keys", label: "API Keys", icon: KeyRound },
  { to: "/audit", label: "Audit", icon: ShieldCheck },
];

const MOBILE_NAV: NavItem[] = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/assistants", label: "Assistants", icon: Bot },
  { to: "/leads", label: "Leads", icon: Inbox },
  { to: "/settings", label: "More", icon: Settings },
];

function AppLayout() {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--color-background)" }}>
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-x-hidden pb-[72px] md:pb-0">
          <div className="container-px mx-auto w-full max-w-[1280px] py-4 md:py-6 text-foreground">
            <Breadcrumbs />
            <Outlet />
          </div>
        </main>
        <MobileBottomNav />
      </div>
    </div>
  );
}

/* ───── Sidebar (desktop) ───── */

function Sidebar() {
  const location = useLocation();
  return (
    <aside
      className="sticky top-0 hidden h-screen w-[240px] flex-none flex-col md:flex"
      style={{ background: "var(--color-sidebar)", borderRight: "1px solid var(--color-border)" }}
    >
      {/* Logo */}
      <div
        className="flex h-14 items-center px-5"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <Link
          to="/app"
          aria-label="Neeklo — кабинет"
          className="transition-opacity hover:opacity-80"
        >
          <NeekloLogo />
        </Link>
      </div>

      {/* Nav */}
      <nav aria-label="Кабинет" className="flex-1 overflow-y-auto px-2 py-3">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.to
              : location.pathname === item.to ||
                location.pathname.startsWith(`${item.to}/`);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "relative flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  )}
                  style={{
                    color: isActive ? "var(--color-foreground)" : "var(--color-ink-muted)",
                    background: isActive ? "color-mix(in oklab, var(--color-accent) 10%, transparent)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = "var(--color-foreground)";
                      (e.currentTarget as HTMLElement).style.background =
                        "var(--color-surface-muted)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = "var(--color-ink-muted)";
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }
                  }}
                >
                  {/* Lime left-border accent for active */}
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute left-0 top-1/2 -translate-y-1/2"
                      style={{
                        width: 3,
                        height: 22,
                        background: "var(--color-accent)",
                        borderRadius: 2,
                      }}
                    />
                  )}
                  <item.icon className="h-4 w-4" strokeWidth={1.75} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom: profile + settings */}
      <div
        className="px-2 pb-3 pt-2"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <SidebarSettingsLink active={location.pathname.startsWith("/settings")} />
        <SidebarProfile />
      </div>
    </aside>
  );
}

function SidebarSettingsLink({ active }: { active: boolean }) {
  return (
    <Link
      to="/settings"
      className="relative flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors"
      style={{
        color: active ? "var(--color-foreground)" : "var(--color-ink-muted)",
        background: active ? "color-mix(in oklab, var(--color-accent) 10%, transparent)" : "transparent",
      }}
    >
      {active && (
        <span
          aria-hidden
          className="absolute left-0 top-1/2 -translate-y-1/2"
          style={{ width: 3, height: 22, background: "var(--color-accent)", borderRadius: 2 }}
        />
      )}
      <Settings className="h-4 w-4" strokeWidth={1.75} />
      Settings
    </Link>
  );
}

function SidebarProfile() {
  const { data: user } = useCurrentUser();
  const logoutMut = useLogout();
  const navigate = useNavigate();
  if (!user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="mt-1 flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left text-sm font-medium transition-colors"
          style={{ color: "var(--color-foreground)" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "var(--color-surface-muted)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "transparent")
          }
        >
          <span
            className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-semibold"
            style={{ background: "var(--color-accent)", color: "var(--color-accent-ink)" }}
          >
            {user.avatarInitials}
          </span>
          <span className="min-w-0 flex-1 truncate">{user.name}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="top" className="w-56">
        <DropdownMenuLabel>
          <div className="text-sm font-semibold text-foreground">{user.name}</div>
          <div className="text-xs font-normal text-ink-muted">{user.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/assistant">← На главную</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            logoutMut.mutate(undefined, {
              onSuccess: () => {
                toast.success("Вы вышли из аккаунта");
                navigate({ to: "/" });
              },
            });
          }}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" strokeWidth={1.75} />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ───── Topbar ───── */

function Topbar() {
  const { data: user } = useCurrentUser();
  const { data: notifications } = useNotifications();
  const markOneMut = useMarkNotificationRead();
  const markAllMut = useMarkAllNotificationsRead();
  const logoutMut = useLogout();
  const navigate = useNavigate();

  const unread = notifications?.filter((n) => !n.read).length ?? 0;
  // MOCK: live online counter — заменить на realtime подписку
  const onlineNow = 7;

  return (
    <header
      className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 px-4 md:px-6"
      style={{
        background: "var(--color-background)",
        borderBottom: "1px solid var(--color-border)",
        color: "var(--color-foreground)",
      }}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="md:hidden">
          <Link to="/app" aria-label="Neeklo" className="transition-opacity hover:opacity-80">
            <NeekloLogo />
          </Link>
        </div>
        <div className="hidden text-sm md:block" style={{ color: "var(--color-ink-subtle)" }}>
          {user?.workspaceName ?? "Workspace"}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Live online pill */}
        <div
          className="hidden items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium sm:inline-flex"
          style={{
            background: "var(--color-accent-glow)",
            color: "var(--color-accent)",
            border: "1px solid color-mix(in oklab, var(--color-accent) 30%, transparent)",
          }}
          title="Посетители на сайте сейчас"
        >
          <span className="relative inline-flex h-2 w-2">
            <span
              aria-hidden
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
              style={{ background: "var(--color-accent)" }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: "var(--color-accent)" }}
            />
          </span>
          Онлайн: <span className="tabular-nums">{onlineNow}</span>
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Уведомления${unread ? `, непрочитанных: ${unread}` : ""}`}
              className="relative text-foreground hover:bg-surface-muted hover:text-foreground"
            >
              <Bell className="h-4 w-4" strokeWidth={1.75} />
              {unread > 0 && (
                <span
                  className="absolute right-1 top-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-semibold leading-none text-accent-ink tabular-nums"
                  style={{ background: "var(--color-accent)" }}
                >
                  {unread > 9 ? "9+" : unread}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between px-3 py-2.5 border-b border-border">
              <div className="text-sm font-semibold">Уведомления</div>
              {unread > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    markAllMut.mutate(undefined, {
                      onSuccess: () => toast.success("Все уведомления прочитаны"),
                    });
                  }}
                  className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-foreground"
                >
                  <Check className="h-3 w-3" strokeWidth={2} /> Прочитать все
                </button>
              )}
            </div>
            <div className="max-h-96 overflow-y-auto">
              {!notifications || notifications.length === 0 ? (
                <div className="px-3 py-8 text-center text-xs text-ink-muted">
                  Нет уведомлений
                </div>
              ) : (
                notifications.slice(0, 8).map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => !n.read && markOneMut.mutate(n.id)}
                    className={cn(
                      "flex w-full items-start gap-2 border-b border-border/50 px-3 py-2.5 text-left transition-colors hover:bg-surface-muted",
                    )}
                  >
                    {!n.read && (
                      <span
                        aria-hidden
                        className="mt-1.5 inline-flex h-2 w-2 flex-none rounded-full"
                        style={{ background: "var(--color-accent)" }}
                      />
                    )}
                    <div className={cn("min-w-0 flex-1", n.read && "pl-4")}>
                      <div className="text-sm font-medium text-foreground">
                        {n.title}
                      </div>
                      {n.description && (
                        <div className="mt-0.5 line-clamp-2 text-xs text-ink-muted">
                          {n.description}
                        </div>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Avatar (desktop) */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="Профиль"
                className="hidden h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-opacity hover:opacity-90 md:inline-flex"
                style={{ background: "var(--color-accent)", color: "var(--color-accent-ink)" }}
              >
                {user.avatarInitials}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="text-sm font-semibold text-foreground">{user.name}</div>
                <div className="text-xs font-normal text-ink-muted">{user.email}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/settings">Настройки</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/assistant">← На главную</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  logoutMut.mutate(undefined, {
                    onSuccess: () => {
                      toast.success("Вы вышли из аккаунта");
                      navigate({ to: "/" });
                    },
                  });
                }}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" strokeWidth={1.75} />
                Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}

/* ───── Mobile bottom nav ───── */

function MobileBottomNav() {
  const location = useLocation();
  return (
    <nav
      aria-label="Мобильная навигация"
      className="fixed inset-x-0 bottom-0 z-30 grid h-[64px] grid-cols-4 md:hidden"
      style={{
        background: "var(--color-sidebar)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      {MOBILE_NAV.map((item) => {
        const isActive = item.exact
          ? location.pathname === item.to
          : location.pathname === item.to ||
            location.pathname.startsWith(`${item.to}/`);
        return (
          <Link
            key={item.to}
            to={item.to}
            className="flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors"
            style={{ color: isActive ? "var(--color-foreground)" : "var(--color-ink-subtle)" }}
          >
            <item.icon className="h-5 w-5" strokeWidth={1.75} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
