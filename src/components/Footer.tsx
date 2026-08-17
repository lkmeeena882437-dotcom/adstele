import { BRAND, LINKS } from '../data/content';
import Sticker from './Sticker';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="relative z-10 pt-24 pb-24 md:pb-12 border-t border-slate-200/50 bg-white/60">
      <div className="footer-wave" aria-hidden="true"><svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M0 62c238-84 477 42 734-2 273-46 480 33 706-12v52H0Z" fill="rgba(224,242,254,.8)" /></svg></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1"><div className="flex items-center gap-2 mb-2"><BrandLogo className="w-8 h-8" /><strong className="font-heading text-sm text-slate-800">{BRAND.name.toUpperCase()}</strong></div><p className="text-xs text-slate-400">{BRAND.tagline}</p></div>
          <div><h4 className="footer-title">NAVIGATION</h4>{['Services', 'Results', 'Pricing', 'Contact', 'FAQ'].map(item => <a key={item} href={`#${item.toLowerCase()}`} className="footer-link">{item}</a>)}</div>
          <div><h4 className="footer-title">LEGAL</h4>{[{ label: 'Refund Policy', href: '#refund' }, { label: 'Disclaimer', href: '#disclaimer' }, { label: 'Terms', href: '#terms' }, { label: 'Privacy', href: '#privacy' }].map(item => <a key={item.label} href={item.href} className="footer-link">{item.label}</a>)}</div>
          <div><h4 className="footer-title">TELEGRAM</h4><a href={LINKS.telegramSupport} target="_blank" rel="noopener noreferrer" className="footer-link flex items-center gap-2"><Sticker icon="chat" size="sm" tilt={-6} />Support</a><a href={LINKS.telegramChannel} target="_blank" rel="noopener noreferrer" className="footer-link flex items-center gap-2"><Sticker icon="broadcast" size="sm" tilt={6} />Channel</a></div>
        </div>
        <div className="pt-6 border-t border-slate-200/50 flex flex-col sm:flex-row items-center justify-between gap-2"><p className="text-[11px] text-slate-400">{BRAND.copyright}</p><p className="font-mono text-[8px] tracking-wider text-slate-400">{BRAND.supportingLine}</p></div>
      </div>
    </footer>
  );
}
