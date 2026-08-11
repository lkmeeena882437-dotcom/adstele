import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import Section from './Section';
import { LINKS } from '../data/content';
import { trackEvent } from '../utils/analytics';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    telegramUsername: '',
    telegramChannel: '',
    industry: '',
    goal: '',
    service: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    trackEvent('lead_submit', { industry: formData.industry, service: formData.service });
    setSubmitted(true);
  };

  const sanitize = (v: string) => v.replace(/[<>]/g, '');

  return (
    <Section id="contact">
      <div className="text-center mb-12">
        <p className="text-xs font-semibold text-ice-500 tracking-widest mb-3">CONTACT</p>
        <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          READY TO
          <br />
          <span className="gradient-text">BUILD?</span>
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto">
          Tell us what you're building on Telegram.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <a
            href={LINKS.telegramSupport}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('telegram_click', { type: 'support' })}
            className="btn-magnetic flex items-center gap-4 p-6 glass-card rounded-2xl group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ice-500 to-cyan-glow flex items-center justify-center text-2xl shrink-0">
              💬
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 group-hover:text-ice-600 transition-colors">TALK TO US ON TELEGRAM</p>
              <p className="text-xs text-slate-500">@Adstele_support</p>
            </div>
          </a>

          <a
            href={LINKS.telegramChannel}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('channel_click')}
            className="btn-magnetic flex items-center gap-4 p-6 glass-card rounded-2xl group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-glow to-pink-accent flex items-center justify-center text-2xl shrink-0">
              📢
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 group-hover:text-violet-600 transition-colors">VISIT OUR TELEGRAM</p>
              <p className="text-xs text-slate-500">@adstele_agency</p>
            </div>
          </a>

          <a
            href={LINKS.telegramSupport}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('pricing_select', { package: 'starter', location: 'contact' })}
            className="btn-magnetic flex items-center gap-4 p-6 glass-card rounded-2xl group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-mint-glow flex items-center justify-center text-2xl shrink-0">
              🚀
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 group-hover:text-green-600 transition-colors">START WITH $150</p>
              <p className="text-xs text-slate-500">Telegram Growth Campaign</p>
            </div>
          </a>
        </div>

        <div className="glass-card rounded-3xl p-6 md:p-8">
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <h3 className="font-[var(--font-heading)] text-lg font-bold text-slate-800 mb-6">
                Tell us about your project
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1 block">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: sanitize(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-ice-400 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1 block">Telegram Username</label>
                  <input
                    type="text"
                    required
                    value={formData.telegramUsername}
                    onChange={e => setFormData({ ...formData, telegramUsername: sanitize(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-ice-400 focus:border-transparent"
                    placeholder="@username"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1 block">Telegram Channel</label>
                  <input
                    type="text"
                    value={formData.telegramChannel}
                    onChange={e => setFormData({ ...formData, telegramChannel: sanitize(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-ice-400 focus:border-transparent"
                    placeholder="@channel (optional)"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1 block">Industry</label>
                  <select
                    required
                    value={formData.industry}
                    onChange={e => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-ice-400 focus:border-transparent"
                  >
                    <option value="">Select industry</option>
                    <option value="Trading">Trading</option>
                    <option value="Crypto">Crypto</option>
                    <option value="Education">Education</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Business">Business</option>
                    <option value="Communities">Communities</option>
                    <option value="Creators">Creators</option>
                    <option value="Digital Products">Digital Products</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1 block">Current Goal</label>
                  <input
                    type="text"
                    value={formData.goal}
                    onChange={e => setFormData({ ...formData, goal: sanitize(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-ice-400 focus:border-transparent"
                    placeholder="e.g. Grow my channel audience"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-500 mb-1 block">Interested In</label>
                  <select
                    value={formData.service}
                    onChange={e => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-ice-400 focus:border-transparent"
                  >
                    <option value="">Select service</option>
                    <option value="Starter - $150">Starter — $150</option>
                    <option value="Growth - $300">Growth — $300</option>
                    <option value="AI Growth - $700/mo">AI Growth — $700/month</option>
                    <option value="Not sure">Not sure yet</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="btn-magnetic w-full mt-6 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-ice-500 to-cyan-glow text-white rounded-2xl text-sm font-semibold shadow-lg"
              >
                📨 Submit Request
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-4 text-3xl">
                ✓
              </div>
              <h3 className="font-[var(--font-heading)] text-xl font-bold text-slate-800 mb-2">REQUEST RECEIVED</h3>
              <p className="text-sm text-slate-500 mb-6">We'll review your request and get back to you.</p>
              <a
                href={LINKS.telegramSupport}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-magnetic inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-ice-500 to-cyan-glow text-white rounded-xl text-sm font-semibold shadow-lg"
              >
                💬 Continue on Telegram
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </Section>
  );
}
