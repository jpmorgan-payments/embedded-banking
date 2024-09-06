import { efClientCorpMock } from '@/mocks/efClientCorp.mock';
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
  currentStep,
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
  currentStep?: number;
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
          currentStep={currentStep}
        />
      </EBComponentsProvider>
    </>
  );
};

const meta: Meta<typeof OnboardingWizardWithProvider> = {
  title: 'Onboarding Wizard / Steps',
  component: OnboardingWizardWithProvider,
};
export default meta;

type Story = StoryObj<typeof OnboardingWizardWithProvider>;

export const Primary: Story = {
  name: 'Intro Step',
  args: {
    apiBaseUrl: '/',
    clientId: '',
    title: 'Onboarding Wizard Simple',
    theme: {
      variables: {
        primaryColor: '#7CB9E8',
        borderRadius: '15px',
      },
    },
    currentStep: 0,
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
        http.get('/ef/do/v1/clients/0030000132', () => {
          return HttpResponse.json(efClientSolProp);
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

        http.get('/ef/do/v1/documents/:id', () => {
          return HttpResponse.json(efDocumentClientDetail);
        }),

        http.get('/ef/do/v1/documents/:id/file', async () => {
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

        http.post('/ef/do/v1/clients/:id/verifications', () => {
          return HttpResponse.json({ success: 'TRUE' });
        }),
      ],
    },
  },
};

export const IndividualStep: Story = {
  name: 'Individual Step',
  args: {
    apiBaseUrl: '/',
    clientId: '',
    title: 'Onboarding Wizard Simple',
    theme: {
      variables: {
        primaryColor: '#7CB9E8',
        borderRadius: '15px',
      },
    },
    currentStep: 1,
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
        http.post('/ef/do/v1/clients', () => {
          return HttpResponse.json(efClientPost);
        }),
        http.get('/ef/do/v1/clients/0030000132', () => {
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

export const OrganizationStep: Story = {
  ...Primary,
  name: 'Organization Step',
  args: { ...Primary.args, clientId: '0030000130', currentStep: 1 },
  parameters: {
    msw: {
      handlers: [
        // eslint-disable-next-line no-unsafe-optional-chaining
        ...Primary?.parameters?.msw?.handlers,
        http.get('/clients/0030000130', () => {
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

export const BusinessOwnerStep: Story = {
  ...Primary,
  name: 'Business Owner Step',
  args: { ...Primary.args, clientId: '0030000130', currentStep: 2 },
  parameters: {
    msw: {
      handlers: [
        // eslint-disable-next-line no-unsafe-optional-chaining
        ...Primary?.parameters?.msw?.handlers,
        http.get('/clients/0030000130', () => {
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

export const QuestionsStep: Story = {
  ...Primary,
  name: 'Questions Step',
  args: { ...Primary.args, clientId: '0030000130', currentStep: 3 },
  parameters: {
    msw: {
      handlers: [
        // eslint-disable-next-line no-unsafe-optional-chaining
        ...Primary?.parameters?.msw?.handlers,
        http.get('/clients/0030000130', () => {
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

export const ReviewStep: Story = {
  ...Primary,
  name: 'Review Step',
  args: { ...Primary.args, clientId: '0030000130', currentStep: 4 },
  parameters: {
    msw: {
      handlers: [
        // eslint-disable-next-line no-unsafe-optional-chaining
        ...Primary?.parameters?.msw?.handlers,
        http.get('/clients/0030000130', () => {
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

export const AttestationStep: Story = {
  ...Primary,
  name: 'Attestation Step',
  args: { ...Primary.args, clientId: '0030000130', currentStep: 5 },
  parameters: {
    msw: {
      handlers: [
        // eslint-disable-next-line no-unsafe-optional-chaining
        ...Primary?.parameters?.msw?.handlers,
        http.get('/clients/0030000130', () => {
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
