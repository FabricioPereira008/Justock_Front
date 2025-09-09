import Navbar from "./components/Navbar.tsx"
import Hero from "./components/Hero.tsx"
import Features from "./components/Feature.tsx"
import Footer from "./components/Footer.tsx"

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  )
}

export default App
