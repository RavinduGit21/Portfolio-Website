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
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover-lift border border-gray-200"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <svg className="w-5 h-5 fill-current text-[#0A66C2]" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover-lift border border-gray-200"
            aria-label="GitHub"
            title="GitHub"
          >
            <svg className="w-5 h-5 fill-current text-gray-800 dark:text-white" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a
            href="https://facebook.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover-lift border border-gray-200"
            aria-label="Facebook"
            title="Facebook"
          >
            <svg className="w-5 h-5 fill-current text-[#1877F2]" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a
            href="mailto:ravindushehara1234@gmail.com"
            className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover-lift border border-gray-200"
            aria-label="Email"
            title="Email"
          >
            <svg className="w-5 h-5 fill-current text-gray-600 dark:text-gray-300" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </a>
          <a
            href="https://wa.me/94714516364"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover-lift border border-gray-200"
            aria-label="WhatsApp"
            title="WhatsApp"
          >
            <svg className="w-5 h-5 fill-current text-[#25D366]" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>
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
