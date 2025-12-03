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
    <div className="w-full max-w-5xl mx-auto" ref={ref}>
      <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Let's Work Together
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Have a project in mind? Drop me a message and let's create something amazing
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={submit} className={`space-y-5 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <div>
            <input 
              name="name" 
              onChange={update} 
              placeholder="Your Name" 
              className="w-full p-4 rounded-xl glass-card text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all" 
              required 
            />
          </div>
          
          <div>
            <input 
              name="email" 
              onChange={update} 
              placeholder="Your Email" 
              type="email" 
              className="w-full p-4 rounded-xl glass-card text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all" 
              required 
            />
          </div>
          
          <div>
            <input 
              name="subject" 
              onChange={update} 
              placeholder="Subject" 
              className="w-full p-4 rounded-xl glass-card text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all" 
            />
          </div>
          
          <div>
            <textarea 
              name="message" 
              onChange={update} 
              placeholder="Your Message" 
              className="w-full p-4 rounded-xl glass-card text-white placeholder-gray-500 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all" 
              required 
            />
          </div>
          
          <button 
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-accent to-accent-light text-white rounded-xl font-medium hover:shadow-lg hover:shadow-accent/50 transition-all"
          >
            Send Message 📩
          </button>
        </form>

        <div className={`glass-card p-8 rounded-2xl h-fit ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          <h3 className="font-semibold text-2xl mb-6 bg-gradient-to-r from-accent-light to-white bg-clip-text text-transparent">
            Contact Information
          </h3>
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-xl flex-shrink-0">
                ✉️
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Email</div>
                <a href="mailto:ravindu@example.com" className="text-white hover:text-accent-light transition-colors">
                  ravindu@example.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-xl flex-shrink-0">
                📞
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Phone</div>
                <a href="tel:+94770000000" className="text-white hover:text-accent-light transition-colors">
                  +94 77 000 0000
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-xl flex-shrink-0">
                📍
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Location</div>
                <p className="text-white">Sri Lanka</p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5">
              <div className="text-sm text-gray-400 mb-3">Follow me on</div>
              <div className="flex gap-3">
                {['GitHub', 'LinkedIn', 'Twitter', 'Instagram'].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover-lift text-sm"
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
