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
          The <Badge color="dark">POST /clients</Badge> call kicks off the
          enrollment of a new Client in the Embedded Banking offering.
        </Text>
        <Text>
          Our Onboarding process will then run the
          <b> Customer Identification Program (CIP)</b> on the Client and its
          related parties while we open an Account
        </Text>
      </div>
      <OnboardingWizard />
    </PageWrapper>
  );
};
