import { useCallback, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';

import { addBusinessOwner, addController } from '../context/form.actions';
import { useOnboardingForm } from '../context/form.context';
import { AddressForm } from '../DecisionMakersForm/AddressForm/AddressForm';
import {
  createDecisionMakerFormSchema,
  DecisionMakerFormValues,
} from '../DecisionMakersForm/DecisionMakerForm.schema';
import { PersonalDetailsForm } from '../DecisionMakersForm/PersonalDetailsForm/PersonalDetailsForm';
import NavigationButtons from '../Stepper/NavigationButtons';
import { useContentData } from '../useContentData';

const defaultInitialValues = createDecisionMakerFormSchema().cast({});

type PersonalFormProps = {
  setActiveStep: any;
  activeStep: number;
};

const PersonalForm = ({ setActiveStep, activeStep }: PersonalFormProps) => {
  const { setOnboardingForm, onboardingForm } = useOnboardingForm();
  const { getContentToken: getFormSchema } = useContentData(
    'schema.businessOwnerFormSchema'
  );

  const form = useForm<DecisionMakerFormValues>({
    defaultValues: onboardingForm?.owner ?? defaultInitialValues,
    resolver: yupResolver(createDecisionMakerFormSchema(getFormSchema)),
  });
  const { handleSubmit } = form;

  const onSubmit: any = () => {
    const errors = form?.formState?.errors;

    if (!Object.values(errors).length) {
      const newOnboardingForm = addBusinessOwner(
        onboardingForm,
        form.getValues()
      );
      setOnboardingForm(newOnboardingForm);
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <Form {...form}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
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

export { PersonalForm };
