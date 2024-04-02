import { PageWrapper } from 'components';
import {
  Overview,
  Installation,
  AuthProvider,
  CreateUser,
} from 'features/EBComponentSections';

export const EmbeddedComponentsPage = () => {
  return (
    <PageWrapper>
      <Overview />
      <Installation />
      <AuthProvider />
      <CreateUser />
    </PageWrapper>
  );
};
