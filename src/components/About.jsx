import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const stats = [
  { value: '40+', label: 'Happy clients' },
  { value: '2+', label: 'Years experience' },
  { value: '50+', label: 'Projects done' }
]

export default function About(){
  const [ref, isVisible] = useScrollAnimation(0.1)

  return (
    <div className="w-full" ref={ref}>
      <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          About Me
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Get to know more about my journey, expertise, and what drives me
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {stats.map((s,i)=> (
          <div 
            key={i} 
            className={`glass-card p-8 rounded-2xl text-center hover-lift ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: isVisible ? `${0.2 + i * 0.1}s` : '0s' }}
          >
            <div className="text-5xl font-bold bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent mb-2">
              {s.value}
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wide">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className={`glass-card p-8 rounded-2xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
          <h3 className="font-semibold text-2xl mb-4 bg-gradient-to-r from-accent-light to-white bg-clip-text text-transparent">
            Mission Statement
          </h3>
          <p className="text-gray-300 leading-relaxed">
            I design reliable, fast, and future-proof architectures focused on observability and maintainability. 
            My goal is to build systems that scale seamlessly and are pleasant to operate, ensuring both 
            performance and developer experience are at their peak.
          </p>
        </div>

        <div className={`glass-card p-8 rounded-2xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <h3 className="font-semibold text-2xl mb-4 bg-gradient-to-r from-accent-light to-white bg-clip-text text-transparent">
            Contact Details
          </h3>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-center gap-3">
              <span className="text-accent-light">👤</span>
              <span><strong className="text-white">Name:</strong> Ravindu Shehara</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-accent-light">📞</span>
              <span><strong className="text-white">Phone:</strong> +94 71 451 6364</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-accent-light">✉️</span>
              <span><strong className="text-white">Email:</strong> ravindushehara1234@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-accent-light">📍</span>
              <span><strong className="text-white">Location:</strong> Gampaha</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
