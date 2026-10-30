export interface Testimonial {
  company: string;
  quote: string;
  logoSrc?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    company: 'Impact Innovations Media',
    quote:
      'Tristan built an amazing website for us and set up a streamlined lead generation system that actually delivers. Super knowledgeable, responsive, and clear throughout the whole process. If you need a website that actually generates leads for your business, he is your guy!',
    logoSrc: '/logo.jpg',
  },
  {
    company: 'Supremo',
    quote:
      'Incredible experience! Tristan turned our vision into a polished website and plugged in an automated lead management pipeline that saves us hours every week. From custom design to seamless CRM integration, everything works like clockwork.',
  },
];
