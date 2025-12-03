import React, { useEffect, useState } from 'react'
import portrait from '../../assets/person.png'

const smoothScroll = (e, targetId) => {
  e.preventDefault()
  const element = document.getElementById(targetId)
  if (element) {
    const targetPosition = element.offsetTop - 80
    window.scrollTarget = targetPosition
  }
}

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollRotation, setScrollRotation] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    
    let scrollTimeout
    let lastScrollY = window.scrollY
    
    const handleScroll = () => {
      setIsScrolling(true)
      
      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - lastScrollY
      
      // Rotate based on scroll direction
      setScrollRotation(prev => prev + scrollDelta * 0.5)
      
      lastScrollY = currentScrollY
      
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('wheel', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return (
    <div className="w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-[400px_1fr] gap-8 items-center">
      {/* Left Sidebar - Glass Card */}
      <div className={`glass-sidebar rounded-3xl p-8 ${isVisible ? 'animate-fade-in-up stagger-1' : ''}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-light to-accent p-0.5">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-2xl">
              🐱
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg theme-text">Ravindu</h3>
            <p className="text-sm theme-text-muted">Shehara</p>
          </div>
        </div>

        {/* Portrait */}
        <div className="mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200">
          <img src={portrait} alt="Ravindu Shehara" className="w-full h-auto object-cover" />
        </div>

        {/* Social Links */}
        <div className="flex gap-3 mb-6">
          {[
            { icon: '💼', label: 'LinkedIn', url: '#' },
            { icon: '🐙', label: 'GitHub', url: '#' },
            { icon: '📧', label: 'Email', url: '#' },
            { icon: '💬', label: 'WhatsApp', url: '#' },
            { icon: '🔗', label: 'Portfolio', url: '#' }
          ].map((social, i) => (
            <a
              key={i}
              href={social.url}
              className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover-lift text-lg border border-gray-200"
              aria-label={social.label}
              title={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a
          onClick={(e) => smoothScroll(e, 'contact')}
          href="#contact"
          className="w-full py-3 rounded-full bg-gradient-to-r from-accent to-accent-light text-white font-medium text-center block hover:shadow-lg hover:shadow-accent/30 transition-all cursor-pointer"
        >
          Let's Work Together!
        </a>
      </div>

      {/* Right Content - Main Hero */}
      <div className="flex flex-col justify-center">
        <div className={`inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 w-fit border border-gray-200 dark:border-white/10 ${isVisible ? 'animate-fade-in-up stagger-2' : ''}`}>
          <span className="text-sm theme-text-secondary">✨ Let's meet!</span>
        </div>

        <h1 className={`text-5xl md:text-7xl font-bold mb-4 ${isVisible ? 'animate-fade-in-up stagger-3' : ''}`}>
          <span className="theme-text">I'm </span>
          <span className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">Ravindu Shehara</span>
        </h1>

        <h2 className={`text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent ${isVisible ? 'animate-fade-in-up stagger-4' : ''}`}>
          Backend Developer<br />& API Architect.
        </h2>

        <div className="flex gap-4 mb-8">
          <a
            onClick={(e) => smoothScroll(e, 'portfolio')}
            href="#portfolio"
            className="px-8 py-3 rounded-full border border-gray-300 dark:border-white/20 glass-card font-medium hover-lift inline-flex items-center gap-2 cursor-pointer theme-text-secondary"
          >
            My Works 🎨
          </a>
          <a
            href="/assets/resume.pdf"
            download
            className="px-8 py-3 rounded-full border border-gray-300 dark:border-white/20 glass-card font-medium hover-lift inline-flex items-center gap-2 theme-text-secondary"
          >
            Download CV 📥
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="flex items-center gap-3 mt-12">
          <div className="relative">
            <div 
              className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 dark:border-white/20 flex items-center justify-center transition-transform duration-100"
              style={{ transform: `rotate(${scrollRotation}deg)` }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <path
                    id="circlePath"
                    d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[8px] fill-gray-500 dark:fill-gray-400 uppercase tracking-wider" fontWeight="500">
                    <textPath href="#circlePath" startOffset="0%">
                      SCROLL FOR MORE • SCROLL FOR MORE •
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-3xl theme-text-secondary transition-transform duration-300 ${isScrolling ? 'animate-bounce' : ''}`}>↓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
