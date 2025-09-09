function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-8 py-20 bg-[#0f3d3e] text-white rounded-lg shadow-lg">
      <div className="flex flex-col justify-center max-w-xl text-left">
        <h1 className="text-6xl font-extrabold leading-tight font-manrope mb-6">
          Gestão de estoque rápida e eficaz
        </h1>
        <p className="text-green-400 font-semibold text-xl mb-8 font-manrope">
          Integre seu inventário com as maiores marketplaces do mercado
          <br />e automatize suas operações!
        </p>
        <button className="!bg-blue-600 !text-white hover:!bg-blue-700 font-bold px-8 py-4 rounded-lg w-max transition-colors">
          Comece agora o TESTE GRÁTIS!
        </button>


      </div>

      <div className="bg-blue-600 w-96 h-72 rounded-lg mt-10 md:mt-0"></div>
    </section>
  )
}

export default Hero
