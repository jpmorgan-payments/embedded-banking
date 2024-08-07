import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';

import { EBComponentsProvider } from '@/core/EBComponentsProvider';

import { efClientCorpMock } from '../../../.storybook/mocks/efClientCorp.mock';
import { efClientQuestionsMock } from '../../../.storybook/mocks/efClientQuestions.mock';
import { efClientSolProp } from '../../../.storybook/mocks/efClientSolProp.mock';
import { efClientSolPropAnsweredQuestions } from '../../../.storybook/mocks/efClientSolPropAnsweredQuestions.mock';
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
    apiBaseUrl: '/',
    clientId: '0030000132',
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
  parameters: {
    msw: {
      handlers: [
        http.get('/ef/do/v1/questions', (req) => {
          const url = new URL(req.request.url);
          const questionIds = url.searchParams.get('questionIds');
          return HttpResponse.json({
            metadata: efClientQuestionsMock.metadata,
            questions: efClientQuestionsMock?.questions.filter((q) =>
              questionIds?.includes(q.id)
            ),
          });
        }),
      ],
    },
  },
};

export const NoThemeWithPDPAPIs: Story = {
  name: 'No theme with PDP mocked APIs',
  ...Primary,
  args: {
    ...Primary.args,
    apiBaseUrl: 'https://api-mock.payments.jpmorgan.com/tsapi/',
    clientId: '123',
  },
  /*play: async ({ canvasElement }) => {
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
    },*/
};

export const NoThemeWithUATSMBDOAPIs: Story = {
  name: 'No theme with SMBDO UAT APIs',
  ...Primary,
  args: {
    ...Primary.args,
    apiBaseUrl:
      'https://eb-hosted-app-demo.apps.dev.na-9z.gap.jpmchase.net/api/uat/',
    clientId: '',
  },
};

export const NoThemeWithMocksSoleProp: Story = {
  ...Primary,
  name: 'No theme with mocked Sole Prop client with unanswered questions',
  args: { ...Primary.args, clientId: '0030000132' },
  parameters: {
    msw: {
      handlers: [
        // eslint-disable-next-line no-unsafe-optional-chaining
        ...Primary?.parameters?.msw?.handlers,
        http.get('/ef/do/v1/clients/0030000132', () => {
          return HttpResponse.json(efClientSolProp);
        }),
      ],
    },
  },
};

export const NoThemeWithMocksSolePropAnsweredQuestions: Story = {
  ...Primary,
  name: 'No theme with mocked Sole Prop client with answered questions',
  args: { ...Primary.args, clientId: '0030000139' },
  parameters: {
    msw: {
      handlers: [
        // eslint-disable-next-line no-unsafe-optional-chaining
        ...Primary?.parameters?.msw?.handlers,
        http.get('/ef/do/v1/clients/0030000139', () => {
          return HttpResponse.json(efClientSolPropAnsweredQuestions);
        }),
      ],
    },
  },
};

export const NoThemeWithMocksLLC: Story = {
  ...Primary,
  name: 'No theme with mocked LLC client with unanswered questions',
  args: { ...Primary.args, clientId: '0030000130' },
  parameters: {
    msw: {
      handlers: [
        // eslint-disable-next-line no-unsafe-optional-chaining
        ...Primary?.parameters?.msw?.handlers,
        http.get('/ef/do/v1/clients/0030000130', () => {
          return HttpResponse.json(efClientCorpMock);
        }),
        http.get('/ef/do/v1/questions', (req) => {
          const url = new URL(req.request.url);
          const questionIds = url.searchParams.get('questionIds');
          return HttpResponse.json({
            metadata: efClientQuestionsMock.metadata,
            questions: efClientQuestionsMock?.questions.filter((q) =>
              questionIds?.includes(q.id)
            ),
          });
        }),
      ],
    },
  },
};

export const NoThemeWithMocksLLCAnsweredQuestions: Story = {
  ...Primary,
  name: 'No theme with mocked LLC client with answered questions',
  args: { ...Primary.args, clientId: '0030000130' },
  parameters: {
    msw: {
      handlers: [
        // eslint-disable-next-line no-unsafe-optional-chaining
        ...Primary?.parameters?.msw?.handlers,
        http.get('/ef/do/v1/clients/0030000130', () => {
          return HttpResponse.json(efClientSolPropAnsweredQuestions);
        }),
      ],
    },
  },
};
