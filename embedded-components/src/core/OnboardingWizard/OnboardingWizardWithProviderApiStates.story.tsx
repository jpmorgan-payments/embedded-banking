import { efClientPost } from '@/mocks/efClientPost.mock';
import { efClientQuestionsMock } from '@/mocks/efClientQuestions.mock';
import { efClientSolProp } from '@/mocks/efClientSolProp.mock';
import { efClientSolPropWithMoreData } from '@/mocks/efClientSolPropWithMoreData.mock';
import { efDocumentClientDetail } from '@/mocks/efDocumentClientDetail';
import type { Meta, StoryObj } from '@storybook/react';
import { delay, http, HttpResponse } from 'msw';

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
  title: 'Onboarding Wizard / API States',
  component: OnboardingWizardWithProvider,
};
export default meta;

type Story = StoryObj<typeof OnboardingWizardWithProvider>;

export const Primary: Story = {
  name: 'Default 200 OK',
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

export const WithLoadingState = {
  name: 'LOADING State',
  ...Primary,
  args: {
    ...Primary.args,
    clientId: '0030000130',
  },
  parameters: {
    msw: {
      handlers: [
        http.get('/clients/0030000130', async () => {
          // Delay the response by 3 seconds (3000 milliseconds)
          await delay(5000);
          return HttpResponse.json(efClientSolPropWithMoreData);
        }),
        http.post('/clients/0030000130', async () => {
          // You can add a delay here too if needed
          return HttpResponse.json(efClientSolPropWithMoreData);
        }),
      ],
    },
  },
};

export const WithLoadingStateAndError = {
  name: 'Error On POST',
  ...Primary,
  args: {
    ...Primary.args,
    clientId: '0030000130',
  },
  parameters: {
    msw: {
      handlers: [
        http.get('/clients/0030000130', async () => {
          return HttpResponse.json(efClientSolPropWithMoreData);
        }),
        http.post('/clients/0030000130', async () => {
          await delay(1000); // Adding a small delay to the error response
          return HttpResponse.json(
            {
              title: 'Invalid Data',
              httpStatus: 400,
              context: [
                {
                  message: 'Invalid email format.',
                  location: 'BODY',
                  field: 'email',
                },
                {
                  message: 'Invalid phone number format.',
                  location: 'BODY',
                  field: 'phone.phoneNumber',
                },
              ],
            },
            { status: 400 }
          );
        }),
      ],
    },
  },
};

export const WithErrorOnInit = {
  name: 'Server error without ClientID',
  ...Primary,
  args: {
    ...Primary.args,
    clientId: '',
  },
  parameters: {
    msw: {
      handlers: [
        http.get('/clients/0030000130', async () => {
          return HttpResponse.json(
            {
              title: 'Invalid Data',
              httpStatus: 400,
              context: [
                {
                  message: 'Client with ID [0030000130] does not exist.',
                  location: 'BODY',
                  field: 'clientId',
                },
              ],
            },
            { status: 400 }
          );
        }),
      ],
    },
  },
};

export const WithErrorOnGet = {
  name: 'Server error with ClientID',
  ...Primary,
  args: {
    ...Primary.args,
    clientId: '0030000130',
  },
  parameters: {
    msw: {
      handlers: [
        http.get('/clients/0030000130', async () => {
          return HttpResponse.json(
            {
              title: 'Invalid Data',
              httpStatus: 400,
              context: [
                {
                  message: 'Client with ID [0030000130] does not exist.',
                  location: 'BODY',
                  field: 'clientId',
                },
              ],
            },
            { status: 400 }
          );
        }),
      ],
    },
  },
};

export const OnboardingInProgress = {
  name: 'ClientStatus: PENDING',
  ...Primary,
  args: {
    ...Primary.args,
    clientId: '0030000130',
  },
  parameters: {
    msw: {
      handlers: [
        http.get('/clients/0030000130', async () => {
          return HttpResponse.json({
            ...efClientSolPropWithMoreData,
            status: 'PENDING',
          });
        }),
      ],
    },
  },
};
