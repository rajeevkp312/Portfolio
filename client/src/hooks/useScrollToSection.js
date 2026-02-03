import { useCallback } from 'react'

export default function useScrollToSection() {
  return useCallback((id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])
}
