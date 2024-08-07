/* eslint-disable import/no-useless-path-segments */
import type { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';

import {
  ApiErrorV2,
  ClientResponse,
  ClientVerificationsInformationResponse,
} from '@/api/generated/embedded-banking.schemas';
import { EBComponentsProvider } from '@/core/EBComponentsProvider';

import { OnboardingWizardBasic } from './OnboardingWizardBasic';
import { efClientQuestionsMock } from '.storybook/mocks/efClientQuestions.mock';
import { efClientSolProp } from '.storybook/mocks/efClientSolProp.mock';

const OnboardingWizardBasicWithProvider = ({
  apiBaseUrl,
  headers,
  title,
  theme,
  onPostClientResponse,
  onPostClientVerificationsResponse,
  setClientId,
  clientId,
}: {
  apiBaseUrl: string;
  headers: Record<string, string>;
  title: string;
  theme: Record<string, unknown>;
  onPostClientResponse: (response?: ClientResponse, error?: ApiErrorV2) => void;
  onPostClientVerificationsResponse?: (
    response?: ClientVerificationsInformationResponse,
    error?: ApiErrorV2
  ) => void;
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
        <OnboardingWizardBasic
          title={title}
          onPostClientResponse={onPostClientResponse}
          onPostClientVerificationsResponse={onPostClientVerificationsResponse}
          setClientId={setClientId}
          clientId={clientId}
        />
      </EBComponentsProvider>
    </>
  );
};

const meta: Meta<typeof OnboardingWizardBasicWithProvider> = {
  title: 'Onboarding Wizard Basic with EBComponentsProvider',
  component: OnboardingWizardBasicWithProvider,
};
export default meta;

type Story = StoryObj<typeof OnboardingWizardBasicWithProvider>;

export const Primary: Story = {
  name: 'Basic OnboardingWizard Basic with EBComponentsProvider',
  args: {
    clientId: '',
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
};

export const WithClientId: Story = {
  name: 'Basic with clientId',
  ...Primary,
  args: {
    ...Primary.args,
    clientId: '0030000132',
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
        http.get('/ef/do/v1/clients/0030000132', () => {
          return HttpResponse.json(efClientSolProp);
        }),
      ],
    },
  },
};
