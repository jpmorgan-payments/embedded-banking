/* eslint-disable import/no-useless-path-segments */
import type { Meta, StoryObj } from '@storybook/react';
import { delay, http, HttpResponse } from 'msw';

import { OnboardingWizardBasicWithProvider } from './OnboardingWizardBasic.story';
import { efClientQuestionsMock } from '.storybook/mocks/efClientQuestions.mock';
import { efClientSolPropWithMoreData } from '.storybook/mocks/efClientSolPropWithMoreData.mock';

const meta: Meta<typeof OnboardingWizardBasicWithProvider> = {
  title: 'Onboarding Wizard Basic / API States',
  component: OnboardingWizardBasicWithProvider,
};
export default meta;

type Story = StoryObj<typeof OnboardingWizardBasicWithProvider>;

export const Primary: Story = {
  name: 'Default 200 OK',
  args: {
    clientId: '0030000130',
    apiBaseUrl: '/',
    title: 'Onboarding Wizard Basic',
    theme: {
      variables: {
        primaryColor: 'teal',
        borderRadius: '15px',
      },
    },
    onPostClientResponse: (data, error) => {
      if (data) {
        console.log('@@POST client response data', data);
      } else if (error) {
        console.log('@@POST client response error', error);
      }
    },
    onPostClientVerificationsResponse: (data, error) => {
      if (data) {
        console.log('@@POST verifications response data', data);
      } else if (error) {
        console.log('@@POST verifications response error', error);
      }
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
        http.get('/ef/do/v1/clients/0030000130', () => {
          return HttpResponse.json(efClientSolPropWithMoreData);
        }),
        http.post('/ef/do/v1/clients/0030000130', () => {
          return HttpResponse.json(efClientSolPropWithMoreData);
        }),
      ],
    },
  },
};

export const WithLoadingState = {
  name: 'Loading state on get',
  ...Primary,
  args: {
    ...Primary.args,
    clientId: '0030000130',
  },
  parameters: {
    msw: {
      handlers: [
        http.get('/ef/do/v1/clients/0030000130', async () => {
          // Delay the response by 3 seconds (3000 milliseconds)
          await delay(5000);
          return HttpResponse.json(efClientSolPropWithMoreData);
        }),
        http.post('/ef/do/v1/clients/0030000130', async () => {
          // You can add a delay here too if needed
          return HttpResponse.json(efClientSolPropWithMoreData);
        }),
      ],
    },
  },
};

export const WithLoadingStateAndError = {
  name: 'Unhandled server error on POST',
  ...Primary,
  args: {
    ...Primary.args,
    clientId: '0030000130',
  },
  parameters: {
    msw: {
      handlers: [
        http.get('/ef/do/v1/clients/0030000130', async () => {
          return HttpResponse.json(efClientSolPropWithMoreData);
        }),
        http.post('/ef/do/v1/clients/0030000130', async () => {
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

export const WithErrorOnGet = {
  name: 'Server error on GET /clients/:clientId',
  ...Primary,
  args: {
    ...Primary.args,
    clientId: '0030000130',
  },
  parameters: {
    msw: {
      handlers: [
        http.get('/ef/do/v1/clients/0030000130', async () => {
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
