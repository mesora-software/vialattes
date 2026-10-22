"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import AnimatedUnderlineLink from "@/components/ui/AnimatedUnderlineLink";

const navigation = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "#sobre" },
  { label: "Recursos", href: "#recursos" },
];

export default function HomeHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Permite fechar o menu utilizando Escape.
  useEffect(() => {
    if (!isMenuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header
      className="
        relative z-20
        w-full
        border-b border-secondary/50
        bg-blue-gradient
        backdrop-blur-xs
      "
    >
      <div
        className="
          mx-auto flex
          h-20 w-full max-w-350
          items-center justify-between
          gap-2 px-6
          sm:h-24 sm:gap-4 sm:px-8
          md:h-30 md:px-12
        "
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Página inicial do Vialattes"
          onClick={closeMenu}
          className="
            relative flex
            h-14 w-30
            shrink-0 items-center
            sm:h-18 sm:w-38
            md:h-22 md:w-48
            lg:w-70
          "
        >
          <Image
            src="/images/home/vialattes-logo.svg"
            alt="Vialattes"
            fill
            priority
            sizes="(max-width: 639px) 120px, (max-width: 767px) 152px, (max-width: 1023px) 192px, 280px"
            className="object-contain object-left"
          />
        </Link>

        {/* Navegação desktop */}
        <nav
          aria-label="Navegação principal"
          className="
            hidden items-center
            gap-3 whitespace-nowrap
            text-sm
            md:flex
            lg:gap-8 lg:text-base
          "
        >
          {navigation.map((item) => (
            <AnimatedUnderlineLink
              key={item.href}
              href={item.href}
              className="inline-flex"
            >
              {item.label}
            </AnimatedUnderlineLink>
          ))}

          <Link
            href="/dashboard"
            className="
              inline-flex shrink-0
              items-center justify-center
              gap-1 rounded-full
              border border-border-accent
              bg-purple-gradient
              px-4 py-2.5
              text-sm font-bold
              shadow-lg shadow-purple-950/50
              transition-transform
              hover:scale-105
              lg:px-6 lg:py-3 lg:text-base
            "
          >
            Acessar Dashboard
            <span aria-hidden="true">→</span>
          </Link>
        </nav>

        {/* Botão hambúrguer */}
        <button
          type="button"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          aria-controls="home-mobile-navigation"
          onClick={() => setIsMenuOpen((previous) => !previous)}
          className="
            inline-flex size-11
            items-center justify-center
            rounded-xl
            border border-border-accent/70
            bg-primary-dark/80
            text-text-primary
            transition-colors
            hover:bg-primary
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-tertiary
            md:hidden
          "
        >
          {isMenuOpen ? (
            <X size={26} aria-hidden="true" />
          ) : (
            <Menu size={26} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Navegação mobile */}
      <nav
        id="home-mobile-navigation"
        aria-label="Navegação mobile"
        inert={!isMenuOpen}
        className={`
          absolute top-full right-0 left-0
          overflow-hidden
          border-b border-border-accent/50
          bg-surface-dark/95
          shadow-xl shadow-black/40
          backdrop-blur-md
          transition-[opacity,transform,visibility]
          duration-200 ease-out
          md:hidden
          ${
            isMenuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }
        `}
      >
        <div className="mx-auto flex w-full max-w-350 flex-col gap-2 px-6 py-5 sm:px-8">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="
                rounded-lg px-4 py-3
                font-heading text-base
                text-text-primary
                transition-colors
                hover:bg-primary/40
                focus-visible:outline-2
                focus-visible:outline-tertiary
              "
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/dashboard"
            onClick={closeMenu}
            className="
              mt-3 flex
              items-center justify-center
              gap-2 rounded-full
              border border-border-accent
              bg-purple-gradient
              px-5 py-3
              text-sm font-bold
              text-text-primary
              shadow-lg shadow-purple-950/50
              transition-transform
              hover:scale-[1.02]
              focus-visible:outline-2
              focus-visible:outline-tertiary
            "
          >
            Acessar Dashboard
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
