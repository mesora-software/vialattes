export default function Home() {
  return (
    <main>
      <header className="flex items-center justify-between p-4 bg-gray-100">
        <div>
          <h1 className="text-5xl font-bold">Vialattes</h1>
        </div>

        <nav className="space-x-4">
          <a href="#sobre">Sobre</a>
          <a href="#recursos">Recursos</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <section className="flex flex-col min-h-screen items-center justify-center p-4">
        <h2 className="text-3xl font-bold">Aprenda Física de uma forma diferente.</h2>

        <p className="mt-4 text-lg">
          Estude, complete missões e construa sua própria colônia.
        </p>

        <button className="mt-8 rounded-lg px-6 py-3 font-semibold bg-yellow-500 text-white hover:bg-blue-600">
          Testar gratuitamente
        </button>
      </section>

      <section id="sobre" className="flex items-center justify-between p-4 bg-gray-100">
        <h2>Sobre o Vialattes</h2>
        <p>
          Plataforma gamificada para apoio ao estudo de Física.
        </p>
      </section>
    </main>
  );
}
