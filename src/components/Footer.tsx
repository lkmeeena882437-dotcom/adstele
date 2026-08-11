import { BRAND, LINKS } from '../data/content';

export default function Footer() {
  return (
    <footer className="relative py-16 border-t border-slate-200/50 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ice-500 to-violet-glow flex items-center justify-center text-white font-bold text-sm">A</div>
              <span className="font-[var(--font-heading)] font-bold text-sm text-slate-800 tracking-tight">{BRAND.name.toUpperCase()}</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">{BRAND.tagline}</p>
            <p className="text-xs text-slate-400">{BRAND.supportingLine}</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-400 tracking-widest mb-4">NAVIGATION</h4>
            <div className="space-y-2">
              {['Platform', 'Services', 'Pricing', 'FAQ', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="block text-sm text-slate-600 hover:text-ice-600 transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-400 tracking-widest mb-4">LEGAL</h4>
            <div className="space-y-2">
              {[
                { label: 'Terms', href: '#terms' },
                { label: 'Privacy', href: '#privacy' },
                { label: 'Refund Policy', href: '#refund' },
                { label: 'Disclaimer', href: '#disclaimer' },
              ].map(item => (
                <a key={item.label} href={item.href} className="block text-sm text-slate-600 hover:text-ice-600 transition-colors">
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-400 tracking-widest mb-4">TELEGRAM</h4>
            <div className="space-y-3">
              <a
                href={LINKS.telegramSupport}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-ice-600 transition-colors"
              >
                💬 Adstele Support
              </a>
              <a
                href={LINKS.telegramChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-ice-600 transition-colors"
              >
                📢 Adstele Agency
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">{BRAND.copyright}</p>
            <p className="text-xs text-slate-400">
              Telegram Growth Intelligence
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
