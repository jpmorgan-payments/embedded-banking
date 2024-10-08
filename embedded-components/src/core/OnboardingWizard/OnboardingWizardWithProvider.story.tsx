import { efClientCorpMock } from '@/mocks/efClientCorp.mock';
import { efClientPost } from '@/mocks/efClientPost.mock';
import { efClientQuestionsMock } from '@/mocks/efClientQuestions.mock';
import { efClientSolProp } from '@/mocks/efClientSolProp.mock';
import { efClientSolPropAnsweredQuestions } from '@/mocks/efClientSolPropAnsweredQuestions.mock';
import { efDocumentClientDetail } from '@/mocks/efDocumentClientDetail';
import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';

import { EBComponentsProvider } from '@/core/EBComponentsProvider';

import termsPDF from '../../../public/asset/docs/placeholder.pdf';
import { onRegistrationProp } from '../EBComponentsProvider/RootConfigProvider';
import { OnboardingWizard } from './OnboardingWizard';

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
  title: 'Onboarding Wizard / General',
  component: OnboardingWizardWithProvider,
};
export default meta;

type Story = StoryObj<typeof OnboardingWizardWithProvider>;

export const Primary: Story = {
  name: 'Basic OnboardingWizard',
  args: {
    apiBaseUrl: '/',
    headers: {
      api_gateway_client_id: 'EBCLIENT22',
    },
    clientId: '',
    title: 'Onboarding Wizard Simple',
    theme: {
      variables: {
        primaryColor: '#7CB9E8',
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
        http.post('/clients', () => {
          return HttpResponse.json(efClientPost);
        }),
        http.get('/clients/0030000132', () => {
          return HttpResponse.json(efClientSolProp);
        }),
        http.get('/questions', (req) => {
          const url = new URL(req.request.url);
          const questionIds = url.searchParams.get('questionIds');

          return HttpResponse.json({
            metadata: efClientQuestionsMock.metadata,
            questions: efClientQuestionsMock?.questions.filter((q) =>
              questionIds?.includes(q.id)
            ),
          });
        }),

        http.get('/documents/:id', () => {
          return HttpResponse.json(efDocumentClientDetail);
        }),

        http.get('/documents/:id/file', async () => {
          const bufferBlob = await fetch(termsPDF).then((res) =>
            res.arrayBuffer()
          );

          return HttpResponse.arrayBuffer(bufferBlob, {
            headers: {
              'Content-Type': 'applications/pdf',
              'Content-Length': bufferBlob.byteLength.toString(),
            },
          });
        }),

        http.post('/clients/:id/verifications', () => {
          return HttpResponse.json({ success: 'TRUE' });
        }),
      ],
    },
  },
};

export const NoClient: Story = {
  name: 'Client Approved',
  args: {
    apiBaseUrl: '/',
    clientId: '0030000132',
    title: 'Onboarding Wizard Simple',
    theme: {
      variables: {
        primaryColor: '#7CB9E8',
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
        http.post('/clients/0030000139', () => {
          return HttpResponse.json(efClientPost);
        }),
        http.get('/clients/0030000132', () => {
          return HttpResponse.json(efClientSolProp);
        }),
        http.get('/questions', (req) => {
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
  name: 'PDP mocked APIs',
  ...Primary,
  args: {
    ...Primary.args,
    apiBaseUrl: 'https://api-mock.payments.jpmorgan.com/tsapi/ef/do/v1',
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

export const NoThemeWithMocksSolePropAnsweredQuestions: Story = {
  ...Primary,
  name: 'Sole Prop client',
  args: { ...Primary.args, clientId: '0030000139' },
  parameters: {
    msw: {
      handlers: [
        // eslint-disable-next-line no-unsafe-optional-chaining
        ...Primary?.parameters?.msw?.handlers,
        http.post('/clients/0030000139', () => {
          return HttpResponse.json(efClientSolPropAnsweredQuestions);
        }),
        http.get('/clients/0030000139', () => {
          return HttpResponse.json(efClientSolPropAnsweredQuestions);
        }),
      ],
    },
  },
};

export const NoThemeWithMocksLLC: Story = {
  ...Primary,
  name: 'LLC client with unanswered questions',
  args: { ...Primary.args, clientId: '0030000130' },
  parameters: {
    msw: {
      handlers: [
        // eslint-disable-next-line no-unsafe-optional-chaining
        ...Primary?.parameters?.msw?.handlers,
        http.get('/clients/0030000130', () => {
          return HttpResponse.json(efClientCorpMock);
        }),
        http.post('/clients/0030000130', () => {
          return HttpResponse.json(efClientCorpMock);
        }),
        http.get('/questions', (req) => {
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
