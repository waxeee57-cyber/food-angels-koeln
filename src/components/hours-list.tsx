import { restaurant } from "@/lib/content";
import { cn } from "@/lib/utils";

export function HoursList({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-col gap-2 text-sm", className)}>
      {restaurant.hours.map((row) => (
        <li key={row.days} className="flex items-baseline justify-between gap-6">
          <span className="text-muted-foreground">{row.days}</span>
          <span className={row.closed ? "text-muted-foreground" : "font-medium"}>
            {row.time}
          </span>
        </li>
      ))}
    </ul>
  );
}
