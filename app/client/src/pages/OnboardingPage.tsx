import { Badge, Text } from '@mantine/core';
import { PageWrapper } from 'components';
import { GITHUB_REPO } from 'data/constants';
import { OnboardingWizard } from 'features/Onboarding';

export const OnboardingPage = () => {
  return (
    <PageWrapper
      title="Onboarding Clients"
      apiEndpoint="/clients"
      githubLink={`${GITHUB_REPO}/tree/main/app/client/src/features/Onboarding`}
    >
      <div>
        <Text>
          Use the <Badge color="dark">POST /clients</Badge> call to begin the
          enrollment of a new Client to Embedded Banking.
        </Text>
        <Text>
          Once the request has been successfully made, it initiates the J.P. Morgan onboarding process, including the
          <b> Customer Identification Program (CIP)</b>. Standard background checks are run on your client and their
          related parties while the Embedded Banking profile and account is made ready. 
        </Text>
      </div>
      <OnboardingWizard />
    </PageWrapper>
  );
};
