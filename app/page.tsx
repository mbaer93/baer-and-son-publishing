import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="bg-[#1a3a2e] text-[#faf7f2] py-24 md:py-36 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Image
              src="/baer-logo.png"
              alt="Baer and Son Publishing"
              width={280}
              height={140}
              className="h-28 md:h-36 w-auto object-contain"
              priority
            />
          </div>
          <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold leading-tight mb-6">
            Built on Family.<br />
            <span className="text-[#c4972a]">Built for Authors.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#faf7f2]/80 max-w-2xl mx-auto leading-relaxed mb-10">
            A small family imprint that has walked the road from blank page to published book.
            We know where the rough patches are — and we&apos;ll walk it with you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/submit" className="btn-primary text-center">
              Submit Your Book
            </Link>
            <Link href="/how-it-works" className="border-2 border-[#faf7f2]/60 text-[#faf7f2] px-7 py-3 rounded font-medium tracking-wide hover:border-[#c4972a] hover:text-[#c4972a] transition-colors duration-200 text-center">
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* OUR STORY PREVIEW */}
      <section className="py-20 px-6 bg-[#faf7f2]">
        <div className="max-w-3xl mx-auto">
          <p className="section-label text-center">Our Story</p>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-center mb-8 text-[#1a3a2e]">
            It Started With My Dad&apos;s Book
          </h2>
          <div className="divider-gold mx-auto" />
          <div className="space-y-5 text-[#1c1c1c]/80 leading-relaxed text-lg mt-8">
            <p>
              He had a story worth telling, and I wanted to help him tell it. So we sat down together and got to work.
              We learned the tools. We figured out the editing. We built the cover. We set up the imprint.
              We navigated Amazon KDP. And then one day we held his book in our hands.
            </p>
            <p>
              We named the imprint Baer and Son Publishing because that is exactly what it was.
              A father and a son. The &quot;Son&quot; was me on this one, but the name is built to carry forward.
              One day my own boy may stand in that spot. The name means what it says.
            </p>
            <p>
              After the book went live, people started asking how we did it. Turns out we had answers.
              So we decided to offer the same partnership to other people who have a story they need to get out into the world.
            </p>
          </div>
          <div className="text-center mt-10">
            <Link href="/our-story" className="btn-outline">
              Read the Full Story
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="py-20 px-6 bg-[#f0ebe2]">
        <div className="max-w-5xl mx-auto">
          <p className="section-label text-center">What We Offer</p>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-center mb-12 text-[#1a3a2e]">
            A Real Partnership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🤝',
                title: 'Partnership',
                desc: 'We treat your book the way we treated my dad\'s. Personal, hands-on, and invested in the outcome from first draft to final page.',
              },
              {
                icon: '🔍',
                title: 'Transparency',
                desc: 'No mystery. No gatekeeping. We show you every step of the process — what it costs, what it takes, and what you can expect.',
              },
              {
                icon: '📖',
                title: 'Legacy',
                desc: 'You keep your rights. You keep your voice. Your story belongs to you — we just help you share it with the world.',
              },
            ].map((card) => (
              <div key={card.title} className="bg-[#faf7f2] border border-[#e2d9cc] rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1a3a2e] mb-3">{card.title}</h3>
                <p className="text-[#6b6b6b] leading-relaxed text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS OVERVIEW */}
      <section className="py-20 px-6 bg-[#faf7f2]">
        <div className="max-w-5xl mx-auto">
          <p className="section-label text-center">The Process</p>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-center mb-12 text-[#1a3a2e]">
            From Blank Page to Published Book
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: '01', label: 'Manuscript', icon: '✍️' },
              { step: '02', label: 'Editorial Review', icon: '📝' },
              { step: '03', label: 'KDP Setup', icon: '⚙️' },
              { step: '04', label: 'Published', icon: '🎉' },
            ].map((item, i) => (
              <div key={item.step} className="text-center relative">
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-[#e2d9cc]" />
                )}
                <div className="w-16 h-16 rounded-full bg-[#1a3a2e] text-[#faf7f2] flex items-center justify-center text-2xl mx-auto mb-3 relative z-10">
                  {item.icon}
                </div>
                <p className="text-[#c4972a] text-xs font-bold tracking-widest mb-1">{item.step}</p>
                <p className="font-['Playfair_Display'] font-semibold text-[#1a3a2e] text-sm">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/how-it-works" className="btn-outline">
              See the Full Process
            </Link>
          </div>
        </div>
      </section>

      {/* AI TRANSPARENCY CALLOUT */}
      <section className="py-16 px-6 bg-[#1a3a2e] text-[#faf7f2]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label text-[#c4972a]">A Note on AI</p>
          <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold mb-6">
            We Use AI. We&apos;re Transparent About It.
          </h2>
          <div className="divider-gold mx-auto" />
          <p className="text-[#faf7f2]/80 leading-relaxed text-lg mt-6 mb-4">
            We use AI as an editorial tool. It reads your manuscript and offers notes — on pacing,
            consistency, grammar, and clarity. Those suggestions come to you. You read them.
            You decide what to change, if anything.
          </p>
          <p className="text-[#c4972a] font-semibold text-lg">
            AI never writes a single word of your book. Your voice. Your story. Always.
          </p>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-20 px-6 bg-[#f0ebe2]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#1a3a2e] mb-4">
            Have a Story Worth Telling?
          </h2>
          <p className="text-[#6b6b6b] text-lg leading-relaxed mb-8">
            We are not a big publishing house. We are not pretending to be.
            If you want a partner who treats your book like we treated my dad&apos;s, we would love to hear from you.
          </p>
          <Link href="/submit" className="btn-primary text-lg px-10 py-4">
            Submit Your Book
          </Link>
        </div>
      </section>
    </>
  )
}
