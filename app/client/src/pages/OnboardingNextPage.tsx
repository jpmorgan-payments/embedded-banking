import {
  EBComponentsProvider,
  OnboardingWizard,
} from '@jpmorgan-payments/embedded-banking-components';
import { Badge, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { PageWrapper } from 'components';
import { GITHUB_REPO } from 'data/constants';

export const OnboardingNextPage = () => {
  const form = useForm({
    initialValues: {
      clientId: '0030000132',
    },
  });

  return (
    <PageWrapper
      title="[Next] Onboarding"
      apiEndpoint="@jpmorgan-payments/embedded-banking-components"
      githubLink={`${GITHUB_REPO}/tree/main/embedded-components`}
    >
      <div>
        <Text>
          Use the <Badge color="dark">POST /clients</Badge> call to begin the
          enrollment of a new Client to Embedded Banking.
        </Text>
        <Text>
          Once the request has been successfully made, it initiates the J.P.
          Morgan onboarding process, including the
          <b> Customer Identification Program (CIP)</b>. Standard background
          checks are run on your client and their related parties while the
          Embedded Banking profile and account is made ready.
        </Text>
      </div>
      <TextInput label="Client ID" {...form.getInputProps('clientId')} />
      <EBComponentsProvider apiBaseUrl="https://api-mock.payments.jpmorgan.com/tsapi/">
        <OnboardingWizard
          title="[Next] Onboarding Wizard"
          clientId={form.values.clientId}
          onPostClientsVerification={({ clientId }) => {
            console.log('@@clientId POST', clientId);
          }}
          onGetClientsConfirmation={({ clientId }) => {
            console.log('@@clientId GET', clientId);
          }}
        />
      </EBComponentsProvider>
    </PageWrapper>
  );
};
