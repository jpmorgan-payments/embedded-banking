import { efClientPost } from '@/mocks/efClientPost.mock';
import { efClientQuestionsMock } from '@/mocks/efClientQuestions.mock';
import { efClientSolProp } from '@/mocks/efClientSolProp.mock';
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
  title: 'Onboarding Wizard / Theme',
  component: OnboardingWizardWithProvider,
};
export default meta;

type Story = StoryObj<typeof OnboardingWizardWithProvider>;

export const Primary: Story = {
  name: 'Default theme',
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

export const Dark: Story = {
  name: 'Dark theme',
  ...Primary,
  args: {
    ...Primary.args,
    title: 'Onboarding (Dark theme)',
    theme: {
      colorScheme: 'dark',
    },
  },
};

export const Example1: Story = {
  name: 'Example with different font',
  ...Primary,
  args: {
    ...Primary.args,
    title: 'Onboarding (Different font)',
    theme: {
      variables: {
        primaryColor: 'teal',
        borderRadius: '15px',
        fontFamily: 'Nunito sans',
      },
    },
  },
};
