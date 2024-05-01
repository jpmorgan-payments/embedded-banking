import { useEffect, useState } from 'react';

import { smbdoGetClient } from '@/api/generated/embedded-banking';
import { Stack, Text, Title } from '@/components/ui';

import NavigationButtons from '../../Stepper/NavigationButtons';

// import { ReviewTable } from './ReviewTable';

type ReviewStepProps = {
  setActiveStep: any;
  activeStep: number;
};

const ReviewStep = ({ activeStep, setActiveStep }: ReviewStepProps) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await smbdoGetClient('1');
        setData(res);
        console.log('@@response', res);
      } catch (error) {
        // TODO add error handler
        console.log('@@', error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Title as="h2">Review</Title>
      <Stack>
        <Text>{JSON.stringify(data)}</Text>
        {/* <ReviewTable /> */}
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
