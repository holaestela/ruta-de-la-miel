function App() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <section className="bg-white p-10 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-bold text-amber-600">
          Ruta de la Miel
        </h1>

        <p className="mt-4 text-gray-600">
          Sistema de gestión y monitoreo apícola
        </p>

        <button
          type="button"
          className="mt-6 rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white hover:bg-amber-600"
        >
          Iniciar sistema
        </button>
      </section>
    </main>
  );
}

export default App;