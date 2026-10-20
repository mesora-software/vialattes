import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

interface AnimatedUnderlineLinkProps
  extends Omit<ComponentProps<typeof Link>, "children"> {
  children: ReactNode;
  className?: string;
  underlineClassName?: string;
}

/**
 * AnimatedUnderlineLink
 *
 * Reusable navigation link with an animated underline.
 *
 * Supports custom typography, colors, spacing, and
 * underline styling while preserving shared animation behavior.
 */

export default function AnimatedUnderlineLink({
  children,
  className = "",
  underlineClassName = "",
  ...props
}: AnimatedUnderlineLinkProps) {
  return (
    <Link
      {...props}
      className={`animated-underline-link relative inline-flex items-center ${className}`}
    >
      {children}

      <span
        aria-hidden="true"
        className={`animated-underline ${underlineClassName}`}
      />
    </Link>
  );
}
