function Navbar() {
  return (
    <nav className="flex justify-center items-center bg-[#f0f9ff] py-4 shadow-sm w-full">
      <div className="flex justify-between items-center w-full max-w-8xl px-16">
        <div className="flex items-center gap-6">
          <img src="/logo.png" alt="Logo JusTock" className="h-12" />
        </div>
        <ul className="flex gap-12 text-black font-semibold text-lg">
          <li><a href="#">Home</a></li>
          <li><a href="#">Novidades</a></li>
          <li><a href="#">Planos</a></li>
          <li><a href="#">Sobre</a></li>
          <li><a href="#">Contato</a></li>
          <li><a href="#">Suporte</a></li>
        </ul>
        <button className="bg-[#0f3d3e] text-white px-8 py-3">Login</button>
      </div>
    </nav>
  )
}

export default Navbar
