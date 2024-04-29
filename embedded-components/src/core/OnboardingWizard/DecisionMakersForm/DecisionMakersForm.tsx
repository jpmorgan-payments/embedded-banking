import { useContext, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';

import { OnboardingFormContext } from '../context/form.context';
import NavigationButtons from '../Stepper/NavigationButtons';
import { useContentData } from '../useContentData';
import { AddressForm } from './AddressForm/AddressForm';
import {
  createDecisionMakerFormSchema,
  DecisionMakerFormValues,
} from './DecisionMakerForm.schema';
import { PersonalDetailsForm } from './PersonalDetailsForm/PersonalDetailsForm';

const defaultInitialValues = createDecisionMakerFormSchema().cast(
  {}
) as DecisionMakerFormValues;

type DecisionMakersFormProps = {
  setActiveStep: any;
  activeStep: number;
};

const DecisionMakerForm = ({
  setActiveStep,
  activeStep,
}: DecisionMakersFormProps) => {
  // @ts-ignore
  const { onboardingForm, setOnboardingForm } = useContext(
    OnboardingFormContext
  );

  const { getContentToken: getFormSchema } = useContentData(
    'schema.businessOwnerFormSchema'
  );

  const form = useForm<DecisionMakerFormValues>({
    defaultValues: defaultInitialValues,
    resolver: yupResolver(createDecisionMakerFormSchema(getFormSchema)),
  });

  useEffect(() => {
    console.log(onboardingForm);
  }, [onboardingForm]);

  const onSubmit = () => {
    const errors = form?.formState?.errors;
    if (Object.values(errors).length === 0 && form.formState.isSubmitted) {
      setActiveStep(activeStep + 1);
      const newOnboardingForm = _.cloneDeep(onboardingForm);
      newOnboardingForm.owners = _.merge(
        newOnboardingForm?.owners,
        form.getValues()
      );
      console.log(newOnboardingForm);
      setOnboardingForm(newOnboardingForm);
    }
  };

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <Text size="lg">Tell us about yourself</Text>

        <Text size="lg">
          Please provide your personal information. We will verify that you are
          a controller of the business.
        </Text>
        <PersonalDetailsForm form={form} />
        <Text size="lg">What is your personal address?</Text>

        <AddressForm form={form} />
        <NavigationButtons
          onSubmit={onSubmit}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
        />
      </form>
    </Form>
  );
};

export { DecisionMakerForm };
