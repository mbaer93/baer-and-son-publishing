import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How It Works | Baer and Son Publishing',
  description: 'Full transparent breakdown of our publishing process — from manuscript to Amazon KDP. No mystery, no gatekeeping.',
}

const steps = [
  {
    step: '01',
    title: 'Submit Your Manuscript',
    desc: 'You fill out our submission form and upload your manuscript (PDF or DOCX) along with any cover art you have. If you don\'t have a cover yet, that\'s fine — we\'ll get there.',
    detail: 'We review every submission personally. You\'ll hear from us within 5 business days with next steps or questions.',
  },
  {
    step: '02',
    title: 'Editorial Review',
    desc: 'We run your manuscript through our AI-assisted editorial review. This surfaces potential issues: pacing problems, consistency gaps, grammar, clarity. Every note comes to you as a suggestion — nothing more.',
    detail: 'You read the notes. You decide what to change. We never edit a word of your book without your explicit approval. Your voice stays yours.',
  },
  {
    step: '03',
    title: 'Cover Design & Review',
    desc: 'If you have a cover, we review it against KDP\'s technical requirements (dimensions, resolution, bleed, spine). If you need a cover, we\'ll work through the design process together.',
    detail: 'KDP has specific requirements for print covers vs eBook covers. We know them and make sure yours meets them before upload.',
  },
  {
    step: '04',
    title: 'Manuscript Formatting',
    desc: 'We format your manuscript for both eBook (EPUB/MOBI) and print (PDF with proper margins, headers, fonts, and page layout) to meet KDP\'s standards.',
    detail: 'Bad formatting is the #1 reason books get rejected or look unprofessional. We handle this so you don\'t have to learn InDesign.',
  },
  {
    step: '05',
    title: 'KDP Setup',
    desc: 'We walk you through setting up your Amazon KDP account (or work within yours if you have one). We set up the book\'s metadata: title, subtitle, categories, keywords, description.',
    detail: 'Good metadata means discoverability. We help you pick the right categories and keywords so readers who want your book can actually find it.',
  },
  {
    step: '06',
    title: 'Upload & ISBN',
    desc: 'We upload the formatted manuscript and cover to KDP. KDP provides a free ISBN for books published through their platform, or you can purchase your own.',
    detail: 'We\'ll explain the difference between KDP\'s free ISBN and a purchased ISBN so you can make the right call for your goals.',
  },
  {
    step: '07',
    title: 'Review the Proof',
    desc: 'Before going live, you order a physical proof copy (for print books). You hold it in your hands, read it, check it. If anything needs adjusting, we fix it.',
    detail: 'This step matters. Seeing your book in print before the world does gives you the chance to catch anything we all missed on screen.',
  },
  {
    step: '08',
    title: 'Publish & Distribute',
    desc: 'You approve the book, and it goes live on Amazon worldwide. KDP offers optional expanded distribution to other retailers and libraries. You set the price. You collect the royalties.',
    detail: 'KDP pays 60-70% royalties on eBooks and 40-60% on print, directly to you. Your book. Your earnings.',
  },
]

export default function HowItWorks() {
  return (
    <>
      {/* Header */}
      <section className="bg-[#1a3a2e] text-[#faf7f2] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label text-[#c4972a]">No Mystery</p>
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mt-2">
            How It Works
          </h1>
          <div className="w-16 h-0.5 bg-[#c4972a] mx-auto mt-6" />
          <p className="text-[#faf7f2]/80 text-lg mt-6 max-w-xl mx-auto">
            Every step, explained. We don&apos;t hide the process — we walk you through it.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-6 bg-[#faf7f2]">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-10">
            {steps.map((item, i) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#1a3a2e] text-[#c4972a] font-bold text-sm flex items-center justify-center font-mono">
                    {item.step}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 bg-[#e2d9cc] h-full mx-auto mt-2 ml-6" style={{minHeight: '2rem'}} />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1a3a2e] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#1c1c1c]/80 leading-relaxed mb-3">{item.desc}</p>
                  <p className="text-sm text-[#6b6b6b] leading-relaxed border-l-2 border-[#c4972a] pl-4 italic">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="py-20 px-6 bg-[#f0ebe2]">
        <div className="max-w-3xl mx-auto">
          <p className="section-label">A Note on AI</p>
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#1a3a2e] mb-4">
            How We Use AI — and How We Don&apos;t
          </h2>
          <div className="w-16 h-0.5 bg-[#c4972a] mb-8" />

          <div className="space-y-6 text-[#1c1c1c]/80 leading-relaxed">
            <p className="text-lg">
              We believe in being completely transparent about this. AI is part of our editorial workflow — but not in
              the way most people assume.
            </p>

            <div className="bg-[#faf7f2] border border-[#e2d9cc] rounded-lg p-6">
              <h3 className="font-semibold text-[#1a3a2e] mb-3 text-lg">What AI does:</h3>
              <ul className="space-y-2">
                {[
                  'Reads your manuscript and surfaces potential issues',
                  'Notes pacing problems, plot inconsistencies, or character consistency gaps',
                  'Flags grammar, punctuation, and clarity issues',
                  'Suggests areas where prose might be tightened or strengthened',
                  'Delivers all of this as a list of suggestions — nothing else',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#c4972a] mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#faf7f2] border border-[#e2d9cc] rounded-lg p-6">
              <h3 className="font-semibold text-[#1a3a2e] mb-3 text-lg">What AI does not do:</h3>
              <ul className="space-y-2">
                {[
                  'Write any part of your book',
                  'Rewrite your sentences or paragraphs',
                  'Make any changes to your manuscript directly',
                  'Determine what gets published — that\'s your call and ours together',
                  'Replace the human editorial judgment we bring to every project',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-lg font-medium text-[#1a3a2e]">
              Every suggestion that comes out of the AI review goes to you. You read it. You decide. We implemented
              this same process on my dad&apos;s book. He chose which notes to act on and which ones to ignore.
              That&apos;s how it should work. Your book. Your call.
            </p>
          </div>
        </div>
      </section>

      {/* Author rights */}
      <section className="py-20 px-6 bg-[#faf7f2]">
        <div className="max-w-3xl mx-auto">
          <p className="section-label">What You Keep</p>
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#1a3a2e] mb-4">
            Your Rights. Your Royalties. Your Story.
          </h2>
          <div className="w-16 h-0.5 bg-[#c4972a] mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Full Copyright',
                desc: 'You own your work. Always. We never take a stake in your intellectual property.',
                icon: '©',
              },
              {
                title: 'All Royalties',
                desc: 'Amazon pays you directly. KDP royalties go to your account. We charge for our service — not a cut of your earnings.',
                icon: '$',
              },
              {
                title: 'Your Voice',
                desc: 'We are editors and guides, not ghostwriters. The words in your book are yours.',
                icon: '✍',
              },
            ].map(item => (
              <div key={item.title} className="bg-[#f0ebe2] border border-[#e2d9cc] rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-[#c4972a] mb-3">{item.icon}</div>
                <h3 className="font-['Playfair_Display'] font-bold text-[#1a3a2e] mb-2">{item.title}</h3>
                <p className="text-sm text-[#6b6b6b] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[#1a3a2e] text-[#faf7f2] text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-[#faf7f2]/80 mb-8">Submit your manuscript and let&apos;s see what we can build together.</p>
          <Link href="/submit" className="btn-primary">
            Submit Your Book
          </Link>
        </div>
      </section>
    </>
  )
}
