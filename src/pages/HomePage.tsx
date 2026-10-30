import { HeroSection } from '@/components/home/HeroSection';
import { PathwaysSection } from '@/components/home/PathwaysSection';
import { ConnectedSection } from '@/components/home/ConnectedSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { ProofSection } from '@/components/home/ProofSection';
import { SkillShowcaseSection } from '@/components/home/SkillShowcaseSection';
import { ClosingCta } from '@/components/shared/ClosingCta';
import { ENQUIRE_PATH } from '@/data/navigation';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

export function HomePage() {
  useDocumentMeta({
    title: 'Meridian Systems | CRM and Lead Management South Africa',
    description:
      'Meridian Systems builds CRM and lead management systems for South African businesses. Warm leads are followed up automatically, meetings are booked with phone alarms, and websites, stock and content support the whole business.',
  });

  return (
    <>
      <HeroSection />
      <SkillShowcaseSection />
      <PathwaysSection />
      <ConnectedSection />
      <ProcessSection />
      <ProofSection />
      <ClosingCta
        title="Ready to see your enquiries turn into meetings?"
        body="Answer a short questionnaire and we will come back with a clear plan for your business."
        to={ENQUIRE_PATH}
      />
    </>
  );
}
