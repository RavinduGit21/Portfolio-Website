import React from 'react'

const testimonials = [
  { quote: 'Excellent work, reliable and fast.', name: 'Client A', title: 'CTO, Company A' },
  { quote: 'Highly recommended for backend systems.', name: 'Client B', title: 'Founder, Startup B' }
]

export default function Testimonials(){
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Testimonials</h2>
      <div className="grid sm:grid-cols-2 gap-6">
        {testimonials.map((t,i)=> (
          <div key={i} className="card p-5 rounded-lg">
            <p className="mb-3">“{t.quote}”</p>
            <div className="text-sm text-white/70">— {t.name}, <span className="text-white/60">{t.title}</span></div>
          </div>
        ))}
      </div>
    </div>
  )
}
