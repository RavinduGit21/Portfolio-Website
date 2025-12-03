import React, { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Contact(){
  const [form, setForm] = useState({name:'',email:'',subject:'',message:''})
  const [ref, isVisible] = useScrollAnimation(0.1)

  function update(e){
    setForm(prev=> ({...prev, [e.target.name]: e.target.value}))
  }

  function submit(e){
    e.preventDefault()
    const mailto = `mailto:ravindu@example.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(form.message + '\n\nFrom: ' + form.name + ' <' + form.email + '>')}`
    window.location.href = mailto
  }

  return (
    <div className="w-full max-w-6xl mx-auto" ref={ref}>
      <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h2 className="text-5xl md:text-6xl font-bold mb-6 theme-text">
          Let's Work Together
        </h2>
        <p className="theme-text-secondary max-w-3xl mx-auto text-lg">
          Have a project in mind? Drop me a message and let's create something amazing
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-10">
        <form onSubmit={submit} className={`space-y-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <div>
            <input 
              name="name" 
              onChange={update} 
              placeholder="Your Name" 
              className="w-full p-5 rounded-2xl glass-card theme-text placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-lg border border-white/5" 
              required 
            />
          </div>
          
          <div>
            <input 
              name="email" 
              onChange={update} 
              placeholder="Your Email" 
              type="email" 
              className="w-full p-5 rounded-2xl glass-card theme-text placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-lg border border-white/5" 
              required 
            />
          </div>
          
          <div>
            <input 
              name="subject" 
              onChange={update} 
              placeholder="Subject" 
              className="w-full p-5 rounded-2xl glass-card theme-text placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-lg border border-white/5" 
            />
          </div>
          
          <div>
            <textarea 
              name="message" 
              onChange={update} 
              placeholder="Your Message" 
              className="w-full p-5 rounded-2xl glass-card theme-text placeholder-gray-500 h-48 resize-none focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-lg border border-white/5" 
              required 
            />
          </div>
          
          <button 
            type="submit"
            className="w-full py-5 bg-gradient-to-r from-accent to-accent-light text-white rounded-2xl font-semibold text-lg hover:shadow-lg hover:shadow-accent/50 transition-all"
          >
            Send Message 📩
          </button>
        </form>

        <div className={`glass-card p-10 rounded-3xl h-fit border border-white/5 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          <h3 className="font-bold text-3xl mb-8 bg-gradient-to-r from-accent-light to-white bg-clip-text text-transparent">
            Contact Information
          </h3>
          <div className="space-y-6">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-2xl flex-shrink-0">
                ✉️
              </div>
              <div>
                <div className="text-base theme-text-muted mb-2">Email</div>
                <a href="mailto:ravindu@example.com" className="theme-text hover:text-accent-light transition-colors text-lg font-medium">
                  ravindu@example.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-2xl flex-shrink-0">
                📞
              </div>
              <div>
                <div className="text-base theme-text-muted mb-2">Phone</div>
                <a href="tel:+94770000000" className="theme-text hover:text-accent-light transition-colors text-lg font-medium">
                  +94 77 000 0000
                </a>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-2xl flex-shrink-0">
                📍
              </div>
              <div>
                <div className="text-base theme-text-muted mb-2">Location</div>
                <p className="theme-text text-lg font-medium">Sri Lanka</p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5">
              <div className="text-base theme-text-muted mb-4">Follow me on</div>
              <div className="flex gap-3">
                {['GitHub', 'LinkedIn', 'Twitter', 'Instagram'].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-12 h-12 rounded-xl glass-card flex items-center justify-center hover-lift text-base font-semibold border border-white/5"
                  >
                    {social[0]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
