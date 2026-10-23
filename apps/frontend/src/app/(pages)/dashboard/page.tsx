"use client";

import Image from "next/image";

import { usePlayerWallet } from "@/hooks/usePlayerWallet";
import { useModulePath } from "@/hooks/useModulePath";
import { useRef } from "react";

import HudValue from "@/components/ui/HudValue";
import ModuleCard from "@/components/dashboard/ModuleCard";
import DashboardAction from "@/components/dashboard/DashboardAction";
import ModulePath from "@/components/dashboard/ModulePath";
import GamePanel from "@/components/ui/GamePanel";


const modules = [
  {
    name: "Cinemática",
    moduleId: "module01-cinematica",
    image: "/images/assets/game-modules/kinematics.svg",
    stars: 4,
    position: "lg:-translate-x-[40px] lg:-translate-y-[50px]",
    mobilePosition: "-translate-x-[25%]",
  },
  {
    name: "Dinâmica",
    moduleId: "module02-dinamica",
    image: "/images/assets/game-modules/dynamic.svg",
    stars: 4,
    position: "lg:-translate-x-[60px] lg:translate-y-[180px]",
    mobilePosition: "translate-x-[25%]",
  },
  {
    name: "Energia Mecânica",
    moduleId: "module03-energia-mecanica",
    image: "/images/assets/game-modules/mechanical-energy.svg",
    stars: 4,
    position: "lg:-translate-x-[20px] lg:-translate-y-[50px]",
    mobilePosition: "-translate-x-[25%]",
  },
  {
    name: "Estática",
    moduleId: "module04-estatica",
    image: "/images/assets/game-modules/static.svg",
    stars: 4,
    position: "lg:translate-x-[10px] lg:translate-y-[190px]",
    mobilePosition: "translate-x-[25%]",
  },
  {
    name: "Termologia",
    moduleId: "module05-termologia",
    image: "/images/assets/game-modules/thermology.svg",
    stars: 4,
    position: "lg:translate-x-[40px] lg:-translate-y-[50px]",
    mobilePosition: "-translate-x-[25%]",
  },
  {
    name: "Eletromagnetismo",
    moduleId: "module06-eletromagnetismo",
    image: "/images/assets/game-modules/eletromagnetism.svg",
    stars: 4,
    position: "lg:translate-x-[40px] lg:translate-y-[180px]",
    mobilePosition: "translate-x-[25%]",
  },
];

