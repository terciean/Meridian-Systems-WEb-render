import { MessageCircle } from 'lucide-react';
import { Link } from '@/lib/router';
import { CONTACT } from '@/data/contact';
import { ENQUIRE_PATH, NAV_ITEMS } from '@/data/navigation';
import { BrandMark } from '@/components/layout/BrandMark';

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-800 bg-ink-950">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-6">
          <BrandMark />
          <p className="max-w-sm text-sm leading-relaxed text-ink-300">
            Lead systems and CRM tools that turn enquiries into booked meetings, supported by websites, stock systems and content.
          </p>
        </div>

        <div>
          <h2 className="section-label mb-5">Explore</h2>
          <ul className="grid gap-3 text-sm text-ink-200">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition hover:text-teal-200">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="section-label mb-5">Start a conversation</h2>
          <Link to={ENQUIRE_PATH} className="btn-primary mb-4 w-full md:w-auto">
            Explore Your Business Needs
          </Link>
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-ink-200 transition hover:text-teal-200"
          >
            <MessageCircle className="h-4 w-4 text-teal-300" aria-hidden="true" />
            WhatsApp {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="border-t border-ink-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-ink-400 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Meridian Systems. All rights reserved.</p>
          <p>Lead systems and CRM, built to connect the whole business.</p>
        </div>
      </div>
    </footer>
  );
}
