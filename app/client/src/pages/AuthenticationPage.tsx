import { PageWrapper } from 'components';
import { ForgeRockUserProvider } from 'features/Authentication/ForgeRockContext';
import { Outlet } from 'react-router-dom';

export const AuthenticationPage = () => {
  return (
    <PageWrapper>
      <ForgeRockUserProvider>
        <Outlet />
      </ForgeRockUserProvider>
    </PageWrapper>
  );
};
