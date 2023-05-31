import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

import { Layout } from 'components';
import {
  AccountsPage,
  CasesPage,
  DebitCardsPage,
  NotFoundErrorPage,
  OnboardingPage,
  OverviewPage,
  RecipientsPage,
  TransactionsPage,
} from 'pages';

import { themes } from 'themes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

const App = () => {
  const [themeName, setThemeName] = useState<string>(Object.keys(themes)[0]);

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={themes[themeName]}
        withGlobalStyles
        withNormalizeCSS
      >
        <ModalsProvider>
          <BrowserRouter>
            <Layout
              themeProps={{
                currentThemeName: themeName,
                themeNames: Object.keys(themes),
                setThemeName: setThemeName,
              }}
            >
              <Routes>
                <Route path="*" element={<NotFoundErrorPage />} />
                <Route path="overview" element={<OverviewPage />} />
                <Route path="onboarding" element={<OnboardingPage />} />
                <Route path="accounts" element={<AccountsPage />} />
                <Route path="recipients" element={<RecipientsPage />} />
                <Route path="transactions" element={<TransactionsPage />} />
                <Route path="debit-cards" element={<DebitCardsPage />} />
                <Route path="cases" element={<CasesPage />} />
                <Route path="/" element={<Navigate replace to="/overview" />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
