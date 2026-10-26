"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

const subscribe = () => () => {};

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

interface DraggablePanelProps {
  children: ReactNode;
  className?: string;
}

interface Position {
  x: number;
  y: number;
}

export default function DraggablePanel({
  children,
  className = "",
}: DraggablePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const [position, setPosition] = useState<Position | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const dragRef = useRef({
    active: false,
    pointerId: -1,
    offsetX: 0,
    offsetY: 0,
  });

  // Posição inicial: lado direito da tela.
  useEffect(() => {
    if (!mounted || !panelRef.current) return;

    const panel = panelRef.current;

    const updateBounds = () => {
      const width = panel.offsetWidth;
      const height = panel.offsetHeight;

      setPosition((current) => {
        if (current === null) {
          return {
            x: Math.max(0, window.innerWidth - width - 80),
            y: Math.max(0, window.innerHeight / 2 - height / 2),
          };
        }

        return {
          x: Math.max(
            0,
            Math.min(current.x, window.innerWidth - width)
          ),
          y: Math.max(
            0,
            Math.min(current.y, window.innerHeight - height)
          ),
        };
      });
    };

    updateBounds();

    const observer = new ResizeObserver(updateBounds);
    observer.observe(panel);

    window.addEventListener("resize", updateBounds);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateBounds);
    };
  }, [mounted]);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || position === null) return;

    const target = event.target as HTMLElement;

    // Botões e demais controles não iniciam o arraste.
    if (target.closest("button, input, a, select, textarea")) {
      return;
    }

    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      offsetX: event.clientX - position.x,
      offsetY: event.clientY - position.y,
    };

    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (
      !dragRef.current.active ||
      dragRef.current.pointerId !== event.pointerId ||
      !panelRef.current
    ) {
      return;
    }

    const width = panelRef.current.offsetWidth;
    const height = panelRef.current.offsetHeight;

    const maxX = Math.max(0, window.innerWidth - width);
    const maxY = Math.max(0, window.innerHeight - height);

    const x = event.clientX - dragRef.current.offsetX;
    const y = event.clientY - dragRef.current.offsetY;

    setPosition({
      x: Math.max(0, Math.min(x, maxX)),
      y: Math.max(0, Math.min(y, maxY)),
    });
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (dragRef.current.pointerId !== event.pointerId) return;

    dragRef.current.active = false;
    dragRef.current.pointerId = -1;
    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  if (!mounted) return null;

  return createPortal(
    <div
      ref={panelRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`fixed z-50 touch-none ${className} ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{
        left: position?.x ?? 0,
        top: position?.y ?? 0,
        visibility: position === null ? "hidden" : "visible",
      }}
    >
      {children}
    </div>,
    document.body
  );
}
