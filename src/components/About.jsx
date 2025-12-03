import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const stats = [
  { value: '40+', label: 'Happy clients' },
  { value: '2+', label: 'Years experience' },
  { value: '50+', label: 'Projects done' }
]

const tools = [
  { 
    name: 'React',
    iconDark: '/icons/React-Dark.svg',
    iconLight: '/icons/React-Light.svg'
  },
  { 
    name: 'Node.JS',
    iconDark: '/icons/NodeJS-Dark.svg',
    iconLight: '/icons/NodeJS-Light.svg'
  },
  { 
    name: '.NET',
    iconDark: '/icons/DotNet.svg',
    iconLight: '/icons/DotNet.svg'
  },
  { 
    name: 'Php',
    iconDark: '/icons/PHP-Dark.svg',
    iconLight: '/icons/PHP-Light.svg'
  },
  { 
    name: 'MySQL',
    iconDark: '/icons/MySQL-Dark.svg',
    iconLight: '/icons/MySQL-Light.svg'
  },
  { 
    name: 'MongoDB',
    iconDark: '/icons/MongoDB.svg',
    iconLight: '/icons/MongoDB.svg'
  },
  { 
    name: 'Tailwind',
    iconDark: '/icons/TailwindCSS-Dark.svg',
    iconLight: '/icons/TailwindCSS-Light.svg'
  },
  { 
    name: 'Notion',
    iconDark: '/icons/Notion-Dark.svg',
    iconLight: '/icons/Notion-Light.svg'
  }
]

export default function About(){
  const [ref, isVisible] = useScrollAnimation(0.1)

  return (
    <div className="w-full" ref={ref}>
      <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h2 className="text-5xl md:text-6xl font-bold mb-6 theme-text">
          About Me
        </h2>
        <p className="theme-text-secondary max-w-3xl mx-auto text-lg">
          Get to know more about my journey, expertise, and what drives me
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {stats.map((s,i)=> (
          <div 
            key={i} 
            className={`glass-card p-10 rounded-3xl text-center hover-lift border border-white/5 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: isVisible ? `${0.2 + i * 0.1}s` : '0s' }}
          >
            <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent mb-4">
              {s.value}
            </div>
            <div className="text-base theme-text-secondary uppercase tracking-wider font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        <div className={`glass-card p-10 rounded-3xl border border-white/5 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
          <h3 className="font-bold text-3xl mb-6 bg-gradient-to-r from-accent-light to-white bg-clip-text text-transparent">
            Mission Statement
          </h3>
          <p className="theme-text leading-relaxed text-lg">
            I design reliable, fast, and future-proof architectures focused on observability and maintainability. 
            My goal is to build systems that scale seamlessly and are pleasant to operate, ensuring both 
            performance and developer experience are at their peak.
          </p>
        </div>

        <div className={`glass-card p-10 rounded-3xl border border-white/5 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <h3 className="font-bold text-3xl mb-6 bg-gradient-to-r from-accent-light to-white bg-clip-text text-transparent">
            Contact Details
          </h3>
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-accent-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <div className="text-sm theme-text-muted mb-1">Name</div>
                <div className="theme-text font-medium">Ravindu Shehara</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-accent-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="text-sm theme-text-muted mb-1">Phone</div>
                <div className="theme-text font-medium">+94 71 451 6364</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-accent-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-sm theme-text-muted mb-1">Email</div>
                <div className="theme-text font-medium">ravindushehara1234@gmail.com</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-accent-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="text-sm theme-text-muted mb-1">Location</div>
                <div className="theme-text font-medium">Gampaha</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* My Favourite Tools Section */}
      <div>
        <h2 className={`text-4xl md:text-5xl font-bold mb-12 theme-text text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.7s' }}>
          My favourite tools
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {tools.map((tool, i) => (
            <div 
              key={i}
              className={`glass-card p-8 rounded-3xl flex flex-col items-center justify-center gap-5 hover-lift border border-white/5 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: isVisible ? `${0.8 + i * 0.1}s` : '0s' }}
            >
              <div className="flex items-center justify-center">
                <img 
                  src={tool.iconLight} 
                  alt={tool.name} 
                  className="w-20 h-20 light-mode-icon" 
                />
                <img 
                  src={tool.iconDark} 
                  alt={tool.name} 
                  className="w-20 h-20 dark-mode-icon" 
                />
              </div>
              <span className="theme-text font-semibold text-lg">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
