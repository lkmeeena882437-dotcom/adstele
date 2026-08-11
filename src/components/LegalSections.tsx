import { REFUND_POLICY, DISCLAIMER } from '../data/content';

export default function LegalSections() {
  return (
    <>
      <div id="refund" className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="glass-card rounded-2xl p-8">
          <h3 className="font-[var(--font-heading)] text-lg font-bold text-slate-800 mb-4">{REFUND_POLICY.title}</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{REFUND_POLICY.content}</p>
        </div>
      </div>

      <div id="disclaimer" className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
        <div className="glass-card rounded-2xl p-8">
          <h3 className="font-[var(--font-heading)] text-lg font-bold text-slate-800 mb-4">DISCLAIMER</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">{DISCLAIMER.marketing}</p>
          <p className="text-sm text-slate-600 leading-relaxed">{DISCLAIMER.financial}</p>
        </div>
      </div>

      <div id="terms" className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
        <div className="glass-card rounded-2xl p-8">
          <h3 className="font-[var(--font-heading)] text-lg font-bold text-slate-800 mb-4">TERMS OF SERVICE</h3>
          <p className="text-sm text-slate-500 italic">Terms of service content to be added. Please contact us on Telegram for service terms and conditions.</p>
        </div>
      </div>

      <div id="privacy" className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
        <div className="glass-card rounded-2xl p-8">
          <h3 className="font-[var(--font-heading)] text-lg font-bold text-slate-800 mb-4">PRIVACY POLICY</h3>
          <p className="text-sm text-slate-500 italic">Privacy policy content to be added. We do not collect unnecessary sensitive information. Contact us on Telegram for privacy inquiries.</p>
        </div>
      </div>
    </>
  );
}
