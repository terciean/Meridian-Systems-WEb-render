import { BellRing, Calendar, Eye, Users } from 'lucide-react';

const STEPS = [
  {
    icon: Users,
    title: 'A prospect picks a free time',
    body: 'They choose from the times you have made available, so you only meet people at moments you have agreed to.',
  },
  {
    icon: Calendar,
    title: 'Booked into your calendar and CRM',
    body: 'The meeting appears in your calendar automatically. With Lead Systems & CRM, it is also saved to the lead record with the details they shared.',
  },
  {
    icon: BellRing,
    title: 'Alarms ring before every meeting',
    body: 'Your phone sounds an alarm 24 hours and 15 minutes before each meeting, so no booking is ever missed.',
  },
  {
    icon: Eye,
    title: 'Every step is shown to you',
    body: 'Before launch, we walk you through each part of the setup, so nothing runs in the background without your knowledge.',
  },
];

export function MeetingBookingSection() {
  return (
    <section data-reveal className="px-6 pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl space-y-4">
          <p className="section-label">Meeting booking</p>
          <h2 className="text-3xl font-bold text-ink-50 md:text-4xl">How booking works, step by step.</h2>
          <p className="leading-relaxed text-ink-300">
            Every meeting is booked automatically from your lead system, with alarms and CRM records so nothing slips. Here is exactly what happens, with nothing hidden.
          </p>
        </div>
        <ol className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="panel-interactive p-8">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-teal-400/40 bg-teal-500/10 text-teal-200">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-display text-sm font-semibold text-ink-500">0{index + 1}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-ink-50">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-300">{step.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
