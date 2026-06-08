/**
 * Section — вертикальный ритм секций лендинга.
 * Tone задаёт цвет фона из дизайн-системы (никогда — ad-hoc).
 * SectionHeading — fadeUp при появлении в viewport (см. lib/motion).
 */
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, inViewProps } from "@/lib/motion";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: "default" | "subtle" | "muted" | "tint" | "sunken" | "ink";
  size?: "sm" | "md" | "lg";
  /** Включить тонкий верхний/нижний hairline для усиления слоистости. */
  bordered?: boolean;
}

// Тона выстроены по светлоте: default → subtle → tint → muted → sunken → ink.
// Это даёт ритм при чередовании, без ярких контрастов.
const toneClass = {
  default: "bg-background text-foreground",
  subtle: "bg-surface text-foreground",
  muted: "bg-surface-muted text-foreground",
  tint: "bg-surface-tint text-foreground",
  sunken: "bg-surface-sunken text-foreground",
  ink: "bg-foreground text-background",
} as const;

const sizeClass = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
} as const;

// Лёгкая верхняя «кромка» — даёт слоистость соседним светлым секциям.
const rimClass: Record<SectionProps["tone"] & string, string> = {
  default: "",
  subtle: "shadow-[inset_0_1px_0_0_color-mix(in_oklab,var(--color-border)_55%,transparent)]",
  muted: "shadow-[inset_0_1px_0_0_color-mix(in_oklab,var(--color-border)_70%,transparent)]",
  tint: "shadow-[inset_0_1px_0_0_color-mix(in_oklab,var(--color-border)_60%,transparent)]",
  sunken: "shadow-[inset_0_1px_0_0_color-mix(in_oklab,var(--color-border-strong)_55%,transparent),inset_0_-1px_0_0_color-mix(in_oklab,var(--color-border)_45%,transparent)]",
  ink: "",
};

export function Section({
  className,
  tone = "default",
  size = "md",
  bordered = true,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        toneClass[tone],
        sizeClass[size],
        bordered && rimClass[tone],
        className,
      )}
      {...props}
    />
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      {...inViewProps}
      className={cn(
        "mb-10 md:mb-14 max-w-[720px]",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <div
          className={cn(
            "mb-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted",
            align === "center" && "justify-center",
          )}
        >
          <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
          {eyebrow}
        </div>
      ) : null}
      <h2 className="font-display text-[28px] font-semibold leading-[1.08] tracking-[-0.028em] md:text-[40px] md:leading-[1.04] lg:text-[44px]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-ink-muted md:text-[16.5px]">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
