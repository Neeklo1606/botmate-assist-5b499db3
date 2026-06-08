/**
 * BotmeLogo (alias) — теперь рендерит Avreya-логотип (картинка).
 */
import { cn } from "@/lib/utils";
import logo from "@/assets/avreya-logo.png.asset.json";

interface BotmeLogoProps {
  variant?: "light" | "dark";
  inverse?: boolean;
  className?: string;
}

export function BotmeLogo({ className }: BotmeLogoProps) {
  return (
    <span className={cn("inline-flex items-center select-none", className)} aria-label="avreya.ru">
      <img src={logo.url} alt="avreya.ru" className="h-16 w-auto md:h-20" loading="eager" decoding="async" />
    </span>
  );
}
