'use client'

import { useState, useRef } from 'react'

const genres = ['Fiction', 'Non-Fiction', 'Memoir', 'Biography', 'Christian / Faith', 'Historical', "Children's", 'Other']
const howHeard = ['Word of mouth', 'Social media', 'Google search', 'Amazon', 'Referral from another author', 'Other']

export default function Submit() {
  const [form, setForm] = useState({
    authorName: '', email: '', phone: '',
    bookTitle: '', genre: '', wordCount: '',
    synopsis: '', howHeard: '', rightsConfirmed: false,
  })
  const [manuscript, setManuscript] = useState<File | null>(null)
  const [coverArt, setCoverArt] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const manuscriptRef = useRef<HTMLInputElement>(null)
  const coverRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, type: 'manuscript' | 'cover') => {
    const file = e.target.files?.[0]
    if (!file) return
    if (type === 'manuscript') {
      if (file.size > 50 * 1024 * 1024) { setError('Manuscript must be under 50MB'); return }
      if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'].includes(file.type)) {
        setError('Manuscript must be a PDF or DOCX file'); return
      }
      setManuscript(file)
    } else {
      if (file.size > 20 * 1024 * 1024) { setError('Cover art must be under 20MB'); return }
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        setError('Cover art must be a JPG or PNG file'); return
      }
      setCoverArt(file)
    }
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.rightsConfirmed) { setError('Please confirm you hold the rights to this work.'); return }
    if (!manuscript) { setError('Please upload your manuscript.'); return }

    setLoading(true)
    setError('')

    try {
      const data = new FormData()
      Object.entries(form).forEach(([k, v]) => data.append(k, String(v)))
      data.append('manuscript', manuscript)
      if (coverArt) data.append('coverArt', coverArt)

      const res = await fetch('/api/submit', { method: 'POST', body: data })
      const json = await res.json()

      if (!res.ok) throw new Error(json.error || 'Submission failed')
      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <section className="min-h-screen bg-[#faf7f2] flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <div className="text-6xl mb-6">📖</div>
          <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[#1a3a2e] mb-4">
            We&apos;ve Got It
          </h1>
          <p className="text-[#6b6b6b] text-lg leading-relaxed mb-6">
            Your submission came through. We review every manuscript personally —
            you&apos;ll hear from us within 5 business days.
          </p>
          <p className="text-sm text-[#c4972a] italic font-['Playfair_Display']">
            &ldquo;Every great book started as a submission somewhere.&rdquo;
          </p>
        </div>
      </section>
    )
  }

  const inputClass = "w-full border border-[#e2d9cc] bg-white rounded px-4 py-3 text-[#1c1c1c] focus:outline-none focus:border-[#1a3a2e] focus:ring-1 focus:ring-[#1a3a2e] transition-colors text-sm"
  const labelClass = "block text-sm font-medium text-[#1c1c1c] mb-1.5"

  return (
    <>
      {/* Header */}
      <section className="bg-[#1a3a2e] text-[#faf7f2] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label text-[#c4972a]">Get Started</p>
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mt-2">
            Submit Your Book
          </h1>
          <div className="w-16 h-0.5 bg-[#c4972a] mx-auto mt-6" />
          <p className="text-[#faf7f2]/80 text-lg mt-6 max-w-xl mx-auto">
            Tell us about your book. We review every submission personally and respond within 5 business days.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 px-6 bg-[#faf7f2]">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Author Info */}
            <div>
              <h2 className="font-['Playfair_Display'] text-xl font-bold text-[#1a3a2e] mb-6 pb-2 border-b border-[#e2d9cc]">
                About You
              </h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
                  <input name="authorName" value={form.authorName} onChange={handleChange} required className={inputClass} placeholder="Your full name" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Email <span className="text-red-500">*</span></label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className={labelClass}>Phone <span className="text-[#6b6b6b] font-normal">(optional)</span></label>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} className={inputClass} placeholder="(555) 000-0000" />
                  </div>
                </div>
              </div>
            </div>

            {/* Book Info */}
            <div>
              <h2 className="font-['Playfair_Display'] text-xl font-bold text-[#1a3a2e] mb-6 pb-2 border-b border-[#e2d9cc]">
                About Your Book
              </h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Book Title <span className="text-red-500">*</span></label>
                  <input name="bookTitle" value={form.bookTitle} onChange={handleChange} required className={inputClass} placeholder="Working title is fine" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Genre <span className="text-red-500">*</span></label>
                    <select name="genre" value={form.genre} onChange={handleChange} required className={inputClass}>
                      <option value="">Select a genre</option>
                      {genres.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Estimated Word Count</label>
                    <input name="wordCount" value={form.wordCount} onChange={handleChange} className={inputClass} placeholder="e.g. 75,000" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Brief Synopsis <span className="text-red-500">*</span></label>
                  <textarea
                    name="synopsis"
                    value={form.synopsis}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`${inputClass} resize-y`}
                    placeholder="Tell us what your book is about. A paragraph or two is fine. We want to understand the story before we open the file."
                  />
                </div>
              </div>
            </div>

            {/* File Uploads */}
            <div>
              <h2 className="font-['Playfair_Display'] text-xl font-bold text-[#1a3a2e] mb-6 pb-2 border-b border-[#e2d9cc]">
                Your Files
              </h2>
              <div className="space-y-5">
                {/* Manuscript */}
                <div>
                  <label className={labelClass}>
                    Manuscript <span className="text-red-500">*</span>
                    <span className="text-[#6b6b6b] font-normal ml-1">(PDF or DOCX, max 50MB)</span>
                  </label>
                  <div
                    className="border-2 border-dashed border-[#e2d9cc] rounded-lg p-6 text-center cursor-pointer hover:border-[#1a3a2e] transition-colors"
                    onClick={() => manuscriptRef.current?.click()}
                  >
                    <input ref={manuscriptRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => handleFile(e, 'manuscript')} />
                    {manuscript ? (
                      <div>
                        <p className="text-[#1a3a2e] font-medium">📄 {manuscript.name}</p>
                        <p className="text-xs text-[#6b6b6b] mt-1">{(manuscript.size / (1024*1024)).toFixed(1)} MB — click to change</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-[#6b6b6b] text-sm">Click to upload your manuscript</p>
                        <p className="text-xs text-[#6b6b6b]/60 mt-1">PDF or DOCX</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Cover Art */}
                <div>
                  <label className={labelClass}>
                    Cover Art <span className="text-[#6b6b6b] font-normal">(optional — JPG or PNG, max 20MB)</span>
                  </label>
                  <div
                    className="border-2 border-dashed border-[#e2d9cc] rounded-lg p-6 text-center cursor-pointer hover:border-[#1a3a2e] transition-colors"
                    onClick={() => coverRef.current?.click()}
                  >
                    <input ref={coverRef} type="file" accept=".jpg,.jpeg,.png" className="hidden" onChange={e => handleFile(e, 'cover')} />
                    {coverArt ? (
                      <div>
                        <p className="text-[#1a3a2e] font-medium">🖼 {coverArt.name}</p>
                        <p className="text-xs text-[#6b6b6b] mt-1">{(coverArt.size / (1024*1024)).toFixed(1)} MB — click to change</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-[#6b6b6b] text-sm">Click to upload your cover art</p>
                        <p className="text-xs text-[#6b6b6b]/60 mt-1">Don&apos;t have one yet? No problem — we can help.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* How heard */}
            <div>
              <label className={labelClass}>How did you hear about us?</label>
              <select name="howHeard" value={form.howHeard} onChange={handleChange} className={inputClass}>
                <option value="">Select one</option>
                {howHeard.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>

            {/* Rights confirmation */}
            <div className="bg-[#f0ebe2] border border-[#e2d9cc] rounded-lg p-5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="rightsConfirmed"
                  checked={form.rightsConfirmed}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 accent-[#1a3a2e] flex-shrink-0"
                />
                <span className="text-sm text-[#1c1c1c]/80 leading-relaxed">
                  I confirm this is my original work and I hold the rights to publish it.
                  I understand that submitting this form does not guarantee publication.
                </span>
              </label>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a3a2e] text-[#faf7f2] py-4 rounded font-medium tracking-wide hover:bg-[#122a20] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Uploading...
                </span>
              ) : 'Submit Your Book'}
            </button>

            <p className="text-center text-xs text-[#6b6b6b]">
              We review every submission personally. You&apos;ll hear from us within 5 business days.
            </p>
          </form>
        </div>
      </section>
    </>
  )
}
