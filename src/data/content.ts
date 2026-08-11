// ============================================================
// CMS-READY CONTENT DATA LAYER
// All editable content is centralized here for easy updates.
// Future: connect to a CMS, database, or admin panel.
// ============================================================

export const BRAND = {
  name: 'Adstele Agency',
  tagline: 'Telegram Growth Intelligence',
  supportingLine: 'ADS × AI × CONTENT × AUTOMATION',
  statement: 'We build intelligent growth systems for businesses living on Telegram.',
  copyright: '© 2026 J.B GOUTTAM. All rights reserved.',
};

export const LINKS = {
  telegramSupport: 'https://t.me/Adstele_support',
  telegramChannel: 'https://t.me/adstele_agency',
};

export const NAV_ITEMS = [
  { label: 'Platform', href: '#platform' },
  { label: 'Services', href: '#services' },
  { label: 'Growth System', href: '#growth-system' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const NICHES = [
  { icon: '📈', label: 'Trading', challenge: 'Reaching active traders in a crowded market', system: 'Ads Engine + AI Content', services: 'Telegram Ads, Trading Content, Campaign Optimization' },
  { icon: '₿', label: 'Crypto', challenge: 'Building trust and community in crypto space', system: 'Ads Engine + Automation', services: 'Telegram Ads, Crypto Content, Community Growth' },
  { icon: '🎓', label: 'Education', challenge: 'Converting learners into engaged subscribers', system: 'AI Content + Automation', services: 'Educational Content, Course Promotion, Telegram Workflows' },
  { icon: '🎮', label: 'Gaming', challenge: 'Engaging gamers and building active communities', system: 'Ads Engine + AI Content', services: 'Gaming Content, Community Ads, Engagement Automation' },
  { icon: '💼', label: 'Business', challenge: 'Generating leads through Telegram channels', system: 'Complete Growth System', services: 'Business Ads, Professional Content, Lead Workflows' },
  { icon: '📣', label: 'Communities', challenge: 'Growing and retaining community members', system: 'Ads + Automation', services: 'Community Ads, Engagement Content, Growth Automation' },
  { icon: '👤', label: 'Creators', challenge: 'Monetizing content and expanding reach', system: 'AI Content + Ads', services: 'Creator Content, Audience Ads, Publishing Automation' },
  { icon: '🛍️', label: 'Digital Products', challenge: 'Driving sales through Telegram marketing', system: 'Ads + Content + Automation', services: 'Product Ads, Sales Content, Conversion Workflows' },
];

export const SERVICES = [
  {
    id: 'ads',
    icon: '📢',
    title: 'ADS ENGINE',
    subtitle: 'Telegram Advertising',
    description: 'Telegram advertising strategy and campaign execution. Telegram TON Ads and Channel Rank Optimization.',
    details: ['Campaign strategy', 'TON Ads management', 'Channel rank optimization', 'Audience targeting', 'Ad creative development'],
  },
  {
    id: 'ai-content',
    icon: '🤖',
    title: 'AI CONTENT ENGINE',
    subtitle: 'AI-Assisted Content',
    description: 'AI-assisted, professionally structured content creation with high definition for all niches.',
    details: ['AI-enhanced writing', 'Content calendars', 'Multi-format content', 'Niche-specific content', 'Human-reviewed output'],
  },
  {
    id: 'automation',
    icon: '⚙️',
    title: 'AUTOMATION ENGINE',
    subtitle: 'Marketing Automation',
    description: 'Repeatable content and marketing workflows for Trading, Gaming, Education, Creators and more.',
    details: ['Content workflows', 'Publishing automation', 'Campaign triggers', 'Scheduled posting', 'Performance monitoring'],
  },
  {
    id: 'growth',
    icon: '📊',
    title: 'GROWTH INTELLIGENCE',
    subtitle: 'Growth Systems',
    description: 'Connecting advertising, content, Telegram and automation into a structured growth system.',
    details: ['Campaign analysis', 'Content optimization', 'Growth strategy', 'Channel optimization', 'Performance review'],
  },
];

export const PRICING = [
  {
    id: 'starter',
    name: 'STARTER',
    subtitle: 'Telegram Growth Campaign',
    price: '$150',
    period: '',
    description: 'Buy a Telegram TON Active Ad',
    features: [
      'Telegram TON Ad campaign',
      'Campaign setup & targeting',
      'Ad creative development',
      'Basic audience targeting',
      'Campaign delivery report',
    ],
    cta: '🚀 START WITH $150',
    highlight: false,
    label: 'BEST VALUE TO START',
  },
  {
    id: 'growth',
    name: 'GROWTH',
    subtitle: 'Telegram Ads + Content System',
    price: '$300',
    period: '',
    description: 'Ads combined with content strategy',
    features: [
      'All Starter services',
      'Content calendar',
      'Promotional content',
      'AI-enhanced content',
      'Creative variations',
      'Campaign optimization',
      'Content strategy',
      'Performance review',
    ],
    cta: '🚀 BUILD GROWTH SYSTEM',
    highlight: true,
    label: 'POPULAR',
  },
  {
    id: 'ai-growth',
    name: 'AI GROWTH',
    subtitle: 'AI Growth & Automation',
    price: '$700',
    period: '/month',
    description: 'Complete AI-powered growth system',
    features: [
      'Telegram Ads management',
      'Channel content automation',
      'Promotional posts',
      'User-selected content',
      'AI-enhanced professional content',
      'Content workflows',
      'Campaign optimization',
      'Monthly growth strategy',
      'Reporting',
      'Ongoing support',
    ],
    cta: '🚀 BUILD MY AI SYSTEM',
    highlight: false,
    label: 'MOST ADVANCED',
  },
];

export const FAQS = [
  { q: 'What do you provide?', a: 'Telegram advertising, AI-assisted content, automation and growth systems.' },
  { q: 'Which industries do you support?', a: 'Trading, crypto, education, gaming, business, communities and other Telegram-based businesses.' },
  { q: 'Do you guarantee results?', a: 'No. Campaign outcomes depend on audience, creative quality, offer, channel quality and platform conditions. We do not guarantee specific subscriber counts, revenue, conversions or financial returns.' },
  { q: 'Do you create content?', a: 'Yes, depending on the selected package. Our AI Content Engine creates professionally structured content reviewed by humans.' },
  { q: 'Do you manage campaigns?', a: 'Yes, according to the selected service and package.' },
  { q: 'Do you offer monthly management?', a: 'Yes. Our AI Growth package at $700/month includes ongoing campaign management, content automation and support.' },
  { q: 'How do I start?', a: 'Contact us through Telegram and describe your channel and objective. We will recommend a suitable package.' },
  { q: 'What happens after payment?', a: 'The agreed campaign/service workflow begins according to the selected package and scope.' },
];

export const TRUST_ITEMS = [
  '✓ Clear deliverables',
  '✓ Defined packages',
  '✓ Direct support',
  '✓ No guaranteed results',
  '✓ No misleading claims',
  '✓ Human-reviewed content',
  '✓ Transparent communication',
];

export const WHY_US = [
  { icon: '📱', title: 'Telegram Native', desc: 'Designed around Telegram-based businesses.' },
  { icon: '🤖', title: 'AI Assisted', desc: 'Modern AI-assisted workflows.' },
  { icon: '🌐', title: 'Multi-Niche', desc: 'Not limited to one vertical.' },
  { icon: '👁️', title: 'Human Reviewed', desc: 'AI output is reviewed before use.' },
  { icon: '🔍', title: 'Transparent', desc: 'Clear services and pricing.' },
  { icon: '📈', title: 'Scalable', desc: 'Architecture designed for future automation.' },
];

export const CONFIGURATOR_OPTIONS = {
  needs: ['Ads', 'Content', 'Automation', 'Complete Growth System'],
  industries: ['Trading', 'Crypto', 'Education', 'Gaming', 'Business', 'Other'],
  stages: ['Starting', 'Growing', 'Scaling'],
};

export const REFUND_POLICY = {
  title: 'NO REFUND POLICY',
  content: 'Because our services involve campaign preparation, content production, setup and execution, payments are generally non-refundable once agreed work has started. Customers should review the selected package, scope and deliverables before purchase.',
};

export const DISCLAIMER = {
  marketing: 'We provide advertising, marketing and content services. Campaign outcomes depend on audience, creative quality, offer, channel quality and platform conditions. We do not guarantee specific subscriber counts, revenue, conversions or financial returns.',
  financial: 'Our services do not constitute financial advice or a guarantee of investment performance.',
};

// Analytics event names (prepare for future integration)
export const ANALYTICS_EVENTS = {
  PAGE_VIEW: 'page_view',
  HERO_CTA_CLICK: 'hero_cta_click',
  TELEGRAM_CLICK: 'telegram_click',
  CHANNEL_CLICK: 'channel_click',
  PRICING_VIEW: 'pricing_view',
  PRICING_SELECT: 'pricing_select',
  CONFIGURATOR_START: 'configurator_start',
  CONFIGURATOR_COMPLETE: 'configurator_complete',
  LEAD_SUBMIT: 'lead_submit',
  FAQ_OPEN: 'faq_open',
} as const;
