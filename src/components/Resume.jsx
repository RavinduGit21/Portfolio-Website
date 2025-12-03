import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Resume(){
  const [ref, isVisible] = useScrollAnimation(0.1)

  return (
    <div className="w-full" ref={ref}>
      <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h2 className="text-5xl md:text-6xl font-bold mb-6 theme-text">
          Education & Experience
        </h2>
        <p className="theme-text-secondary max-w-3xl mx-auto text-lg">
          My academic background and practical experience journey
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Education */}
        <div className={`glass-card p-10 rounded-3xl hover-lift border border-white/5 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
            <h3 className="font-bold text-3xl bg-gradient-to-r from-accent-light to-white bg-clip-text text-transparent">
              Education
            </h3>
          </div>
          
          <div className="space-y-8">
            <div className="border-l-4 border-accent/40 pl-8 relative">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent ring-4 ring-accent/20"></div>
              <div className="text-base text-accent-light mb-2 font-semibold">2023 - 2027</div>
              <h4 className="font-bold text-xl mb-2 theme-text">
                Bachelor of Information Technology
              </h4>
              <p className="theme-text text-base mb-3 font-medium">
                University of Colombo School of Computing (UCSC) - External
              </p>
              <p className="theme-text-secondary text-base leading-relaxed">
                Specializing in software engineering, database systems, and web technologies
              </p>
            </div>

            <div className="border-l-4 border-accent/30 pl-8 relative">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent/70 ring-4 ring-accent/10"></div>
              <div className="text-base text-accent-light mb-2 font-semibold">2022 (2023)</div>
              <h4 className="font-bold text-xl mb-2 theme-text">
                G.C.E. Advanced Level Examination
              </h4>
              <p className="theme-text text-base mb-3 font-medium">
                Technology Stream
              </p>
              <p className="theme-text-secondary text-base leading-relaxed">
                Foundation in engineering technology and computer science principles
              </p>
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className={`glass-card p-10 rounded-3xl hover-lift border border-white/5 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-3xl bg-gradient-to-r from-accent-light to-white bg-clip-text text-transparent">
              Experience
            </h3>
          </div>
          
          <div className="space-y-8">
            <div className="border-l-4 border-accent/40 pl-8 relative">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent ring-4 ring-accent/20"></div>
              <div className="text-base text-accent-light mb-2 font-semibold">2023 - Present</div>
              <h4 className="font-bold text-xl mb-2 theme-text">
                Backend Developer
              </h4>
              <p className="theme-text text-base mb-4 font-medium">Freelance & Contract Work</p>
              <ul className="space-y-3 text-base theme-text-secondary">
                <li className="flex gap-3">
                  <span className="text-accent-light font-bold mt-1">▸</span>
                  <span>Designed and implemented RESTful APIs for multiple clients</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-light font-bold mt-1">▸</span>
                  <span>Built scalable backend architectures using Node.js and .NET</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-light font-bold mt-1">▸</span>
                  <span>Integrated third-party services and payment gateways</span>
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-accent/30 pl-8 relative">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent/70 ring-4 ring-accent/10"></div>
              <div className="text-base text-accent-light mb-2 font-semibold">2021 - 2023</div>
              <h4 className="font-bold text-xl mb-2 theme-text">
                Full-stack Developer
              </h4>
              <p className="theme-text text-base mb-4 font-medium">Various Projects</p>
              <ul className="space-y-3 text-base theme-text-secondary">
                <li className="flex gap-3">
                  <span className="text-accent-light font-bold mt-1">▸</span>
                  <span>Developed web applications using React and Node.js</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent-light font-bold mt-1">▸</span>
                  <span>Managed databases and optimized query performance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
