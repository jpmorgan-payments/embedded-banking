import { FC, ReactNode, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Stack } from '@/components/ui/stack';

import { useOnboardingForm } from '../../context/form.context';
import { BusinessCommonForm } from '../../Forms/BusinessCommonForm/BusinessCommonForm';
import { BusinessForm } from '../../Forms/BusinessDetailsForm/BusinessDetailsForm';
import NavigationButtons from '../../Stepper/NavigationButtons';
import { addBusinessDetails } from '../../utils/actions';
import { useContentData } from '../../utils/useContentData';
import {
  businessDetailsSchema,
  BusinessDetailsStepValues,
} from './BusinessDetailsStep.schema';

type BusinessDetailsProps = {
  children?: ReactNode;
  setActiveStep: any;
  activeStep: number;
};

const BusinessDetailsStep = ({
  setActiveStep,
  activeStep,
}: BusinessDetailsProps) => {
  const { getContentToken } = useContentData('steps.BusinessDetailsStep');
  const { setOnboardingForm, onboardingForm } = useOnboardingForm();
  const [hasWebsite, setHasWebsite] = useState(
    onboardingForm?.businessDetails?.websiteNotAvailable
  ); // Default to individual
  const defaultInitialValues = businessDetailsSchema().cast(
    {}
  ) as BusinessDetailsStepValues;

  const form = useForm<any>({
    defaultValues: onboardingForm?.businessDetails || defaultInitialValues,
    resolver: yupResolver(businessDetailsSchema(getContentToken)),
    mode: 'onBlur',
  });

  const onSubmit = () => {
    const errors = form?.formState?.errors;
    if (!Object.values(errors).length) {
      const newOnboardingForm = addBusinessDetails(
        onboardingForm,
        form.getValues()
      );
      setOnboardingForm(newOnboardingForm);
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <Stack className="eb-w-full eb-gap-2">
      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <BusinessForm form={form} />
          <Separator />
          <BusinessCommonForm form={form} hasWebsite={hasWebsite} />
          <NavigationButtons
            setActiveStep={setActiveStep}
            activeStep={activeStep}
          />
        </form>
      </Form>
    </Stack>
  );
};

BusinessDetailsStep.title = 'Business';

export { BusinessDetailsStep };
