import { PageWrapper } from 'components';
import { Overview, Installation, AuthProvider } from 'features/EBComponentSections';

export const EmbeddedComponentsPage = () => {
  return (
    <PageWrapper>
      <Overview />
      <Installation />
      <AuthProvider />
    </PageWrapper>
  );
};
