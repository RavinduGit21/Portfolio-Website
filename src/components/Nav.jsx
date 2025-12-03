import React from 'react'
import ThemeToggle from './ThemeToggle'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'mobile-apps', label: 'Mobile Apps' },
  { id: 'about', label: 'About Me' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' }
]

const smoothScroll = (e, targetId) => {
  e.preventDefault()
  const element = document.getElementById(targetId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

export default function Nav() {
  return (
    <header className="fixed w-full top-0 left-0 z-40 glass-card">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold bg-gradient-to-r from-accent-dark to-accent bg-clip-text text-transparent">
          Ravindu Shehara
        </div>
        <nav className="flex items-center gap-6">
          <ul className="hidden md:flex gap-8 items-center">
            {links.map(l => (
              <li key={l.id}>
                <a 
                  className="text-gray-300 dark:text-gray-300 light:text-gray-600 hover:text-accent transition-colors text-sm cursor-pointer font-medium"
                  onClick={(e) => smoothScroll(e, l.id)}
                  href={`#${l.id}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          
          <ThemeToggle />
          
          <a 
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-accent to-accent-light text-white font-medium text-sm hover:shadow-lg hover:shadow-accent/30 transition-all cursor-pointer flex items-center gap-2"
            onClick={(e) => smoothScroll(e, 'contact')}
            href="#contact"
          >
            Let's Talk 💬
          </a>

          <button className="md:hidden p-2 rounded-lg glass-card">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  )
}
