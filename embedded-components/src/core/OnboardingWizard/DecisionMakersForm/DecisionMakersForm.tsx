import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';

import { addController } from '../context/form.actions';
import { useOnboardingForm } from '../context/form.context';
import NavigationButtons from '../Stepper/NavigationButtons';
import { useContentData } from '../useContentData';
import { AddressForm } from './AddressForm/AddressForm';
import {
  createDecisionMakerFormSchema,
  DecisionMakerFormValues,
} from './DecisionMakerForm.schema';
import { PersonalDetailsForm } from './PersonalDetailsForm/PersonalDetailsForm';

const defaultInitialValues = createDecisionMakerFormSchema().cast({});

type DecisionMakersFormProps = {
  setActiveStep: any;
  activeStep: number;
};

const DecisionMakerForm = ({
  setActiveStep,
  activeStep,
}: DecisionMakersFormProps) => {
  // @ts-ignore
  const { setOnboardingForm, onboardingForm } = useOnboardingForm();
  const { getContentToken: getFormSchema } = useContentData(
    'schema.businessOwnerFormSchema'
  );

  const form = useForm<DecisionMakerFormValues>({
    defaultValues: onboardingForm?.controller ?? defaultInitialValues,
    resolver: yupResolver(createDecisionMakerFormSchema(getFormSchema)),
  });

  const onSubmit = () => {
    const errors = form?.formState?.errors;
    if (!Object.values(errors).length) {
      const newOnboardingForm = addController(onboardingForm, form.getValues());
      setOnboardingForm(newOnboardingForm);
      setActiveStep(activeStep + 1);
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
