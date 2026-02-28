"use client";

import { useEffect } from "react";
import { applyParticleEffect } from "@/components/ui/cool-mode";

export function GlobalCoolMode() {
  useEffect(() => {
    const cleanups = new Map<HTMLElement, () => void>();
    const selector = "button, [data-cool-button='true']";

    const syncBindings = () => {
      for (const [element, cleanup] of cleanups.entries()) {
        if (!document.body.contains(element)) {
          cleanup();
          cleanups.delete(element);
        }
      }

      const targets = document.querySelectorAll<HTMLElement>(selector);
      targets.forEach((element) => {
        if (cleanups.has(element)) {
          return;
        }
        cleanups.set(
          element,
          applyParticleEffect(element, {
            particle: "circle",
            size: 14,
            speedHorz: 8,
            speedUp: 18,
          })
        );
      });
    };

    syncBindings();

    const observer = new MutationObserver(() => {
      syncBindings();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      for (const cleanup of cleanups.values()) {
        cleanup();
      }
      cleanups.clear();
    };
  }, []);

  return null;
}
