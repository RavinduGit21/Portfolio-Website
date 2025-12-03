import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import ceylonjourneysImg from '../assets/ceylonjourneys.png'
import gentrycutImg from '../assets/gentrycut.png'
import westnahiraImg from '../assets/westnahira.png'

const projects = [
  {
    title: 'Ceylon Journeys',
    tech: 'React, TypeScript, Vite, Tailwind CSS, shadcn-ui',
    desc: 'Discover Sri Lanka with a modern SPA showcasing destinations, tours, hotels, and a Plan Your Trip tool',
    img: ceylonjourneysImg,
    link: 'https://ceylon-journies.vercel.app/'
  },
  {
    title: 'Gentry Cut Saloon',
    tech: 'React, TypeScript, shadcn-ui, Vite',
    desc: 'Modern web application built with React and TypeScript, featuring shadcn-ui components',
    img: gentrycutImg,
    link: 'https://gentry-cut-saloon.vercel.app/'
  },
  {
    title: 'Westnahira Cellularz',
    tech: 'React, TypeScript, Node.js, Express, MongoDB',
    desc: 'Full-stack e-commerce platform with product management, shopping cart, and secure authentication',
    img: westnahiraImg,
    link: 'https://westnahira-cellularz.vercel.app/'
  }
]

export default function Portfolio(){
  const [ref, isVisible] = useScrollAnimation(0.1)

  return (
    <div className="w-full" ref={ref}>
      <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 theme-text">
          Featured Projects
        </h2>
        <p className="theme-text-muted max-w-2xl mx-auto">
          A showcase of my recent work in backend development, API architecture, and full-stack applications
        </p>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p,i)=> (
          <article 
            key={i} 
            className={`glass-card rounded-2xl overflow-hidden hover-lift group ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: isVisible ? `${i * 0.1}s` : '0s' }}
          >
            <div className="relative overflow-hidden h-48">
              <img 
                src={p.img} 
                alt={p.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-xl mb-2 theme-text">
                {p.title}
              </h3>
              <p className="text-sm theme-text-muted mb-3">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tech.split(', ').map((tech, idx) => (
                  <span key={idx} className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                    {tech}
                  </span>
                ))}
              </div>
              {p.link && p.link !== '#' && (
                <a 
                  href={p.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-light transition-colors"
                >
                  View Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
