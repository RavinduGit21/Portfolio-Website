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
    const mailto = `mailto:ravindushehara1234@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(form.message + '\n\nFrom: ' + form.name + ' <' + form.email + '>')}`
    window.location.href = mailto
  }

  return (
    <div className="w-full max-w-6xl mx-auto" ref={ref}>
      <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h2 className="text-5xl md:text-6xl font-bold mb-4 theme-text">
          Let's Work Together
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Have a project in mind? Drop me a message and let's create something amazing
        </p>
      </div>
      
      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <form onSubmit={submit} className={`space-y-5 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <input 
                name="name" 
                onChange={update} 
                placeholder="Your Name" 
                className="w-full p-4 rounded-xl glass-card border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 transition-all" 
                required 
              />
            </div>
            
            <div>
              <input 
                name="email" 
                onChange={update} 
                placeholder="Your Email" 
                type="email" 
                className="w-full p-4 rounded-xl glass-card border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 transition-all" 
                required 
              />
            </div>
          </div>
          
          <div>
            <input 
              name="subject" 
              onChange={update} 
              placeholder="Subject" 
              className="w-full p-4 rounded-xl glass-card border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 transition-all" 
            />
          </div>
          
          <div>
            <textarea 
              name="message" 
              onChange={update} 
              placeholder="Your Message" 
              className="w-full p-4 rounded-xl glass-card border border-white/5 text-white placeholder-gray-500 h-48 resize-none focus:outline-none focus:border-accent/50 transition-all" 
              required 
            />
          </div>
          
          <button 
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-accent to-accent-light text-white rounded-full font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all inline-flex items-center justify-center gap-2"
          >
            Send Message 
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>

        <div className={`glass-card p-8 rounded-2xl h-fit ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          <h3 className="font-semibold text-2xl mb-6 bg-gradient-to-r from-accent-light to-white bg-clip-text text-transparent">
            Contact Information
          </h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent-light/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-accent-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Email</div>
                <a href="mailto:ravindushehara1234@gmail.com" className="text-white hover:text-accent-light transition-colors">
                  ravindushehara1234@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent-light/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-accent-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Phone</div>
                <a href="tel:+94714516364" className="text-white hover:text-accent-light transition-colors">
                  +94 71 451 6364
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent-light/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-accent-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Location</div>
                <p className="text-white">Gampaha, Sri Lanka</p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="text-sm text-gray-400 mb-4">Follow me on</div>
              <div className="flex gap-3">
                <a
                  href="https://github.com/RavinduGit21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass-card border border-white/10 flex items-center justify-center hover-lift"
                  title="GitHub"
                >
                  <span className="text-lg font-bold text-gray-400">G</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/ravindu-shehara-9349132ba/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass-card border border-white/10 flex items-center justify-center hover-lift"
                  title="LinkedIn"
                >
                  <span className="text-lg font-bold text-gray-400">L</span>
                </a>
                <a
                  href="https://www.facebook.com/ravindu.shehara.96/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass-card border border-white/10 flex items-center justify-center hover-lift"
                  title="Facebook"
                >
                  <span className="text-lg font-bold text-gray-400">F</span>
                </a>
                <a
                  href="https://wa.me/94714516364"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass-card border border-white/10 flex items-center justify-center hover-lift"
                  title="WhatsApp"
                >
                  <span className="text-lg font-bold text-gray-400">W</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
