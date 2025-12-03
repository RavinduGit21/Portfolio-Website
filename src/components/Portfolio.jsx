import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const projects = [
  {
    title: 'Ceylon Journeys',
    tech: 'React, TypeScript, Vite, Tailwind CSS, shadcn-ui',
    desc: 'Discover Sri Lanka with a modern SPA showcasing destinations, tours, hotels, and a Plan Your Trip tool',
    img: import.meta.env.BASE_URL + 'ceylonjourneys.png',
    link: 'https://ceylon-journies.vercel.app/'
  },
  {
    title: 'Gentry Cut Saloon',
    tech: 'React, TypeScript, shadcn-ui, Vite',
    desc: 'Modern web application built with React and TypeScript, featuring shadcn-ui components',
    img: import.meta.env.BASE_URL + 'gentrycut.png',
    link: 'https://gentry-cut-saloon.vercel.app/'
  },
  {
    title: 'Westnahira Cellularz',
    tech: 'React, TypeScript, Node.js, Express, MongoDB',
    desc: 'Full-stack e-commerce platform with product management, shopping cart, and secure authentication',
    img: import.meta.env.BASE_URL + 'westnahira.png',
    link: 'https://westnahira-cellularz.vercel.app/'
  }
]

export default function Portfolio(){
  const [ref, isVisible] = useScrollAnimation(0.1)

  return (
    <div className="w-full" ref={ref}>
      <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h2 className="text-5xl md:text-6xl font-bold mb-6 theme-text">
          Featured Projects
        </h2>
        <p className="theme-text-muted max-w-3xl mx-auto text-lg">
          A showcase of my recent work in backend development, API architecture, and full-stack applications
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
        {projects.map((p,i)=> (
          <article 
            key={i} 
            className={`glass-card rounded-3xl overflow-hidden hover-lift group ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: isVisible ? `${i * 0.15}s` : '0s' }}
          >
            <div className="relative overflow-hidden h-72">
              <img 
                src={p.img} 
                alt={p.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>
            <div className="p-8">
              <h3 className="font-bold text-2xl mb-3 theme-text">
                {p.title}
              </h3>
              <p className="text-base theme-text-muted mb-5 leading-relaxed">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {p.tech.split(', ').map((tech, idx) => (
                  <span key={idx} className="text-xs px-3 py-1.5 rounded-full bg-accent/10 text-accent-light border border-accent/30 font-medium">
                    {tech}
                  </span>
                ))}
              </div>
              {p.link && p.link !== '#' && (
                <a 
                  href={p.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-base font-semibold text-accent hover:text-accent-light transition-colors group/link"
                >
                  View Project
                  <svg className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
