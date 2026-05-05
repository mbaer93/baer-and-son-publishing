import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#1a3a2e] text-[#faf7f2]/70 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Image
              src="/baer-logo.png"
              alt="Baer and Son Publishing"
              width={100}
              height={50}
              className="h-10 w-auto object-contain mb-4 opacity-90"
            />
            <p className="text-sm leading-relaxed">
              A family imprint built for authors who have something real to say.
            </p>
            <p className="text-xs mt-4 text-[#c4972a]/80 italic">Built on family.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[#faf7f2] font-semibold mb-4 font-[family-name:var(--font-playfair)] text-sm tracking-wide uppercase">Navigate</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/our-story', label: 'Our Story' },
                { href: '/how-it-works', label: 'How It Works' },
                { href: '/submit', label: 'Submit Your Book' },
                { href: '/contact', label: 'Contact' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#c4972a] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Publishing note */}
          <div>
            <h4 className="text-[#faf7f2] font-semibold mb-4 text-sm tracking-wide uppercase">Publishing Platform</h4>
            <p className="text-sm leading-relaxed mb-3">
              We publish exclusively through Amazon KDP — giving authors global distribution and full ownership of their rights.
            </p>
            <p className="text-xs text-[#faf7f2]/50">
              AI is used for editorial notes only. Your words. Your story. Always.
            </p>
          </div>
        </div>

        <div className="border-t border-[#faf7f2]/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#faf7f2]/40">
          <p>&copy; {new Date().getFullYear()} Baer and Son Publishing. All rights reserved.</p>
          <p>Powered by Amazon KDP · Built with love</p>
        </div>
      </div>
    </footer>
  )
}
