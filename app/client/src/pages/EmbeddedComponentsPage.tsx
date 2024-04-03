import { PageWrapper } from 'components';
import {
  Overview,
  Installation,
  AuthProvider,
  //CreateUserSection,
  LinkAccountSection,
  PaymentDetailsSection
} from 'features/EBComponentSections';

export const EmbeddedComponentsPage = () => {
  return (
    <PageWrapper>
      <Overview />
      <Installation />
      <AuthProvider />
   {/*    <CreateUser /> */}
      <PaymentDetailsSection />
      <LinkAccountSection />
    </PageWrapper>
  );
};
