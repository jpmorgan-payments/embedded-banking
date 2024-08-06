import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';

import { EBComponentsProvider } from '@/core/EBComponentsProvider';

import { onRegistrationProp } from '../EBComponentsProvider/RootConfigProvider';
import { OnboardingWizard } from './OboardingWizard';

const OnboardingWizardWithProvider = ({
  apiBaseUrl,
  headers,
  title,
  theme,
  onGetClientsConfirmation,
  onPostClientsVerification,
  setClientId,
  clientId,
}: {
  apiBaseUrl: string;
  headers: Record<string, string>;
  title: string;
  theme: Record<string, unknown>;
  onGetClientsConfirmation: ({
    clientId,
    clientResponse,
  }: {
    clientId: string;
    clientResponse?: any;
  }) => void;
  onPostClientsVerification: ({
    clientId,
    clientResponse,
  }: {
    clientId: string;
    clientResponse?: any;
  }) => void;

  setClientId?: (s: string) => void;
  clientId?: string;
}) => {
  return (
    <>
      <EBComponentsProvider
        apiBaseUrl={apiBaseUrl}
        headers={headers}
        theme={theme}
      >
        <OnboardingWizard
          title={title}
          onGetClientsConfirmation={onGetClientsConfirmation}
          onPostClientsVerification={onPostClientsVerification}
          setClientId={setClientId}
          clientId={clientId}
        />
      </EBComponentsProvider>
    </>
  );
};

const meta: Meta<typeof OnboardingWizardWithProvider> = {
  title: 'Onboarding Wizard with EBComponentsProvider',
  component: OnboardingWizardWithProvider,
};
export default meta;

type Story = StoryObj<typeof OnboardingWizardWithProvider>;

export const Primary: Story = {
  name: 'Basic OnboardingWizard with EBComponentsProvider',
  args: {
    apiBaseUrl: '/api',
    title: 'Onboarding Wizard Simple',
    theme: {
      variables: {
        primaryColor: 'red',
        borderRadius: '15px',
      },
    },
    onGetClientsConfirmation: ({ clientId }: onRegistrationProp) => {
      console.log('@@clientId', clientId);
    },
    onPostClientsVerification: ({ clientId }: onRegistrationProp) => {
      console.log('@@clientId', clientId);
    },
  },
};

export const NoThemeWithPDPAPIs: Story = {
  name: 'No theme with PDP mocked APIs',
  ...Primary.args,
  args: {
    theme: {},
    apiBaseUrl: '',
  },
  play: async ({ canvasElement }) => {
    // https://storybook.js.org/docs/writing-stories/play-function

    const canvas = within(canvasElement);
    // 👇 Simulate interactions with the component
    await userEvent.type(
      await canvas.findByLabelText('Name of Your Business', {
        selector: 'input',
      }),
      'Sample Business',
      {
        delay: 10,
      }
    );

    await userEvent.type(
      await canvas.findByLabelText('Business Email', {
        selector: 'input',
      }),
      'example-email@email.com',
      {
        delay: 10,
      }
    );

    await userEvent.click(
      await canvas.findByRole('combobox', {
        name: 'Organization Type',
      }),
      {
        delay: 100,
      }
    );

    await userEvent.click(await canvas.findByText('Sole Proprietorship'), {
      pointerEventsCheck: 0,
    });
  },
};

export const NoThemeWithDevSmbdoAPIs: Story = {
  name: 'No theme with DEV SMBDO APIs',
  ...Primary.args,
  args: {
    theme: {},
    apiBaseUrl: '',
  },
};
