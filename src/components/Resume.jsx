import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Resume(){
  const [ref, isVisible] = useScrollAnimation(0.1)

  return (
    <div className="w-full" ref={ref}>
      <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Education & Experience
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          My academic background and practical experience journey
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Education */}
        <div className={`glass-card p-8 rounded-2xl hover-lift ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-2xl">
              🎓
            </div>
            <h3 className="font-semibold text-2xl bg-gradient-to-r from-accent-light to-white bg-clip-text text-transparent">
              Education
            </h3>
          </div>
          
          <div className="space-y-6">
            <div className="border-l-2 border-accent/30 pl-6 relative">
              <div className="absolute -left-2 top-0 w-3 h-3 rounded-full bg-accent"></div>
              <div className="text-sm text-accent-light mb-1">2023 - 2027</div>
              <h4 className="font-semibold text-lg mb-1 text-white">
                Bachelor of Information Technology
              </h4>
              <p className="text-gray-400 text-sm mb-2">
                University of Colombo School of Computing (UCSC) - External
              </p>
              <p className="text-gray-500 text-sm">
                Specializing in software engineering, database systems, and web technologies
              </p>
            </div>

            <div className="border-l-2 border-accent/30 pl-6 relative">
              <div className="absolute -left-2 top-0 w-3 h-3 rounded-full bg-accent/60"></div>
              <div className="text-sm text-accent-light mb-1">2022 (2023)</div>
              <h4 className="font-semibold text-lg mb-1 text-white">
                G.C.E. Advanced Level Examination
              </h4>
              <p className="text-gray-400 text-sm mb-2">
                Technology Stream
              </p>
              <p className="text-gray-500 text-sm">
                Foundation in engineering technology and computer science principles
              </p>
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className={`glass-card p-8 rounded-2xl hover-lift ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-2xl">
              💼
            </div>
            <h3 className="font-semibold text-2xl bg-gradient-to-r from-accent-light to-white bg-clip-text text-transparent">
              Experience
            </h3>
          </div>
          
          <div className="space-y-6">
            <div className="border-l-2 border-accent/30 pl-6 relative">
              <div className="absolute -left-2 top-0 w-3 h-3 rounded-full bg-accent"></div>
              <div className="text-sm text-accent-light mb-1">2023 - Present</div>
              <h4 className="font-semibold text-lg mb-1 text-white">
                Backend Developer
              </h4>
              <p className="text-gray-400 text-sm mb-3">Freelance & Contract Work</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex gap-2">
                  <span className="text-accent">▸</span>
                  Designed and implemented RESTful APIs for multiple clients
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">▸</span>
                  Built scalable backend architectures using Node.js and .NET
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">▸</span>
                  Integrated third-party services and payment gateways
                </li>
              </ul>
            </div>

            <div className="border-l-2 border-accent/30 pl-6 relative">
              <div className="absolute -left-2 top-0 w-3 h-3 rounded-full bg-accent/60"></div>
              <div className="text-sm text-accent-light mb-1">2021 - 2023</div>
              <h4 className="font-semibold text-lg mb-1 text-white">
                Full-stack Developer
              </h4>
              <p className="text-gray-400 text-sm mb-3">Various Projects</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex gap-2">
                  <span className="text-accent">▸</span>
                  Developed web applications using React and Node.js
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">▸</span>
                  Managed databases and optimized query performance
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
