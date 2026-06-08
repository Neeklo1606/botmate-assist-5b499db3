/**
 * NeekloLogo — шрифтовой логотип бренда Avreya.
 * Тонкая засечка на акценте, без декора. Адаптируется под тему.
 */
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export function NeekloLogo({ className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-display text-[20px] font-semibold tracking-[-0.02em] leading-none select-none text-foreground",
        className,
      )}
      aria-label="Avreya"
    >
      <span className="relative">
        Avreya
        <span
          aria-hidden
          className="absolute -bottom-[2px] left-0 right-0 h-[2px] rounded-full bg-foreground/15"
        />
      </span>
    </span>
  );
}
