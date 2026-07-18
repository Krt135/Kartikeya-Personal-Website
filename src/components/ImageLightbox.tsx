import { useEffect } from "react";
import { X } from "lucide-react";

export type LightboxItem = {
  plate: string;
  title: string;
  alt: string;
  src: string;
};

type ImageLightboxProps = {
  item: LightboxItem | null;
  onClose: () => void;
};

export function ImageLightbox({ item, onClose }: ImageLightboxProps) {
  useEffect(() => {
    if (!item) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4 backdrop-blur-md md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} lightbox`}
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close lightbox"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground md:right-8 md:top-8"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </button>

      <div
        className="relative max-h-[85vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-card"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.alt}
          className="max-h-[70vh] w-full object-contain"
        />
        <div className="border-t border-border px-5 py-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
            Plate {item.plate}
          </p>
          <p className="mt-1 font-display text-xl font-semibold text-foreground">
            {item.title}
          </p>
        </div>
      </div>
    </div>
  );
}
