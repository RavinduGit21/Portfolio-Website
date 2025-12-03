import React from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import MobileApps from './components/MobileApps'
import Tools from './components/Tools'
import About from './components/About'
import Resume from './components/Resume'
import Contact from './components/Contact'
import SmoothScroll from './components/SmoothScroll'

export default function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen theme-text">
      <Nav />
      
      {/* Hero Section - Full Screen */}
      <section id="home" className="min-h-screen flex items-center justify-center">
        <Hero />
      </section>

      <main className="max-w-7xl mx-auto px-6 pb-20">
        <section id="portfolio" className="min-h-screen flex items-center py-20">
          <Portfolio />
        </section>

        <section id="mobile-apps" className="min-h-screen flex items-center py-20">
          <MobileApps />
        </section>

        <section id="tools" className="py-20">
          <Tools />
        </section>

        <section id="about" className="min-h-screen flex items-center py-20">
          <About />
        </section>

        <section id="resume" className="min-h-screen flex items-center py-20">
          <Resume />
        </section>

        <section id="contact" className="py-20">
          <Contact />
        </section>
      </main>

      <footer className="border-t border-white/5 dark:border-white/5 light:border-gray-200 py-6 text-center text-sm theme-text-muted">
        © {new Date().getFullYear()} Ravindu Shehara — Built with React + Vite + Tailwind
      </footer>
    </div>
    </SmoothScroll>
  )
}
