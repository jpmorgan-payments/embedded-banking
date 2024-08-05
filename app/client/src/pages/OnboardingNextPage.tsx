import {
  OnboardingWizardInit,
  EBComponentsProvider,
  OnboardingWizardRoot,
} from '@jpmorgan-payments/embedded-banking-components';
import { Badge, Text } from '@mantine/core';
import { PageWrapper } from 'components';
import { GITHUB_REPO } from 'data/constants';
import { OnboardingWizard } from 'features/Onboarding';

export const OnboardingNextPage = () => {
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
      =
      <EBComponentsProvider apiBaseUrl="https://api-mock.payments.jpmorgan.com/tsapi/ef/v2">
        <OnboardingWizardRoot
          isMock
          // Remove client id, if you start from scratch
          // clientId={clientId}
          title="OnBoarding Wizard"
          // clientId={'3000000216'}
          onRegistration={({ clientId }) => {
            console.log('@@clientID Registered', clientId);
          }}
        />
      </EBComponentsProvider>
    </PageWrapper>
  );
};
