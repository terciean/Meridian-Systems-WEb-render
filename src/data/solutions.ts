export type SolutionSlug = 'lead-systems-crm' | 'website-design-seo' | 'stock-systems' | 'content-video';

export interface SolutionFeature {
  title: string;
  body: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Solution {
  slug: SolutionSlug;
  path: string;
  navLabel: string;
  pathwayLabel: string;
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  intro: string;
  features: SolutionFeature[];
  automations?: SolutionFeature;
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
    title: 'CRM and Lead Management System South Africa | Meridian Systems',
    description:
      'A CRM and lead management system for South African businesses. Captures every enquiry, automates follow-ups and books meetings with phone alarms.',
    eyebrow: 'Core offer',
    headline: 'CRM and lead management that turns enquiries into booked meetings.',
    intro:
      'Meridian Systems sits at the centre of your business. A CRM and lead management system that captures enquiries in one place, follows up on time and books every meeting, built for South African businesses.',
    features: [
      {
        title: 'Enquiries captured in one place',
        body: 'Website forms, social messages and referrals arrive in a single pipeline, so nothing is missed or left in an inbox.',
      },
      {
        title: 'Follow-ups that never slip',
        body: 'Each lead has a clear next action and a reminder, so the right person follows up at the right moment.',
      },
      {
        title: 'A customer view you can trust',
        body: 'Every client history, note and stage sits on one screen, so you always know where a relationship stands.',
      },
    ],
    automations: {
      title: 'Automations, built in',
      body: 'Routine steps run on their own: a welcome message after an enquiry, a phone alarm before every booked meeting, or a task created when a lead changes stage. Each automation is explained to you before it goes live.',
    },
    meetingBooking: true,
    leadSegments: true,
    faqs: [
      {
        question: 'What is a lead management system and do I need a CRM?',
        answer:
          'A lead management system captures enquiries, assigns them, follows them up and tracks each one until it becomes a client. A CRM (customer relationship management) keeps the full history of every client in one place. Meridian Systems combines both, so enquiries and client records never live in separate spreadsheets or inboxes.',
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
    title: 'Website Design & SEO | Meridian Systems',
    description:
      'Websites designed and built to be found on Google and to turn visitors into enquiries, with search-ready structure from day one.',
    eyebrow: 'Supporting solution',
    headline: 'A website built to be found and to convert.',
    intro:
      'Your website is the front door to your lead system. We design and build it to load fast, explain your services clearly and send every visitor toward an enquiry.',
    features: [
      {
        title: 'Design with a purpose',
        body: 'Each page is shaped around a clear message and a clear action, so visitors understand what you do within seconds.',
      },
      {
        title: 'Search-ready from day one',
        body: 'Page titles, descriptions, a sitemap and clean web addresses are set up so search engines can read and rank your pages.',
      },
      {
        title: 'Connected to your lead system',
        body: 'Every form and button feeds straight into your enquiry pipeline, so website leads are never handled by hand.',
      },
    ],
  },
  'stock-systems': {
    slug: 'stock-systems',
    path: '/stock-systems',
    navLabel: 'Stock Systems',
    pathwayLabel: 'Stock Systems',
    title: 'Stock Systems | Meridian Systems',
    description:
      'Stock tracking that shows what you have, what is moving and when to reorder, connected to your sales and lead systems.',
    eyebrow: 'Supporting solution',
    headline: 'Know what you have, and when you will need more.',
    intro:
      'Stock is a supporting part of the same system. Sales from your lead pipeline and your website update your stock levels, so reorders are timed rather than guessed.',
    features: [
      {
        title: 'One live view of stock',
        body: 'Stock levels, locations and movements are visible in one place, updated as sales are made.',
      },
      {
        title: 'Reorder alerts',
        body: 'You are told when an item reaches the level you set, before it runs out and before a client is disappointed.',
      },
      {
        title: 'Connected to sales',
        body: 'Orders and enquiries from your lead system reduce stock automatically, keeping the numbers honest.',
      },
    ],
    automations: {
      title: 'Automations, built in',
      body: 'Low stock can trigger a reorder task, a supplier message or an alert on your phone. The rules are agreed with you and shown in full before launch.',
    },
  },
  'content-video': {
    slug: 'content-video',
    path: '/content-video',
    navLabel: 'Content & Video',
    pathwayLabel: 'Content & Video',
    title: 'Content & Video | Meridian Systems',
    description:
      'Social media management with static graphics and generated video, planned and scheduled to keep your business visible.',
    eyebrow: 'Supporting solution',
    headline: 'Consistent content that keeps your business visible.',
    intro:
      'Social media management with static and video content, planned around your lead system so every post supports the enquiries and meetings you are working toward.',
    features: [
      {
        title: 'Social media management',
        body: 'Posting is planned, approved and scheduled, so your pages stay active without taking time away from your work.',
      },
      {
        title: 'Static graphics',
        body: 'On-brand graphics for posts, offers and announcements, built in the same charcoal, teal and ember palette as your brand.',
      },
      {
        title: 'Generated video',
        body: 'Short video content created from your services and messages, ready to share across your channels.',
      },
    ],
  },
};

export const SOLUTION_LIST: Solution[] = [
  SOLUTIONS['lead-systems-crm'],
  SOLUTIONS['website-design-seo'],
  SOLUTIONS['stock-systems'],
  SOLUTIONS['content-video'],
];
