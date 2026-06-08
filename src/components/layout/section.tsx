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
  tone?: "default" | "muted" | "ink";
  size?: "sm" | "md" | "lg";
}

const toneClass = {
  default: "bg-background text-foreground",
  muted: "bg-surface-muted text-foreground",
  ink: "bg-foreground text-background",
} as const;

const sizeClass = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
} as const;

export function Section({
  className,
  tone = "default",
  size = "md",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(toneClass[tone], sizeClass[size], className)}
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
      <h2 className="font-display text-3xl font-semibold tracking-[-0.025em] md:text-[40px] md:leading-[1.05]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-[15px] leading-relaxed text-ink-muted md:text-base">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
