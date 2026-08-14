import { BRAND, LINKS } from '../data/content';

export default function Footer() {
  return (
    <footer className="relative py-10 sm:py-12 border-t border-slate-200/50 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-ice-500 to-violet-glow flex items-center justify-center text-white font-bold text-xs">A</div>
              <span className="font-[var(--font-heading)] font-bold text-sm text-slate-800 tracking-tight">{BRAND.name.toUpperCase()}</span>
            </div>
            <p className="text-xs text-slate-400">{BRAND.tagline}</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] font-semibold text-slate-400 tracking-widest mb-3">NAVIGATION</h4>
            <div className="space-y-1.5">
              {['Services', 'Pricing', 'Contact', 'FAQ'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="block text-xs text-slate-500 hover:text-ice-600 transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[10px] font-semibold text-slate-400 tracking-widest mb-3">LEGAL</h4>
            <div className="space-y-1.5">
              {[
                { label: 'Refund Policy', href: '#refund' },
                { label: 'Disclaimer', href: '#disclaimer' },
                { label: 'Terms', href: '#terms' },
                { label: 'Privacy', href: '#privacy' },
              ].map(item => (
                <a key={item.label} href={item.href} className="block text-xs text-slate-500 hover:text-ice-600 transition-colors">
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Telegram */}
          <div>
            <h4 className="text-[10px] font-semibold text-slate-400 tracking-widest mb-3">TELEGRAM</h4>
            <div className="space-y-1.5">
              <a href={LINKS.telegramSupport} target="_blank" rel="noopener noreferrer" className="block text-xs text-slate-500 hover:text-ice-600 transition-colors">
                💬 Support
              </a>
              <a href={LINKS.telegramChannel} target="_blank" rel="noopener noreferrer" className="block text-xs text-slate-500 hover:text-ice-600 transition-colors">
                📢 Channel
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200/50 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-slate-400">{BRAND.copyright}</p>
          <p className="text-[11px] text-slate-400">{BRAND.supportingLine}</p>
        </div>
      </div>
    </footer>
  );
}
