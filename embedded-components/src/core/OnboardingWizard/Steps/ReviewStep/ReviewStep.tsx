import { useEffect, useState } from 'react';

import {
  getSmbdoPostClientVerificationsMutationOptions,
  smbdoGetClient,
  smbdoPostClientVerifications,
} from '@/api/generated/embedded-banking';
import { Stack, Text, Title } from '@/components/ui';

import { useOnboardingForm } from '../../context/form.context';
import { formCompleteMock } from '../../mocks/reviewStep.mock';
import NavigationButtons from '../../Stepper/NavigationButtons';
import { useContentData } from '../../utils/useContentData';
import { ReviewTable } from './ReviewTable';
import { valuesMap } from './valuesMap';

type ReviewStepProps = {
  setActiveStep: any;
  activeStep: number;
};

const ReviewStep = ({ activeStep, setActiveStep }: ReviewStepProps) => {
  const { setOnboardingForm, onboardingForm } = useOnboardingForm();
  const { getContentToken } = useContentData('steps.ReviewStep');
  const { getContentToken: getValueMap }: any =
    useContentData('steps.valuesMap');
  const [data, setData] = useState(onboardingForm);

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

  return (
    <>
      <Title as="h2">Review</Title>
      <Stack>
        <Text>{JSON.stringify(data)}</Text>
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
