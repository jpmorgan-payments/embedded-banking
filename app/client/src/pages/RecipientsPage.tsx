import { Box, Text } from '@mantine/core';
import { PageWrapper } from 'components';
import { GITHUB_REPO } from 'data/constants';
import { CreateRecipientForm, RecipientsTable } from 'features/Recipients';

export const RecipientsPage = () => {
  return (
    <PageWrapper
      title="Managing Recipients"
      apiEndpoint="/recipients"
      githubLink={`${GITHUB_REPO}/tree/main/app/client/src/features/Recipients`}
    >
      <Box>
        <Text>
          In Embedded Banking, a payment recipient must be created and saved
          before a payment can be made.
        </Text>
        <Text>
          You can use the recipients API to allow users to create and manage their
          recipients.
        </Text>
      </Box>
      <CreateRecipientForm />
      <RecipientsTable />
    </PageWrapper>
  );
};
