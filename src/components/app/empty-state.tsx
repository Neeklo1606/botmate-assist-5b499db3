/**
 * EmptyState — премиальный пустой блок для списков и заглушек разделов.
 */
import * as React from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface px-6 py-16 text-center shadow-sm",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklab,var(--color-accent)_8%,transparent)_0%,transparent_70%)]"
      />
      {icon ? (
        <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-ink-muted shadow-xs">
          {icon}
        </div>
      ) : null}
      <div className="relative font-display text-lg font-semibold tracking-tight text-foreground">
        {title}
      </div>
      {description ? (
        <p className="relative mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
          {description}
        </p>
      ) : null}
      {action ? <div className="relative mt-6">{action}</div> : null}
    </div>
  );
}
