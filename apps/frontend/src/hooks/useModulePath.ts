"use client";

import { useEffect, useState } from "react";

export interface PathPoint {
  x: number;
  y: number;
}

interface PathDimensions {
  width: number;
  height: number;
}

export function useModulePath(
  containerRef: React.RefObject<HTMLElement | null>
) {
  const [points, setPoints] = useState<PathPoint[]>([]);

  const [startPoint, setStartPoint] = useState<PathPoint | null>(null);
  const [endPoint, setEndPoint] = useState<PathPoint | null>(null);

  const [dimensions, setDimensions] = useState<PathDimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const moduleElements = container.querySelectorAll<HTMLElement>(
      "[data-module-path]"
    );

    const header = container.querySelector<HTMLElement>(
      "[data-path-header]"
    );

    const footer = container.querySelector<HTMLElement>(
      "[data-path-footer]"
    );

    const updatePath = () => {
      const containerRect = container.getBoundingClientRect();

      const getCenter = (element: HTMLElement): PathPoint => {
        const rect = element.getBoundingClientRect();

        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        };
      };

      // Centros dos módulos
      const newPoints = Array.from(moduleElements).map(getCenter);

      // Entrada: centro horizontal do Header
      const headerCenter = header
        ? getCenter(header)
        : { x: containerRect.width / 2, y: 0 };

      // Saída: centro horizontal do Footer
      const footerCenter = footer
        ? getCenter(footer)
        : {
            x: containerRect.width / 2,
            y: containerRect.height,
          };

      setPoints(newPoints);
      setStartPoint(headerCenter);
      setEndPoint(footerCenter);

      setDimensions({
        width: containerRect.width,
        height: containerRect.height,
      });
    };

    updatePath();

    const observer = new ResizeObserver(updatePath);

    observer.observe(container);

    moduleElements.forEach((element) => {
      observer.observe(element);
    });

    if (header) observer.observe(header);
    if (footer) observer.observe(footer);

    window.addEventListener("resize", updatePath);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePath);
    };
  }, [containerRef]);

  return {
    points,
    startPoint,
    endPoint,
    dimensions,
  };
}
