import { PageWrapper } from 'components';
import {
  Overview,
  Installation,
  AuthProvider,
  LinkAccountSection,
  PaymentDetailsSection,
} from 'features/EBComponentSections';

export const EmbeddedComponentsPage = () => {
  return (
    <PageWrapper>
      <Overview />
      <Installation />
      <AuthProvider />
      <PaymentDetailsSection />
      <LinkAccountSection />
    </PageWrapper>
  );
};
