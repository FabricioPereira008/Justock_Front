type Features = {
  title: string
  text: string
  icon: string
}

const features: Features[] = [
  {
    title: "Sincronização Automática",
    text: "Sincronize o inventário entre plataformas sem esforço!",
    icon: "/reset.png",
  },
  {
    title: "Conexão com Marketplaces",
    text: "Conecte suas contas e gerencie tudo em apenas um lugar!",
    icon: "/carrinho.png",
  },
  {
    title: "Atualização em Tempo Real",
    text: "Sistema atualiza sozinho o status de pedidos!",
    icon: "/alarme.png",
  },
  {
    title: "Controle Total",
    text: "Atualizações e adições podem ser feitas também de forma manual!",
    icon: "/mao.png",
  },
  {
    title: "Suporte Ativo",
    text: "Nossa equipe está sempre pronta para melhor atendê-lo.",
    icon: "/suporte.png",
  },
]

function Features() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-5 gap-8 px-20 py-24 max-w-8xl mx-auto w-full">
      {features.map((f, index) => (
        <div key={index} className="text-center">
          <div className="flex justify-center items-center bg-green-400 w-28 h-28 mx-auto rounded-lg">
            <img src={f.icon} alt={f.title} className="w-30 h-25 mx-auto" />
          </div>
          <h3 className="text-black mt-2 font-extrabold text-[25px] font-serif">{f.title}</h3>
          <div className="border-b-5 border-blue-600 w-65 mx-auto my-2"></div>
          <p className="text-black text-base mt-2">{f.text}</p>
        </div>
      ))}
    </section>
  )
}

export default Features