export default function Dashboard() {
  const wallet = usePlayerWallet();

  const dashboardRef = useRef<HTMLDivElement>(null);

  const { points, dimensions } = useModulePath(dashboardRef);
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">

      {/* Background */}
      <div
        className="
          absolute
          inset-0
          z-0
          bg-cover
          bg-center
          bg-no-repeat
          opacity-[0.35]
        "
        style={{
          backgroundImage:
            "url('/images/assets/backgrounds/dashboard-bg.png')",
        }}
      />

      <div
          ref={dashboardRef}
          className="
            relative z-10
            mx-auto flex min-h-screen w-full max-w-400 flex-col
            px-4 py-5
            sm:px-6 sm:py-6
            lg:px-12 lg:py-8
            xl:px-20
          "
      >

        {/* Caminho vertical — Mobile e Tablet */}
        <div className="pointer-events-none absolute inset-0 z-0 lg:hidden">
          <ModulePath
            variant="mobile"
            points={points}
            width={dimensions.width}
            height={dimensions.height}
          />
        </div>

        {/* HEADER */}
        <header 
          className="
            relative z-10
            grid w-full grid-cols-[auto_minmax(0,1fr)_auto]
            items-start gap-2
            sm:gap-4
            lg:items-center
          "
        >

          {/* Patente */}
          <div className="w-18 shrink-0 select-none sm:w-19 md:w-20 lg:w-23 lg:-translate-4">
            <Image
              src="/images/assets/patents/recruit.svg"
              alt="Recruta"
              width={100}
              height={100}
              className="h-auto w-full object-contain"
            />
          </div>

          {/* XP + Lattecoins */}
          <div 
            className="
              flex min-w-0
              items-start justify-center
              gap-1
              sm:gap-3
              md:gap-6
              lg:gap-8 lg:-translate-y-10
            "
          >

            <HudValue
              icon="/images/assets/ui/xp.svg"
              alt="Experiência"
              value={wallet.xp}
            />

            <HudValue
              icon="/images/assets/ui/lattecoin.svg"
              alt="Lattecoins"
              value={wallet.lattecoins}
            />

          </div>
          
          {/* Login */}
          <div 
            className="
              flex w-17 shrink-0
              justify-end select-none
              sm:w-18
              md:w-20
              lg:w-21 lg:-translate-4
            "
          >
            <div className="group relative">
              <button
                type="button"
                className="cursor-pointer"
                aria-label="Login disponível em breve"
                aria-describedby="login-tooltip"
              >
                <Image
                  src="/images/assets/ui/login.svg"
                  alt="Login"
                  width={80}
                  height={80}
                  className="h-auto w-full object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </button>

              {/* Aviso de indisponibilidade */}
              <div
                id="login-tooltip"
                role="tooltip"
                className="
                  pointer-events-none
                  absolute
                  top-full
                  right-0
                  z-50
                  mt-2
                  opacity-0
                  transition-opacity
                  duration-200
                  group-hover:opacity-100
                  group-focus-within:opacity-100
                "
              >
                <GamePanel contentClassName="whitespace-nowrap px-2 py-2 font-heading text-white">
                    Login disponível em breve!
                </GamePanel>
              </div>
            </div>
          </div>

        </header>
       
        {/* MAIN */}
        <section className="flex flex-1 items-center justify-center py-12 lg:py-0">
          <div className="relative w-full">

            {/* Caminho horizontal — Desktop */}
            <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
              <ModulePath variant="desktop" />
            </div>

            {/* Módulos */}
            <div
              className="
                relative z-10
                grid grid-cols-1
                items-center justify-items-center
                gap-y-12
                py-10
                sm:gap-y-16
                lg:min-h-90
                lg:grid-cols-6
                lg:items-start
                lg:justify-items-stretch
                lg:gap-4
                lg:py-0
              "
            >
              {modules.map((module) => (
              <div
                key={module.moduleId}
                className="w-full"
              >
                {/* Posicionamento mobile */}
                <div
                  className={`
                    flex justify-center
                    lg:hidden
                    ${module.mobilePosition}
                  `}
                >
                  <div data-module-path className="w-fit">
                    <ModuleCard
                      name={module.name}
                      moduleId={module.moduleId}
                      image={module.image}
                      stars={module.stars}
                    />
                  </div>
                </div>

                {/* Posicionamento desktop */}
                <div className={`hidden lg:block ${module.position}`}>
                  <ModuleCard
                    name={module.name}
                    moduleId={module.moduleId}
                    image={module.image}
                    stars={module.stars}
                  />
                </div>
              </div>
            ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          className="
            relative z-10
            grid w-full grid-cols-2
            items-center justify-items-center
            gap-x-4 gap-y-6
            py-6 font-bold
            lg:grid-cols-4
            lg:gap-x-6
            xl:gap-x-12
            2xl:gap-x-20
          "
        >

          <DashboardAction
            name="Colônia"
            image="/images/assets/ui/colony.svg"
            href="/colonia"
          />

          <DashboardAction
            name="Quiz"
            image="/images/assets/ui/quiz.svg"
            href="/quiz"
          />

          <DashboardAction
            name="Conquistas"
            image="/images/assets/ui/rewards.svg"
            href="/conquistas"
          />

          <DashboardAction
            name="Feedback"
            image="/images/assets/ui/feedback.svg"
            href="/feedback"
          />

        </footer>

      </div>
    </main>
  );
}
