import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Story | Baer and Son Publishing',
  description: 'How a father and son went from blank page to published book — and decided to help others do the same.',
}

export default function OurStory() {
  return (
    <>
      {/* Header */}
      <section className="bg-[#1a3a2e] text-[#faf7f2] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label text-[#c4972a]">Who We Are</p>
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mt-2">
            Our Story
          </h1>
          <div className="w-16 h-0.5 bg-[#c4972a] mx-auto mt-6" />
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-6 bg-[#faf7f2]">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#1a3a2e] mb-6">
              It started with my dad&apos;s book.
            </h2>
            <div className="space-y-6 text-[#1c1c1c]/80 leading-relaxed text-lg">
              <p>
                He had a story worth telling, and I wanted to help him tell it. So we sat down together and got to work.
                We learned the tools. We figured out the editing. We built the cover. We set up the imprint.
                We navigated Amazon KDP. And then one day we held his book in our hands.
              </p>
              <p>
                That moment — the weight of it, the realness of it — is something I won&apos;t forget.
                A book that lived in his head for years, now a physical thing in the world. His name on the cover.
                His story in print.
              </p>
            </div>

            <div className="my-10 border-l-4 border-[#c4972a] pl-6 italic text-[#1a3a2e] text-xl font-['Playfair_Display'] leading-relaxed">
              &ldquo;We named the imprint Baer and Son Publishing because that is exactly what it was.
              A father and a son.&rdquo;
            </div>

            <div className="space-y-6 text-[#1c1c1c]/80 leading-relaxed text-lg">
              <p>
                The &ldquo;Son&rdquo; was me on this one, but the name is built to carry forward. One day my own boy may
                stand in that spot. The name means what it says.
              </p>
              <p>
                After the book went live, people started asking how we did it. How does a regular guy actually publish
                a book without an agent, without a traditional house, without giving up the rights to his own story?
                Turns out we had answers.
              </p>
              <p>
                So we decided to offer the same partnership to other people who have a story they need to get out
                into the world.
              </p>
            </div>

            <div className="bg-[#f0ebe2] border border-[#e2d9cc] rounded-lg p-8 my-10">
              <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1a3a2e] mb-4">Why the Name Matters</h3>
              <p className="text-[#1c1c1c]/80 leading-relaxed">
                We are not a big publishing house. We are not pretending to be. We are a small family imprint that
                has actually walked the road from blank page to published book, and we know where the rough patches are.
                If you have a story worth telling and you want a partner who treats your book like we treated my dad&apos;s,
                we would love to hear from you.
              </p>
            </div>

            <div className="space-y-6 text-[#1c1c1c]/80 leading-relaxed text-lg">
              <p>
                The legacy piece matters to us. This imprint carries a name — Baer and Son. It was built for a moment
                between a father and a son. It will outlast that moment. When I look at my own son and think about the
                stories he will carry, I want him to know that stories are worth preserving. That doing the work of
                getting them out into the world matters.
              </p>
              <p>
                That&apos;s what Baer and Son Publishing is. Not a corporation. Not a brand exercise. A name that means
                something — and an offer to help you publish yours with the same care we brought to his.
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-[#1a3a2e] text-[#faf7f2] rounded-lg text-center">
            <p className="font-['Playfair_Display'] text-2xl font-bold mb-2 text-[#c4972a]">
              Baer and Son Publishing.
            </p>
            <p className="text-[#faf7f2]/80 text-lg">Built on family. Built for authors who have something real to say.</p>
          </div>

          <div className="text-center mt-10">
            <Link href="/submit" className="btn-primary">
              Submit Your Book
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
