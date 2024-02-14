import { Box, Card, Text } from '@mantine/core';

import { PageWrapper } from 'components';
import { GITHUB_REPO } from 'data/constants';
import {
  LinkAccountForm,
  EBComponentsProvider,
} from 'embedded-banking-components';

export const EmbeddedComponentsPage = () => {
  return (
    <PageWrapper title="Embedded Components">
      <Card maw={300} shadow="lg" radius={0} withBorder>
        <EBComponentsProvider theme={{}}>
          <LinkAccountForm />
        </EBComponentsProvider>
      </Card>
    </PageWrapper>
  );
};
