"use client";

import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const { threshold = 0.1, root = null, rootMargin = "0px", freezeOnceVisible = true } = options;

  const elementRef = useRef<Element | null>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  // Serialise threshold so arrays don't cause spurious re-runs
  const thresholdKey = JSON.stringify(threshold);

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const parsedThreshold = JSON.parse(thresholdKey) as number | number[];
    const observer = new IntersectionObserver(
      ([e]) => setEntry(e),
      { threshold: parsedThreshold, root, rootMargin }
    );
    observer.observe(node);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef?.current, thresholdKey, root, rootMargin, frozen]);

  return { ref: elementRef, entry, isIntersecting: !!entry?.isIntersecting };
}
