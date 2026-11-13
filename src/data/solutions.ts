export type SolutionSlug =
  | 'lead-systems-crm'
  | 'website-design-seo'
  | 'booking-stock-systems'
  | 'video-production'
  | 'social-content'
  | 'meta-ads';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ValueStackItem {
  label: string;
  body: string;
  value?: string;
}

export interface InvestmentLine {
  label: string;
  price: string;
}

export interface Offer {
  painPoint: string;
  dreamOutcome: string;
  mechanismName: string;
  mechanismBody: string;
  valueStack: ValueStackItem[];
  investmentLines: InvestmentLine[];
  stackedValueNote?: string;
  guarantee?: string;
  urgencyNote?: string;
  closerCta: string;
}

export interface Solution {
  slug: SolutionSlug;
  path: string;
  navLabel: string;
  pathwayLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  offer: Offer;
  meetingBooking?: boolean;
  leadSegments?: boolean;
  faqs?: FaqItem[];
}

const SOLUTIONS: Record<SolutionSlug, Solution> = {
  'lead-systems-crm': {
    slug: 'lead-systems-crm',
    path: '/lead-systems-crm',
    navLabel: 'Lead Systems & CRM',
    pathwayLabel: 'Lead Systems & CRM',
    eyebrow: 'Core offer',
    title: 'CRM and Lead Management System South Africa | Ethos Creative Systems',
    description:
      'The Lead Control System: a CRM and lead management system for South African businesses. Captures every enquiry, automates follow-ups and books meetings with phone alarms.',
    offer: {
      painPoint:
        'Enquiries land in a WhatsApp chat, an inbox and a spreadsheet all at once — and the ones that matter most get followed up late, or not at all.',
      dreamOutcome:
        'Every enquiry gets captured and followed up automatically, every booked meeting gets a phone alarm before it starts, and you always know exactly where each relationship stands.',
      mechanismName: 'The Lead Control System',
      mechanismBody:
        'A CRM and lead tool built as one connected system: enquiries from your website, social and referrals land in a single pipeline, permission-based WhatsApp automation follows up warm leads on time, and a phone alarm rings 24 hours and 15 minutes before every booked meeting.',
      valueStack: [
        { label: 'CRM setup', body: 'Every client, note and stage on one screen.', value: 'R15,000' },
        { label: 'Lead capture tool', body: 'Website, social and referral enquiries into one pipeline.', value: 'R10,000' },
        {
          label: 'WhatsApp follow-up automation',
          body: 'Permission-based automated follow-up for warm leads.',
          value: 'R3,500',
        },
        {
          label: 'Phone alarms, powered by MacroDroid',
          body: '24hr and 15min alarm before every booked meeting, synced to the CRM record.',
          value: 'R2,000',
        },
        {
          label: 'POPIA-aware setup review',
          body: 'Personal data handling reviewed with you before go-live.',
          value: 'R2,500',
        },
      ],
      investmentLines: [
        { label: 'CRM setup (standalone)', price: 'R15,000' },
        { label: 'Lead capture tool (standalone)', price: 'R10,000' },
        { label: 'The Lead Control System (bundle)', price: 'R25,000' },
        {
          label: 'Co-management (optional)',
          price: 'From R5,000/month — covers up to 200 cold-outreach leads/month, R500 per extra 100',
        },
      ],
      stackedValueNote: 'Priced separately, these components total R33,000. The Lead Control System bundles all of it for R25,000.',
      guarantee:
        "If your booked-meeting rate doesn't visibly improve within 90 days of go-live, we keep working on your system for free until it does. Your current booked-meeting rate is recorded before go-live so this can be measured honestly.",
      urgencyNote: 'Every system is set up personally — onboarding starts within 1 week of your enquiry.',
      closerCta:
        "Answer a short questionnaire and we'll come back with a clear plan — what the system will do, and what it will cost, before any work begins.",
    },
    meetingBooking: true,
    leadSegments: true,
    faqs: [
      {
        question: 'What is a lead management system and do I need a CRM?',
        answer:
          'A lead management system captures enquiries, assigns them, follows them up and tracks each one until it becomes a client. A CRM (customer relationship management) keeps the full history of every client in one place. The Lead Control System combines both, so enquiries and client records never live in separate spreadsheets or inboxes.',
      },
      {
        question: 'Is the CRM POPIA compliant?',
        answer:
          'The system is designed with POPIA in mind. Warm leads opt in before they receive automated messages, cold leads are contacted personally, and we review how personal information is collected, stored and used with you during setup. We will always confirm your specific obligations with you rather than promise a blanket certification.',
      },
      {
        question: 'Can WhatsApp follow-ups be automated?',
        answer:
          'Yes, for warm leads who have asked to hear from you. Automated WhatsApp messages are not sent to cold leads, so your outreach stays personal and permission-based.',
      },
      {
        question: 'How do meeting alarms work?',
        answer:
          'When a prospect books a time, the meeting is added to your calendar and saved to the lead record in your CRM. Your phone then sounds an alarm 24 hours and 15 minutes before the meeting.',
      },
      {
        question: 'What happens if my booked-meeting rate does not improve?',
        answer:
          'We record your current booked-meeting rate before go-live. If it has not visibly improved within 90 days, we keep working on your system for free until it does.',
      },
      {
        question: 'Does it connect to the tools I already use?',
        answer:
          'Email, calendars and messaging tools can be connected to the lead pipeline. We confirm the full list of integrations for your business during setup, so you know exactly what is connected before anything goes live.',
      },
      {
        question: 'How do I get started?',
        answer:
          'Answer the short questionnaire on this site. We review your answers and come back with a clear plan, including what the system will do and what it will cost, before any work begins.',
      },
    ],
  },
  'website-design-seo': {
    slug: 'website-design-seo',
    path: '/website-design-seo',
    navLabel: 'Website & SEO',
    pathwayLabel: 'Website Design & SEO',
    eyebrow: 'Supporting solution',
    title: 'Website Design & SEO | Ethos Creative Systems',
    description:
      'Websites designed and built to be found on Google and to turn visitors into enquiries, with search-ready structure from day one.',
    offer: {
      painPoint:
        "A website that looks fine but doesn't say what you do clearly, doesn't rank, and doesn't send anyone toward an enquiry — it just sits there.",
      dreamOutcome:
        'A fast, clear website that explains your services in seconds, is built to be found on Google, and feeds every visitor straight into your lead pipeline.',
      mechanismName: 'Website Design & SEO',
      mechanismBody:
        'Design with a purpose, search-ready structure from day one, and every form and button connected to your enquiry pipeline.',
      valueStack: [
        { label: 'Design with a purpose', body: 'Each page is shaped around a clear message and a clear action.' },
        {
          label: 'Search-ready from day one',
          body: 'Page titles, descriptions, a sitemap and clean web addresses set up so search engines can read and rank your pages.',
        },
        {
          label: 'Connected to your lead system',
          body: 'Every form and button feeds straight into your enquiry pipeline, so website leads are never handled by hand.',
        },
      ],
      investmentLines: [
        { label: 'Website', price: 'R5,000' },
        { label: 'Website with SEO setup', price: 'R7,000' },
        { label: 'SEO setup on an existing site', price: 'R2,000' },
        { label: 'Page improvements', price: 'From R500' },
      ],
      closerCta: "Answer a short questionnaire and we'll come back with a clear plan for your site.",
    },
  },
  'booking-stock-systems': {
    slug: 'booking-stock-systems',
    path: '/booking-stock-systems',
    navLabel: 'Booking & Stock Systems',
    pathwayLabel: 'Booking & Stock Systems',
    eyebrow: 'Supporting solution',
    title: 'Booking & Stock Systems | Ethos Creative Systems',
    description:
      'Booking and stock tracking that shows what you have, what is moving and when to reorder, connected to your sales and lead systems.',
    offer: {
      painPoint:
        "Bookings and stock get tracked in your head, a notebook or a few apps that don't talk to each other — so you find out something is wrong after a client already has.",
      dreamOutcome:
        "One live view of what you have, what's booked, and when you'll need more — updated automatically as sales and bookings happen.",
      mechanismName: 'Booking & Stock Systems',
      mechanismBody:
        'Stock levels, locations and movements visible in one place, reorder alerts before you run out, and bookings connected to the same lead pipeline so nothing is double-booked or guessed at.',
      valueStack: [
        { label: 'One live view of stock', body: 'Stock levels, locations and movements visible in one place, updated as sales are made.' },
        { label: 'Reorder alerts', body: "You're told when an item reaches the level you set, before it runs out." },
        {
          label: 'Connected to sales and bookings',
          body: 'Orders, enquiries and bookings reduce stock automatically, keeping the numbers honest.',
        },
      ],
      investmentLines: [{ label: 'Booking & stock systems', price: 'Quoted per workflow' }],
      closerCta: "Tell us how your bookings and stock work today and we'll quote a system built around it.",
    },
  },
  'video-production': {
    slug: 'video-production',
    path: '/video-production',
    navLabel: 'Video Production',
    pathwayLabel: 'Video Production & Editing',
    eyebrow: 'Supporting solution',
    title: 'Video Production & Editing | Ethos Creative Systems',
    description: 'Sales videos, AI-assisted promos and editing, built from your services and ready to share across your channels.',
    offer: {
      painPoint: "You know video sells, but producing it eats the time you don't have — so it never gets made.",
      dreamOutcome: 'Sales videos and promos ready to use, without you picking up a camera or spending days editing.',
      mechanismName: 'Video Production & Editing',
      mechanismBody:
        'Sales videos, AI-assisted promos and editing created from your services and messages, ready to share across your channels.',
      valueStack: [
        { label: 'Sales videos', body: 'Built around your core offer, ready to use in the funnel and on social.' },
        { label: 'AI-assisted promos', body: 'Generated video content created from your services and messages.' },
        { label: 'Editing', body: 'Existing footage cut, polished and made ready to publish.' },
      ],
      investmentLines: [{ label: 'Video production & editing', price: 'Quoted per project' }],
      closerCta: "Tell us what you need video for and we'll quote the project.",
    },
  },
  'social-content': {
    slug: 'social-content',
    path: '/social-content',
    navLabel: 'Social Content',
    pathwayLabel: 'Social Content',
    eyebrow: 'Supporting solution',
    title: 'Social Content Management | Ethos Creative Systems',
    description: 'Social media management with static graphics and generated video, planned and scheduled to keep your business visible.',
    offer: {
      painPoint: 'Your pages go quiet for weeks at a time because content takes longer than the work that actually pays.',
      dreamOutcome:
        'Consistent, on-brand posts that keep your business visible, planned and scheduled without taking time away from your work.',
      mechanismName: 'Social Content',
      mechanismBody:
        'Posting planned, approved and scheduled, with on-brand static graphics and generated video built around your lead system, so every post supports the enquiries and meetings you are working toward.',
      valueStack: [
        { label: 'Social media management', body: 'Posting planned, approved and scheduled.' },
        { label: 'Static graphics', body: 'On-brand graphics for posts, offers and announcements.' },
        { label: 'Generated video', body: 'Short video content created from your services and messages.' },
      ],
      investmentLines: [
        { label: 'Social content', price: 'R1,000/month — 2 static posts per week' },
        { label: 'Launch bundle', price: 'R5,000 — 1 AI promo + first month of static content' },
      ],
      closerCta: "Tell us about your channels and posting pace and we'll set up a plan.",
    },
  },
  'meta-ads': {
    slug: 'meta-ads',
    path: '/meta-ads',
    navLabel: 'Meta Ads',
    pathwayLabel: 'Meta Ad Setup & Management',
    eyebrow: 'Supporting solution',
    title: 'Meta Ad Setup & Management | Ethos Creative Systems',
    description: 'Meta ad campaigns set up and managed, connected straight into your lead pipeline so every ad lead is followed up.',
    offer: {
      painPoint: "Ad spend disappears into clicks that never turn into an actual enquiry, because there's no system behind the campaign.",
      dreamOutcome: 'Ad spend that turns into booked meetings, because every click lands inside the same lead pipeline instead of a dead end.',
      mechanismName: 'Meta Ad Setup & Management',
      mechanismBody:
        'Campaigns, audiences and creative set up and managed on Meta, connected straight into your lead pipeline so every ad lead is captured and followed up the same way as every other enquiry.',
      valueStack: [
        { label: 'Campaign setup', body: 'Audiences, placements and creative built around your offer.' },
        { label: 'Ongoing management', body: 'Campaigns monitored and adjusted as they run.' },
        { label: 'Connected to your lead system', body: 'Every ad lead lands in the same pipeline as your other enquiries.' },
      ],
      investmentLines: [{ label: 'Meta ad setup & management', price: 'Quoted separately from ad spend' }],
      closerCta: "Tell us about your ad goals and budget and we'll quote the setup.",
    },
  },
};

export const SOLUTION_LIST: Solution[] = [
  SOLUTIONS['lead-systems-crm'],
  SOLUTIONS['website-design-seo'],
  SOLUTIONS['booking-stock-systems'],
  SOLUTIONS['video-production'],
  SOLUTIONS['social-content'],
  SOLUTIONS['meta-ads'],
];
