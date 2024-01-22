import { Navigate, Outlet } from 'react-router-dom';
import { Text } from '@mantine/core';
import { useForgeRockUser } from './ForgeRockContext';

export const ForgeRockProtectedRoutes = () => {
  const { tokens, checkedForTokens } = useForgeRockUser();

  if (!checkedForTokens) {
    return <Text>Checking user...</Text>;
  }

  return tokens ? <Outlet /> : <Navigate to="/login" replace />;
};
