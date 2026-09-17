import Image from "next/image";

import { cn } from "@/lib/utils";

type FoodPhotoProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
};

export function FoodPhoto({
  src,
  alt,
  className,
  imageClassName,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: FoodPhotoProps) {
  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(
          "object-cover transition duration-700 ease-out group-hover:scale-[1.04]",
          imageClassName
        )}
      />
    </div>
  );
}
