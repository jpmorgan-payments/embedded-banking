import { useEffect, useState } from 'react';

import { smbdoGetClient } from '@/api/generated/embedded-banking';
import { Stack, Text, Title } from '@/components/ui';

import { useOnboardingForm } from '../../context/form.context';
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
  const { getContentToken: getValueMap } = useContentData('steps.valuesMap');
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await smbdoGetClient('1');
        setData(res);
        console.log('@@response', res);
      } catch (error) {
        // TODO add error handler
        console.log('@@', error);
      }
    };
    fetchData();
  }, []);
  console.log('@@onboardingForm', onboardingForm);

  return (
    <>
      <Title as="h2">Review</Title>
      <Stack>
        <Text>{JSON.stringify(data)}</Text>
        {/* <ReviewTable
          valuesMap={valuesMap(
            data,
            undefined,
            undefined,
            undefined,
            getValueMap
          )}
        /> */}
        <NavigationButtons
          onSubmit={() => {
            setActiveStep(activeStep + 1);
          }}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
        />
      </Stack>
    </>
  );
};

export { ReviewStep };
