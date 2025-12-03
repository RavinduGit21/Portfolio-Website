import React from 'react'

const services = [
  { title: 'Backend Development', desc: 'API Design, Database Management, Microservices' },
  { title: 'Full-stack Integration', desc: 'Frontend + Backend cohesion and architectures' },
  { title: 'DevOps & Security', desc: 'CI/CD, Authentication, Infrastructure as Code' },
  { title: 'Performance & Observability', desc: 'Profiling, metrics, logging, tracing' }
]

export default function Services(){
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Services</h2>
      <div className="grid sm:grid-cols-2 gap-6">
        {services.map((s,i)=> (
          <div key={i} className="card p-5 rounded-lg">
            <h3 className="font-semibold mb-2">{s.title}</h3>
            <p className="text-white/80">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
