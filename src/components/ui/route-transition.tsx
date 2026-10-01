"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const COVER_DURATION = 420;
const REVEAL_DURATION = 480;

export function RouteTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const navigationTimer = useRef<number | undefined>(undefined);
  const fallbackTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const root = document.documentElement;

    if (root.dataset.routeTransition !== "cover") {
      return;
    }

    window.clearTimeout(fallbackTimer.current);
    const frame = window.requestAnimationFrame(() => {
      root.dataset.routeTransition = "reveal";
    });
    const cleanupTimer = window.setTimeout(() => {
      delete root.dataset.routeTransition;
    }, REVEAL_DURATION);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(cleanupTimer);
    };
  }, [pathname]);

  useEffect(() => {
    function handleInternalNavigation(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      const anchor = target instanceof Element ? target.closest("a") : null;

      if (
        !anchor ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        anchor.dataset.noTransition === "true"
      ) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);
      const current = new URL(window.location.href);

      if (
        destination.origin !== current.origin ||
        (destination.pathname === current.pathname &&
          destination.search === current.search)
      ) {
        return;
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const root = document.documentElement;
      if (root.dataset.routeTransition) {
        return;
      }

      root.dataset.routeTransition = "cover";
      window.clearTimeout(navigationTimer.current);
      window.clearTimeout(fallbackTimer.current);

      navigationTimer.current = window.setTimeout(() => {
        router.push(
          `${destination.pathname}${destination.search}${destination.hash}`,
        );
      }, COVER_DURATION);

      fallbackTimer.current = window.setTimeout(() => {
        root.dataset.routeTransition = "reveal";
        window.setTimeout(() => {
          delete root.dataset.routeTransition;
        }, REVEAL_DURATION);
      }, 3000);
    }

    document.addEventListener("click", handleInternalNavigation, true);

    return () => {
      document.removeEventListener("click", handleInternalNavigation, true);
      window.clearTimeout(navigationTimer.current);
      window.clearTimeout(fallbackTimer.current);
    };
  }, [router]);

  return (
    <div className="route-transition-layer" aria-hidden="true">
      <div className="route-transition-mark">
        <span>DP</span>
        <span className="route-transition-line" />
      </div>
    </div>
  );
}
