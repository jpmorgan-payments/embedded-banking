import { useEffect, useState } from 'react';

import {
  smbdoGetClient,
  smbdoPostClientVerifications,
} from '@/api/generated/embedded-banking';
import { Stack, Title } from '@/components/ui';

import { useOnboardingForm } from '../../context/form.context';
import {
  businessDetailsMock,
  controllerMock,
  formCompleteMock,
} from '../../mocks/reviewStep.mock';
import NavigationButtons from '../../Stepper/NavigationButtons';
import { useContentData } from '../../utils/useContentData';
import { ReviewTable } from './ReviewTable';
import { valuesMap } from './valuesMap';

type ReviewStepProps = {
  setActiveStep: any;
  activeStep: number;
};

const ReviewStep = ({ activeStep, setActiveStep }: ReviewStepProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setOnboardingForm, onboardingForm } = useOnboardingForm();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { getContentToken } = useContentData('steps.ReviewStep');
  const { getContentToken: getValueMap }: any =
    useContentData('steps.valuesMap');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(
    onboardingForm?.legalStructure || {
      businessDetails: businessDetailsMock,
      controller: controllerMock,
      id: '1000010400',
      legalStructure: undefined,
      decisionMakers: undefined,
      outstandingItems: {
        attestationDocumentIds: Array(1),
        documentRequestIds: Array(0),
        partyIds: Array(0),
        partyRoles: Array(0),
        questionIds: Array(3),
      },
      owner: controllerMock,
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await smbdoGetClient('1');
        const resp: any = await smbdoPostClientVerifications('1');
        // setData(res);
        console.log('@@response', res, '::', resp);
      } catch (error) {
        // TODO add error handler
        console.log('@@', error);
      }
    };
    fetchData();
  }, []);

  const newSet = {
    ...data?.businessDetails,
    owners: [{ ...data?.owner }],
    decisionMakers: [{ ...data?.owner }],
  };

  // TODO: personal information requires the controllerKEY name
  console.log('@@data', data, onboardingForm);

  return (
    <>
      <Title as="h2">Review</Title>
      <Stack>
        <ReviewTable
          valuesMap={valuesMap(
            newSet,
            formCompleteMock,
            undefined,
            onboardingForm?.entityType ?? 'Sole Proprietorship',
            getValueMap
          )}
        />
        <NavigationButtons
          setActiveStep={setActiveStep}
          activeStep={activeStep}
        />
      </Stack>
    </>
  );
};

export { ReviewStep };
