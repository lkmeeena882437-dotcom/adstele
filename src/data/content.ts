// CMS-ready content layer. Replace testimonial examples with verified client
// results before launch.

export const BRAND = {
  name: 'Adstele Agency',
  tagline: 'Premium Performance Marketing',
  supportingLine: 'META ADS • GOOGLE ADS • TELEGRAM ADS',
  statement: 'We plan, launch and optimize your Meta, Google and Telegram ads — so you get clear results without living inside an ad dashboard.',
  copyright: '© 2026 J.B GOUTTAM. All rights reserved.',
};

export const LINKS = {
  telegramSupport: 'https://t.me/Adstele_support',
  telegramChannel: 'https://t.me/adstele_agency',
  calendly: 'https://calendly.com/adstele-agency/strategy-call',
};

export const CURRENCY = 'Rs';

export const NAV_ITEMS = [
  { label: 'Platform', href: '#platform' },
  { label: 'Services', href: '#services' },
  { label: 'Results', href: '#results' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const SERVICES = [
  {
    id: 'meta-ads', icon: 'meta', title: 'META ADS MANAGEMENT', subtitle: 'Facebook & Instagram Advertising',
    description: 'We research, launch and improve Facebook and Instagram campaigns every day.',
    details: ['Audience research & targeting', 'Pixel & CAPI setup', 'Daily campaign monitoring', 'Budget scaling strategy', 'Monthly performance reporting'],
  },
  {
    id: 'google-ads', icon: 'search', title: 'GOOGLE ADS MANAGEMENT', subtitle: 'Search, Display & YouTube Ads',
    description: 'Reach people already searching for your offer with focused keywords, bids and reliable tracking.',
    details: ['Keyword research & strategy', 'Search & display campaigns', 'Conversion tracking setup', 'Bid & budget optimization', 'Monthly performance reporting'],
  },
  {
    id: 'telegram-ads', icon: 'broadcast', title: 'TELEGRAM ADS', subtitle: 'Direct Telegram Marketing',
    description: 'Reach active Telegram communities through TON Ads and carefully chosen direct placements.',
    details: ['Campaign strategy', 'TON Ads management', 'Channel rank optimization', 'Audience targeting', 'Direct placements'],
  },
  {
    id: 'website', icon: 'monitor', title: 'HIGH-CONVERTING WEBSITES', subtitle: 'Web & Landing Page Development',
    description: 'Fast, focused pages built to turn more ad clicks into enquiries and sales.',
    details: ['Business websites', 'Landing pages for ad campaigns', 'Mobile-responsive design', 'Fast, modern builds', 'Conversion rate optimization (CRO)'],
  },
  {
    id: 'creative', icon: 'creative', title: 'AD CREATIVE DESIGN', subtitle: 'Performance Visuals',
    description: 'Clear, on-brand ad visuals tested to find the messages your audience responds to.',
    details: ['Static ad creatives', 'Short-form ad videos', 'A/B creative testing', 'Brand-consistent design', 'Platform-optimized formats'],
  },
] as const;

export const PRICING = [
  {
    id: 'telegram-ads', name: 'TELEGRAM ADS', subtitle: 'Complete Telegram Ad Package',
    description: 'End-to-end Telegram campaign — setup, targeting, creative & launch.',
    features: ['Telegram TON Ad campaign', 'Campaign setup & targeting', 'Ad creative development', 'Channel rank optimization', 'Delivery & performance report'],
    highlight: false, label: 'ONE-TIME SETUP',
  },
  {
    id: 'meta-ads', name: 'META ADS', subtitle: 'Facebook & Instagram Management',
    description: 'Full monthly management of your Facebook & Instagram campaigns.',
    features: ['Facebook & Instagram setup', 'Audience research & targeting', 'Ad creative guidance', 'Daily campaign monitoring', 'Budget & bid optimization', 'Monthly performance report'],
    highlight: true, label: 'MOST POPULAR',
  },
  {
    id: 'google-ads', name: 'GOOGLE ADS', subtitle: 'Search, Display & YouTube',
    description: 'Search, Display & YouTube — tracked, tuned and optimized monthly.',
    features: ['Keyword research & strategy', 'Search & display campaigns', 'Conversion tracking setup', 'Bid & budget optimization', 'Monthly performance report'],
    highlight: false, label: 'HIGH INTENT TRAFFIC',
  },
  {
    id: 'website', name: 'CUSTOM WEBSITES', subtitle: 'Web & Landing Pages',
    description: 'Premium sites & landing pages built to convert paid traffic.',
    features: ['Business websites', 'High-converting landing pages', 'Mobile-responsive design', 'Lightning-fast load speeds', 'Direct requirement discussion'],
    highlight: false, label: 'TAILORED FOR YOU',
  },
];

export const FAQS = [
  { q: 'What services do you provide?', a: 'We provide premium paid advertising management on Meta (Facebook & Instagram), Google Ads, and Telegram, along with high-converting custom website development.' },
  { q: 'How much does Meta Ads management cost?', a: 'The fee depends on your goals and campaign scope. Message us on Telegram for a tailored quote; we confirm the full scope and fee before any work begins.' },
  { q: 'How much does Google Ads management cost?', a: 'The fee depends on your goals and campaign scope. Message us on Telegram for a tailored quote; we confirm the full scope and fee before any work begins.' },
  { q: 'How much does Telegram Ads cost?', a: 'The fee depends on the campaign scope and your goals. Message us on Telegram for a tailored quote; we confirm the full scope and fee before launch.' },
  { q: 'Do you build websites or landing pages?', a: 'Yes. We build premium, fast-loading websites and landing pages optimized to convert your ad traffic. Pricing is custom based on your exact needs.' },
  { q: 'Do you guarantee ROAS or specific results?', a: 'No. Results depend on your offer, market, budget and platform conditions. We provide careful, data-led management and clear reporting.' },
  { q: 'Who manages my campaigns?', a: 'A dedicated, experienced media buyer from our team will manage your account and monitor your campaigns daily.' },
  { q: 'How do I start?', a: 'Click the “Talk to Us” button to message us on Telegram. Tell us about your business and goals, and we will set up your campaigns.' },
];

export const REFUND_POLICY = {
  title: 'NO REFUND POLICY',
  content: 'Payments are non-refundable after setup or campaign work begins. Please confirm the scope and deliverables before purchasing.',
};

export const DISCLAIMER = {
  marketing: 'We sell professional advertising management and web development services. Campaign performance depends on market demand, creative quality, offer strength, and platform algorithms. We do not guarantee specific sales, revenue, or ROAS.',
  financial: 'Our marketing services do not constitute financial or investment advice.',
};

export const HERO_STATS = [
  { value: 4.8, decimals: 1, prefix: '', suffix: 'x', label: 'AVG. ROAS DELIVERED' },
  { value: 120, decimals: 0, prefix: '', suffix: '+', label: 'CAMPAIGNS LAUNCHED' },
  { value: 2, decimals: 0, prefix: 'Rs ', suffix: 'Cr+', label: 'AD SPEND MANAGED' },
  { value: 24, decimals: 0, prefix: '', suffix: '/7', label: 'MONITORING & SUPPORT' },
];

export const PROBLEMS = [
  { icon: 'trend-down', title: 'YOUR ADS STOP GROWING', description: 'Adding budget is not enough. Growth needs fresh creative, structured tests and careful bid changes.' },
  { icon: 'wallet', title: 'BUDGET LEAKS QUIETLY', description: 'Weak targeting, broken tracking and slow decisions can waste spend without making the problem obvious.' },
  { icon: 'clock', title: 'OPTIMIZATION TAKES TIME', description: 'You run the business. We handle the daily monitoring, testing and campaign decisions.' },
] as const;

export const NICHES = ['D2C BRANDS', 'E-COMMERCE', 'ED-TECH', 'REAL ESTATE', 'SAAS', 'HEALTH & FITNESS', 'LOCAL BUSINESS', 'FINANCE'];

export const STANDARD = [
  { icon: 'user', title: 'DEDICATED MEDIA BUYER', description: 'One experienced buyer owns your account end-to-end — not a rotating support queue.' },
  { icon: 'shield', title: 'YOUR BUDGET, YOURS', description: 'Ad spend goes straight to the platform. We bill only our management fee — full transparency.' },
  { icon: 'report', title: 'PLAIN-LANGUAGE REPORTS', description: 'One clear monthly report telling you exactly what scaled — and what we fixed.' },
] as const;

export const WORKFLOW = [
  { step: '01', icon: 'target', title: 'STRATEGY & AUDIT', description: 'We review your business, audience and competitors, then set a practical media plan around your goal.' },
  { step: '02', icon: 'rocket', title: 'SETUP & LAUNCH', description: 'We set up tracking and launch the right campaigns across Meta, Google or Telegram.' },
  { step: '03', icon: 'settings', title: 'DAILY OPTIMIZATION', description: 'We monitor bids, budgets, creative and targeting, then improve what the data shows.' },
  { step: '04', icon: 'trend-up', title: 'SCALE & REPORT', description: 'We grow the strongest campaigns and send a clear monthly report in plain language.' },
] as const;

export const COMPARISON = {
  columns: [
    { id: 'inhouse', icon: 'office', name: 'IN-HOUSE TEAM', tagline: 'Hire & manage yourself', highlight: false },
    { id: 'freelance', icon: 'laptop', name: 'FREELANCER', tagline: 'One person, mixed skills', highlight: false },
    { id: 'adstele', icon: 'bolt', name: 'ADSTELE', tagline: 'Dedicated media buyer team', highlight: true },
  ],
  rows: [
    { label: 'FEE APPROACH', inhouse: 'Fixed payroll & benefits', freelance: 'Varies by scope & experience', adstele: 'Custom scope, agreed upfront' },
    { label: 'DAILY OPTIMIZATION', inhouse: 'Depends on workload', freelance: 'Rarely daily', adstele: 'Every single day' },
    { label: 'PLATFORM COVERAGE', inhouse: 'Usually one platform', freelance: '1–2 platforms', adstele: 'Meta + Google + Telegram' },
    { label: 'REPORTING', inhouse: 'You build the reports', freelance: 'Screenshots, no insights', adstele: 'Plain-language monthly report' },
    { label: 'SCALING STRATEGY', inhouse: 'Trial & error', freelance: 'Limited experience', adstele: 'Proven scaling playbooks' },
    { label: 'TRANSPARENCY', inhouse: 'Hidden overhead costs', freelance: 'Ad spend unclear', adstele: 'Budget goes direct to platform' },
  ],
} as const;

export const SCENE_THEMES = {
  hero: { intensity: 1, dust: '#cbd5e1', aurora: ['#0ea5e9', '#8b5cf6', '#06b6d4'] },
  problem: { intensity: 0.85, dust: '#fda4af', aurora: ['#fda4af', '#fcd34d', '#fecdd3'] },
  services: { intensity: 0.9, dust: '#93c5fd', aurora: ['#bae6fd', '#a5f3fc', '#c7d2fe'] },
  workflow: { intensity: 0.8, dust: '#c4b5fd', aurora: ['#c4b5fd', '#a5b4fc', '#ddd6fe'] },
  compare: { intensity: 0.85, dust: '#a5b4fc', aurora: ['#93c5fd', '#c4b5fd', '#a5f3fc'] },
  pricing: { intensity: 0.9, dust: '#6ee7b7', aurora: ['#a7f3d0', '#99f6e4', '#bbf7d0'] },
  testimonials: { intensity: 0.85, dust: '#fde68a', aurora: ['#fcd34d', '#fbbf24', '#f59e0b'] },
  contact: { intensity: 1.15, dust: '#a5f3fc', aurora: ['#a5f3fc', '#c4b5fd', '#bae6fd'] },
} as const;
