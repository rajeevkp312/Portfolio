import { useState, useCallback } from 'react'

// Handles form state, client-side validation, and POST to backend
export default function useContactForm() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const onChange = useCallback((e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
  }, [])

  const validate = useCallback(() => {
    const { name, email, subject, message } = values
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      return 'Please fill out all fields.'
    }
    const emailOk = /^(?:[a-zA-Z0-9_'^&\-+.])+(?:\.(?:[a-zA-Z0-9_'^&\-+.])+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(email)
    if (!emailOk) return 'Please enter a valid email address.'
    return ''
  }, [values])

  const submit = useCallback(async () => {
    setError('')
    setSuccess('')
    const v = validate()
    if (v) { setError(v); return }

    setLoading(true)
    try {
      const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
      const res = await fetch(`${base}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Failed to submit')
      setSuccess('Thank you! Your message has been sent.')
      setValues({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [values, validate])

  return { values, loading, success, error, onChange, submit }
}
