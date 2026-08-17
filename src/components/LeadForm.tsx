import { useState, type FormEvent } from 'react';
import { LINKS, SERVICES } from '../data/content';
import Sticker from './Sticker';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function LeadForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.website) return;
    setStatus('sending');
    setError('');
    if (import.meta.env.DEV) {
      window.setTimeout(() => setStatus('success'), 650);
      return;
    }
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('We could not send that yet. Please use Telegram or try again.');
      setStatus('success');
      form.reset();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="glass-card lead-success rounded-3xl p-8 sm:p-12 text-center">
        <div className="lead-success-pop"><Sticker emoji="✅" size="xl" tilt={-7} /></div>
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 mt-6">GOT IT — WE&apos;LL REACH OUT!</h3>
        <p className="text-sm text-slate-500 mt-2">Want to move faster? Start a direct chat with our team.</p>
        <a href={LINKS.telegramSupport} target="_blank" rel="noopener noreferrer" className="btn-3d btn-shine inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold" data-cursor="CHAT">
          <Sticker emoji="💬" size="sm" tilt={6} /> OPEN TELEGRAM NOW
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="glass-card rounded-3xl p-5 sm:p-8 field" aria-label="Campaign enquiry form">
      <div className="flex items-center gap-3 mb-6"><Sticker emoji="📝" size="lg" tilt={-7} /><div><h3 className="font-heading font-bold text-slate-900">TELL US ABOUT YOUR CAMPAIGN</h3><p className="text-xs text-slate-500 mt-1">A few details. No long sales form.</p></div></div>
      <div className="grid sm:grid-cols-2 gap-4">
        <label><span>YOUR NAME</span><input required name="name" autoComplete="name" placeholder="Name" /></label>
        <label><span>PHONE / TELEGRAM</span><input required name="phone" autoComplete="tel" placeholder="+91… or @username" /></label>
      </div>
      <label><span>SERVICE</span><select required name="service" defaultValue=""><option value="" disabled>Choose a service</option>{SERVICES.map(service => <option key={service.id} value={service.title}>{service.title}</option>)}</select></label>
      <label><span>WHAT ARE YOU TRYING TO GROW?</span><textarea required name="message" rows={4} placeholder="Business, goals, current ad spend…" /></label>
      <label className="hp-field" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      {status === 'error' && <p className="text-xs text-rose-600 mb-3" role="alert">{error}</p>}
      <button disabled={status === 'sending'} type="submit" className="btn-3d btn-shine w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-ice-500 to-violet-glow text-white text-xs font-bold" data-cursor="SEND">
        <Sticker emoji="🚀" size="sm" tilt={-6} /> {status === 'sending' ? 'SENDING…' : 'SEND MY BRIEF'}
      </button>
    </form>
  );
}
