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
      className={`rounded-r-lg rounded-l-xl bg-game-panel-border-gradient p-0.5 ${className}`}
    >
      <div
        className={`
          flex
          items-center
          justify-center
          rounded-r-lg
          rounded-l-lg
          bg-primary/90
          font-game
          text-text-tertiary
          ${contentClassName}
        `}        
      >
        {children}
      </div>
    </div>
  );
}
