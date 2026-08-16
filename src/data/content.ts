// ============================================================
// CMS-READY CONTENT DATA LAYER - PREMIUM AGENCY POSITIONING
// ============================================================

export const BRAND = {
  name: 'Adstele Agency',
  tagline: 'Premium Performance Marketing',
  supportingLine: 'META ADS × GOOGLE ADS × TELEGRAM ADS',
  statement: 'Your Meta, Google & Telegram ads — planned, launched and scaled by expert media buyers. Predictable growth, zero dashboard stress.',
  copyright: '© 2026 J.B GOUTTAM. All rights reserved.',
};

export const LINKS = {
  telegramSupport: 'https://t.me/Adstele_support',
  telegramChannel: 'https://t.me/adstele_agency',
};

export const CURRENCY = '₹';

export const NAV_ITEMS = [
  { label: 'Platform', href: '#platform' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const SERVICES = [
  {
    id: 'meta-ads',
    icon: '📘',
    title: 'META ADS MANAGEMENT',
    subtitle: 'Facebook & Instagram Advertising',
    description: 'Full-funnel Facebook & Instagram campaigns — researched, launched and scaled daily.',
    details: ['Audience research & targeting', 'Pixel & CAPI setup', 'Daily campaign monitoring', 'Budget scaling strategy', 'Monthly performance reporting'],
  },
  {
    id: 'google-ads',
    icon: '🔍',
    title: 'GOOGLE ADS MANAGEMENT',
    subtitle: 'Search, Display & YouTube Ads',
    description: 'Capture ready-to-buy search traffic with precise keywords, bids and conversion tracking.',
    details: ['Keyword research & strategy', 'Search & display campaigns', 'Conversion tracking setup', 'Bid & budget optimization', 'Monthly performance reporting'],
  },
  {
    id: 'telegram-ads',
    icon: '📢',
    title: 'TELEGRAM ADS',
    subtitle: 'Direct Telegram Marketing',
    description: 'Own attention inside engaged Telegram communities with TON Ads and direct placements.',
    details: ['Campaign strategy', 'TON Ads management', 'Channel rank optimization', 'Audience targeting', 'Direct placements'],
  },
  {
    id: 'website',
    icon: '🖥️',
    title: 'HIGH-CONVERTING WEBSITES',
    subtitle: 'Web & Landing Page Development',
    description: 'Lightning-fast pages engineered to turn your ad clicks into customers.',
    details: ['Business websites', 'Landing pages for ad campaigns', 'Mobile-responsive design', 'Fast, modern builds', 'Conversion rate optimization (CRO)'],
  },
  {
    id: 'creative',
    icon: '🎨',
    title: 'AD CREATIVE DESIGN',
    subtitle: 'Performance Visuals',
    description: 'Scroll-stopping visuals, A/B tested until we find your winning angle.',
    details: ['Static ad creatives', 'Short-form ad videos', 'A/B creative testing', 'Brand-consistent design', 'Platform-optimized formats'],
  },
];

export const PRICING = [
  {
    id: 'telegram-ads',
    name: 'TELEGRAM ADS',
    subtitle: 'Complete Telegram Ad Package',
    price: '₹14,999',
    period: '',
    description: 'End-to-end Telegram campaign — setup, targeting, creative & launch.',
    features: [
      'Telegram TON Ad campaign',
      'Campaign setup & targeting',
      'Ad creative development',
      'Channel rank optimization',
      'Delivery & performance report',
    ],
    cta: 'START TELEGRAM ADS',
    highlight: false,
    label: 'ONE-TIME SETUP',
  },
  {
    id: 'meta-ads',
    name: 'META ADS',
    subtitle: 'Facebook & Instagram Management',
    price: '₹3,199',
    period: '/month',
    description: 'Full monthly management of your Facebook & Instagram campaigns.',
    features: [
      'Facebook & Instagram setup',
      'Audience research & targeting',
      'Ad creative guidance',
      'Daily campaign monitoring',
      'Budget & bid optimization',
      'Monthly performance report',
    ],
    cta: 'START META ADS',
    highlight: true,
    label: 'MOST POPULAR',
  },
  {
    id: 'google-ads',
    name: 'GOOGLE ADS',
    subtitle: 'Search, Display & YouTube',
    price: '₹3,599',
    period: '/month',
    description: 'Search, Display & YouTube — tracked, tuned and optimized monthly.',
    features: [
      'Keyword research & strategy',
      'Search & display campaigns',
      'Conversion tracking setup',
      'Bid & budget optimization',
      'Monthly performance report',
    ],
    cta: 'START GOOGLE ADS',
    highlight: false,
    label: 'HIGH INTENT TRAFFIC',
  },
  {
    id: 'website',
    name: 'CUSTOM WEBSITES',
    subtitle: 'Web & Landing Pages',
    price: 'Custom',
    period: ' Quote',
    description: 'Premium sites & landing pages built to convert paid traffic.',
    features: [
      'Business websites',
      'High-converting landing pages',
      'Mobile-responsive design',
      'Lightning-fast load speeds',
      'Direct requirement discussion',
    ],
    cta: 'GET A CUSTOM QUOTE',
    highlight: false,
    label: 'TAILORED FOR YOU',
  },
];

export const FAQS = [
  { q: 'What services do you provide?', a: 'We provide premium paid advertising management on Meta (Facebook & Instagram), Google Ads, and Telegram, along with high-converting custom website development.' },
  { q: 'How much does Meta Ads management cost?', a: 'Our expert Meta Ads management is ₹3,199 per month, which includes campaign setup, audience targeting, daily monitoring, and scaling.' },
  { q: 'How much does Google Ads management cost?', a: 'Google Ads management is ₹3,599 per month, covering Search, Display, YouTube, conversion tracking, and ongoing optimization.' },
  { q: 'How much does Telegram Ads cost?', a: 'Our Telegram Ads package is a one-time ₹14,999, which covers end-to-end setup, targeting, creative, and launch of your campaign.' },
  { q: 'Do you build websites or landing pages?', a: 'Yes. We build premium, fast-loading websites and landing pages optimized to convert your ad traffic. Pricing is custom based on your exact needs.' },
  { q: 'Do you guarantee ROAS or specific results?', a: 'No professional agency can guarantee specific financial returns due to market variables, product quality, and platform changes. We guarantee expert, data-driven management to give you the highest possible chance of success.' },
  { q: 'Who manages my campaigns?', a: 'A dedicated, experienced media buyer from our team will manage your account and monitor your campaigns daily.' },
  { q: 'How do I start?', a: 'Click the "Talk to Us" button to message us on Telegram. Tell us about your business and goals, and we will set up your campaigns.' },
];

export const REFUND_POLICY = {
  title: 'NO REFUND POLICY',
  content: 'Because our services involve extensive campaign preparation, strategic setup, and active management, payments are non-refundable once work has commenced. Please review the service deliverables before purchasing.',
};

export const DISCLAIMER = {
  marketing: 'We sell professional advertising management and web development services. Campaign performance depends on market demand, creative quality, offer strength, and platform algorithms. We do not guarantee specific sales, revenue, or ROAS.',
  financial: 'Our marketing services do not constitute financial or investment advice.',
};

export const HERO_STATS = [
  { value: 4.8, decimals: 1, prefix: '', suffix: 'x', label: 'AVG. ROAS DELIVERED' },
  { value: 120, decimals: 0, prefix: '', suffix: '+', label: 'CAMPAIGNS LAUNCHED' },
  { value: 2, decimals: 0, prefix: '₹', suffix: 'Cr+', label: 'AD SPEND MANAGED' },
  { value: 24, decimals: 0, prefix: '', suffix: '/7', label: 'MONITORING & SUPPORT' },
];

export const PROBLEMS = [
  {
    icon: '📉',
    title: 'YOUR ADS HIT A CEILING',
    description: 'Bigger budgets, same results. Scaling needs fresh creatives, new angles and daily bid work.',
  },
  {
    icon: '💸',
    title: 'BUDGET LEAKS DAILY',
    description: 'Wrong targeting and broken tracking silently burn 30–40% of your ad spend every month.',
  },
  {
    icon: '⏰',
    title: 'NO TIME TO OPTIMIZE',
    description: 'You run the business. Daily monitoring, testing and reports are a second job — ours, not yours.',
  },
];

export const NICHES = [
  'D2C BRANDS',
  'E-COMMERCE',
  'ED-TECH',
  'REAL ESTATE',
  'SAAS',
  'HEALTH & FITNESS',
  'LOCAL BUSINESS',
  'FINANCE',
];

export const STANDARD = [
  {
    icon: '👤',
    title: 'DEDICATED MEDIA BUYER',
    description: 'One experienced buyer owns your account end-to-end — not a rotating support queue.',
  },
  {
    icon: '🛡️',
    title: 'YOUR BUDGET, YOURS',
    description: 'Ad spend goes straight to the platform. We bill only our management fee — full transparency.',
  },
  {
    icon: '📊',
    title: 'PLAIN-LANGUAGE REPORTS',
    description: 'One clear monthly report telling you exactly what scaled and what we fixed.',
  },
];

export const WORKFLOW = [
  {
    step: '01',
    icon: '🎯',
    title: 'STRATEGY & AUDIT',
    description: 'We audit your business, audience and competitors, then build a custom media plan around your goals.',
  },
  {
    step: '02',
    icon: '🚀',
    title: 'SETUP & LAUNCH',
    description: 'Pixels, conversion tracking and campaigns go live across Meta, Google and Telegram — handled end-to-end.',
  },
  {
    step: '03',
    icon: '⚙️',
    title: 'DAILY OPTIMIZATION',
    description: 'Bids, budgets, creatives and targeting are tuned every single day to squeeze out maximum performance.',
  },
  {
    step: '04',
    icon: '📈',
    title: 'SCALE & REPORT',
    description: 'Winning campaigns scale profitably. You get a clear monthly performance report in plain language.',
  },
];

// Per-section 3D visual identity — drives the global scene palette,
// aurora glow colors and particle tints as the visitor scrolls.
export const SCENE_THEMES = {
  hero: { dust: '#cbd5e1', aurora: ['#0ea5e9', '#8b5cf6', '#06b6d4'] },
  problem: { dust: '#fda4af', aurora: ['#fda4af', '#fcd34d', '#fecdd3'] },
  services: { dust: '#93c5fd', aurora: ['#bae6fd', '#a5f3fc', '#c7d2fe'] },
  workflow: { dust: '#c4b5fd', aurora: ['#c4b5fd', '#a5b4fc', '#ddd6fe'] },
  pricing: { dust: '#6ee7b7', aurora: ['#a7f3d0', '#99f6e4', '#bbf7d0'] },
  contact: { dust: '#a5f3fc', aurora: ['#a5f3fc', '#c4b5fd', '#bae6fd'] },
} as const;
