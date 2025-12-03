import React, { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const mobileApps = [
  {
    id: 1,
    title: 'LankaReads',
    description: 'Modern Android app for the Sri Lankan reading community with beautiful Glassmorphism UI. Browse, add, and organize books with ISBN tracking.',
    tech: 'Kotlin, Jetpack Compose, Room Database, MVVM, Material3',
    videoUrl: import.meta.env.BASE_URL + 'videos/LankaReads.mp4',
    features: [
      'Glassmorphism Design UI',
      'Book Library Management',
      'ISBN Search & Filter',
      'Admin & Personal Library',
    ],
  },
  {
    id: 2,
    title: 'Split Smart',
    description: 'Smart expense splitting app built with Kotlin and Jetpack Compose. Track shared expenses, split bills easily, and manage group payments.',
    tech: 'Kotlin, Jetpack Compose, Room Database, Material3',
    videoUrl: import.meta.env.BASE_URL + 'videos/Split-Smart.mp4',
    features: [
      'Smart expense tracking',
      'Group bill splitting',
      'Real-time calculations',
      'Modern Material Design 3',
    ],
  },
]

export default function MobileApps() {
  const [ref, isVisible] = useScrollAnimation(0.1)

  return (
    <div className="w-full" ref={ref}>
      <div className={`text-center mb-8 md:mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 theme-text">
          Mobile Applications
        </h2>
        <p className="theme-text-muted max-w-2xl mx-auto text-sm md:text-base px-4">
          Native Android apps built with modern technologies - Experience them live!
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
        {mobileApps.map((app, i) => (
          <div
            key={app.id}
            className={`glass-card p-4 md:p-5 rounded-2xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: isVisible ? `${i * 0.1}s` : '0s' }}
          >
            {/* Phone Mockup with Preview */}
            <div className="relative mx-auto mb-3 md:mb-4" style={{ maxWidth: '240px' }}>
              {/* Phone Frame */}
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-[2rem] md:rounded-[2.5rem] p-2 md:p-2.5 shadow-2xl">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 md:w-28 h-5 md:h-6 bg-gray-900 rounded-b-xl z-10"></div>
                
                {/* Screen */}
                <div className="relative bg-black rounded-[1.7rem] md:rounded-[2.2rem] overflow-hidden" style={{ aspectRatio: '9/19.5' }}>
                  {app.videoUrl ? (
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={app.videoUrl} type="video/mp4" />
                    </video>
                  ) : app.appetizeUrl ? (
                    <iframe
                      src={`${app.appetizeUrl}?device=pixel7&scale=100&autoplay=true&orientation=portrait&deviceColor=black`}
                      className="w-full h-full"
                      scrolling="no"
                      allow="camera; microphone; geolocation; clipboard-write"
                      title={`${app.title} Preview`}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-accent/30"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 md:w-28 h-1 bg-white/30 rounded-full"></div>
              </div>
            </div>

            {/* App Details */}
            <div className="text-center">
              <h3 className="text-lg md:text-xl font-bold mb-1.5 md:mb-2 theme-text">
                {app.title}
              </h3>
              <p className="theme-text-muted mb-2 md:mb-3 text-xs md:text-sm leading-snug">
                {app.description}
              </p>

              <div className="mb-2 md:mb-3">
                <h4 className="text-xs font-semibold theme-text mb-1.5 uppercase tracking-wider">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {app.tech.split(', ').map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold theme-text mb-1.5 uppercase tracking-wider">
                  Key Features
                </h4>
                <ul className="space-y-0.5 text-xs md:text-sm">
                  {app.features.map((feature, idx) => (
                    <li key={idx} className="theme-text-muted flex items-center justify-center gap-1.5 md:gap-2">
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4 text-accent flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
