'use client'

import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to send')
      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full border border-[#e2d9cc] bg-white rounded px-4 py-3 text-[#1c1c1c] focus:outline-none focus:border-[#1a3a2e] focus:ring-1 focus:ring-[#1a3a2e] transition-colors text-sm"

  return (
    <>
      <section className="bg-[#1a3a2e] text-[#faf7f2] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label text-[#c4972a]">Get in Touch</p>
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mt-2">Contact Us</h1>
          <div className="w-16 h-0.5 bg-[#c4972a] mx-auto mt-6" />
          <p className="text-[#faf7f2]/80 text-lg mt-6">
            We&apos;re a small team. We read everything.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#faf7f2]">
        <div className="max-w-lg mx-auto">
          {success ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">✉️</div>
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#1a3a2e] mb-3">Message Received</h2>
              <p className="text-[#6b6b6b]">We&apos;ll get back to you soon. Thanks for reaching out.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#1c1c1c] mb-1.5">Name <span className="text-red-500">*</span></label>
                <input name="name" value={form.name} onChange={handleChange} required className={inputClass} placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1c1c1c] mb-1.5">Email <span className="text-red-500">*</span></label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1c1c1c] mb-1.5">Message <span className="text-red-500">*</span></label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={6} className={`${inputClass} resize-y`} placeholder="What's on your mind?" />
              </div>
              {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">{error}</div>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1a3a2e] text-[#faf7f2] py-3.5 rounded font-medium tracking-wide hover:bg-[#122a20] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
