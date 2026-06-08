/**
 * AvreyaLogo — логотип бренда Avreya (картинка + wordmark).
 * Имя компонента и файл сохранены как NeekloLogo / neeklo-logo для совместимости импортов.
 */
import { cn } from "@/lib/utils";
import logo from "@/assets/avreya-logo.png.asset.json";

interface Props {
  className?: string;
}

export function NeekloLogo({ className }: Props) {
  return (
    <span
      className={cn("inline-flex items-center select-none", className)}
      aria-label="avreya.ru"
    >
      <img
        src={logo.url}
        alt="avreya.ru"
        className="h-11 w-auto md:h-12"
        loading="eager"
        decoding="async"
      />

    </span>
  );
}
