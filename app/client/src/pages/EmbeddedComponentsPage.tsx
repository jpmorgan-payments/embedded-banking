import { PageWrapper } from 'components';
import {
  Overview,
  Installation,
  AuthProvider,
  LinkAccountSection,
} from 'features/EBComponentSections';

export const EmbeddedComponentsPage = () => {
  return (
    <PageWrapper>
      <Overview />
      <Installation />
      <AuthProvider />
      <LinkAccountSection />
    </PageWrapper>
  );
};
