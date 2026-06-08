/**
 * TrustStripHome — медленная атмосферная лента.
 * Один цельный поток, дублированный для бесшовного цикла.
 * Pause-on-hover, soft fade по краям, без агрессивных эффектов.
 */
const items = [
  "Уже 47 компаний доверяют Avreya",
  "Запуск AI-менеджера за 3 дня",
  "Telegram · WhatsApp · Instagram · Сайт",
  "Интеграция с amoCRM и Bitrix24",
  "Данные хранятся в РФ",
  "Поддержка 24/7",
  "Без кода и сложной настройки",
];

function Row() {
  return (
    <ul
      className="flex shrink-0 items-center gap-12 pr-12"
      aria-hidden={false}
    >
      {items.map((label) => (
        <li
          key={label}
          className="flex items-center gap-4 whitespace-nowrap text-[13px] font-medium text-ink-muted"
        >
          <span
            aria-hidden
            className="h-1 w-1 rounded-full bg-accent/70"
          />
          {label}
        </li>
      ))}
    </ul>
  );
}

export function TrustStripHome() {
  return (
    <div className="border-y border-border bg-surface-muted/60">
      <div
        className="pause-on-hover marquee-mask relative overflow-hidden py-5"
        style={{ ["--marquee-duration" as string]: "90s" }}
      >
        <div className="flex w-max animate-marquee">
          <Row />
          <Row />
        </div>
      </div>
    </div>
  );
}
