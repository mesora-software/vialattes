"use client";

import { useEffect, useState } from "react";

export interface PathPoint {
  x: number;
  y: number;
}

export function useModulePath(containerRef: React.RefObject<HTMLElement | null>) {
  const [points, setPoints] = useState<PathPoint[]>([]);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const updatePath = () => {
      const containerRect = container.getBoundingClientRect();

      const moduleElements = container.querySelectorAll<HTMLElement>(
        "[data-module-path]"
      );

      const newPoints = Array.from(moduleElements).map((element) => {
        const rect = element.getBoundingClientRect();

        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        };
      });

      setPoints(newPoints);

      setDimensions({
        width: containerRect.width,
        height: containerRect.height,
      });
    };

    updatePath();

    const observer = new ResizeObserver(updatePath);

    observer.observe(container);

    const moduleElements = container.querySelectorAll<HTMLElement>(
      "[data-module-path]"
    );

    moduleElements.forEach((element) => observer.observe(element));

    window.addEventListener("resize", updatePath);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePath);
    };
  }, [containerRef]);

  return { points, dimensions };
}
