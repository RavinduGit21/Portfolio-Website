import { useEffect } from 'react'

export default function SmoothScroll({ children }) {
  useEffect(() => {
    let scrollTarget = window.scrollY
    let currentScroll = window.scrollY
    let animationId = null
    
    const lerp = (start, end, factor) => start + (end - start) * factor
    
    const smoothScrollAnimation = () => {
      currentScroll = lerp(currentScroll, scrollTarget, 0.075)
      
      if (Math.abs(scrollTarget - currentScroll) > 0.5) {
        window.scrollTo(0, currentScroll)
        animationId = requestAnimationFrame(smoothScrollAnimation)
      } else {
        window.scrollTo(0, scrollTarget)
        currentScroll = scrollTarget
        animationId = null
      }
    }
    
    const handleWheel = (e) => {
      e.preventDefault()
      scrollTarget += e.deltaY * 0.8
      scrollTarget = Math.max(0, Math.min(scrollTarget, document.documentElement.scrollHeight - window.innerHeight))
      
      if (!animationId) {
        animationId = requestAnimationFrame(smoothScrollAnimation)
      }
    }
    
    const handleTouchStart = (e) => {
      const touch = e.touches[0]
      window.touchStartY = touch.clientY
      window.touchStartScroll = scrollTarget
    }
    
    const handleTouchMove = (e) => {
      if (!window.touchStartY) return
      e.preventDefault()
      const touch = e.touches[0]
      const deltaY = window.touchStartY - touch.clientY
      scrollTarget = window.touchStartScroll + deltaY
      scrollTarget = Math.max(0, Math.min(scrollTarget, document.documentElement.scrollHeight - window.innerHeight))
      
      if (!animationId) {
        animationId = requestAnimationFrame(smoothScrollAnimation)
      }
    }
    
    // Apply smooth scrolling for desktop
    if (window.innerWidth > 768) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      window.addEventListener('wheel', handleWheel, { passive: false })
      window.addEventListener('touchstart', handleTouchStart, { passive: false })
      window.addEventListener('touchmove', handleTouchMove, { passive: false })
    }
    
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return <>{children}</>
}
