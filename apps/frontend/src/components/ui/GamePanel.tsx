import type { ReactNode } from "react";

interface GamePanelProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

/**
 * GamePanel
 *
 * Reusable visual container for the Vialattes interface.
 * Provides the shared gradient border, purple background,
 * and Comic Octo typography.
 *
 * Used by HUD displays, tooltips, and informational panels.
 * Does not handle navigation or user interactions.
 */

export default function GamePanel({
  children,
  className = "",
  contentClassName = "",
}: GamePanelProps) {
  return (
    <div
      className={`rounded-r-lg rounded-l-xl p-0.5 ${className}`}
      style={{
        background:
          "radial-gradient(circle at 50% 50%, #f8f8f8, #7458a9)",
      }}
    >
      <div
        className={`
          flex
          items-center
          justify-center
          rounded-r-lg
          rounded-l-lg
          bg-[#402e6a]/90
          font-bold
          text-[#fdd501]
          ${contentClassName}
        `}
        style={{
          fontFamily: '"Comic Octo", cursive',
        }}
      >
        {children}
      </div>
    </div>
  );
}
