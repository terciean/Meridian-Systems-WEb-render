import { SiteLayout } from '@/components/layout/SiteLayout';
import { SolutionPage } from '@/components/solutions/SolutionPage';
import { SOLUTION_LIST } from '@/data/solutions';
import { ContactPage } from '@/pages/ContactPage';
import { EnquiryPage } from '@/pages/EnquiryPage';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { OurWorkPage } from '@/pages/OurWorkPage';
import { useLocation } from '@/lib/router';
import { useScrollReveal } from '@/lib/useScrollReveal';

function renderPage(pathname: string) {
  const solution = SOLUTION_LIST.find((item) => item.path === pathname);
  if (solution) {
    return <SolutionPage key={solution.slug} solution={solution} />;
  }

  switch (pathname) {
    case '/':
      return <HomePage />;
    case '/our-work':
      return <OurWorkPage />;
    case '/contact':
      return <ContactPage />;
    case '/enquire':
      return <EnquiryPage />;
    default:
      return <NotFoundPage />;
  }
}

function App() {
  const { pathname } = useLocation();
  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  useScrollReveal(normalizedPath);

  return <SiteLayout>{renderPage(normalizedPath)}</SiteLayout>;
}

export default App;
