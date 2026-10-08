import Image from "next/image";

import HudValue from "@/components/dashboard/HudValue";
import ModuleCard from "@/components/dashboard/ModuleCard";
import DashboardAction from "@/components/dashboard/DashboardAction";
import ModulePath from "@/components/dashboard/ModulePath";

const player = {
  xp: 0,
  lattecoins: 0,
};

const modules = [
  {
    name: "Cinemática",
    moduleId: "module01-cinematica",
    image: "/images/assets/game-modules/kinematics.svg",
    stars: 4,
    position: "-translate-x-[50px] -translate-y-[30px]",
  },
  {
    name: "Dinâmica",
    moduleId: "module02-dinamica",
    image: "/images/assets/game-modules/dynamic.svg",
    stars: 4,
    position: "-translate-x-[60px] translate-y-[200px]",
  },
  {
    name: "Energia Mecânica",
    moduleId: "module03-energia-mecanica",
    image: "/images/assets/game-modules/mechanical-energy.svg",
    stars: 4,
    position: "-translate-x-[30px] -translate-y-[40px]",
  },
  {
    name: "Estática",
    moduleId: "module04-estatica",
    image: "/images/assets/game-modules/static.svg",
    stars: 4,
    position: "translate-x-[10px] translate-y-[210px]",
  },
  {
    name: "Termologia",
    moduleId: "module05-termologia",
    image: "/images/assets/game-modules/thermology.svg",
    stars: 4,
    position: "translate-x-[40px] -translate-y-[30px]",
  },
  {
    name: "Eletromagnetismo",
    moduleId: "module06-eletromagnetismo",
    image: "/images/assets/game-modules/eletromagnetism.svg",
    stars: 4,
    position: "translate-x-[40px] translate-y-[200px]",
  },
];

export default function Dashboard() {
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

      <div className="relative z-10 mx-20 my-8 flex min-h-[calc(100vh-64px)] flex-col">

        {/* HEADER */}
        <header className="flex items-center">

          {/* Patente */}
          <div className="w-30 shrink-0 -translate-4">
            <Image
              src="/images/assets/patents/recruit.svg"
              alt="Recruta"
              width={90}
              height={90}
              className="object-contain"
            />
          </div>

          {/* XP + Lattecoins */}
          <div className="flex flex-1 justify-center gap-8 -translate-y-10">

            <HudValue
              icon="/images/assets/ui/xp.svg"
              value={player.xp}
              alt="Experiência"
            />

            <HudValue
              icon="/images/assets/ui/lattecoin.svg"
              value={player.lattecoins}
              alt="Lattecoins"
            />

          </div>

          {/* Login */}
          <div className="flex w-25 shrink-0 justify-end -translate-4">
            <button type="button">
              <Image
                src="/images/assets/ui/login.svg"
                alt="Login"
                width={80}
                height={80}
                className="object-contain transition-transform duration-200 hover:scale-105"
              />
            </button>
          </div>

        </header>

        
        {/* MAIN */}
        <section className="flex flex-1 items-center justify-center">

          <div className="relative w-full">

            {/* Caminho pontilhado */}
            <div className="pointer-events-none absolute inset-0 z-0">
              <ModulePath />
            </div>

            {/* Módulos */}
            <div className="relative z-10 grid min-h-90 grid-cols-6 items-start gap-4">

              {modules.map((module) => (
                <div
                  key={module.moduleId}
                  className={module.position}
                >
                  <ModuleCard
                    name={module.name}
                    moduleId={module.moduleId}
                    image={module.image}
                    stars={module.stars}
                  />
                </div>
              ))}

            </div>

          </div>

        </section>

        {/* FOOTER */}
        <footer className="flex items-center justify-center font-bold gap-50">

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
