import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { addController } from '../../context/form.actions';
import { useOnboardingForm } from '../../context/form.context';
import NavigationButtons from '../../Stepper/NavigationButtons';
import { useContentData } from '../../useContentData';
import { AddressForm } from '../../Forms/AddressForm/AddressForm';
import {
  PersonalDetailsValues,
  createPersonalDetailsSchema,
} from './PersonalDetailsStep.schema';
import { PersonalDetailsForm } from '../../Forms/PersonalDetailsForm/PersonalDetailsForm';

const defaultInitialValues = createPersonalDetailsSchema().cast({});

type PersonalDetailsStepProps = {
  setActiveStep: any;
  activeStep: number;
};

const PersonalDetailsStep = ({
  setActiveStep,
  activeStep,
}: PersonalDetailsStepProps) => {
  // @ts-ignore
  const { setOnboardingForm, onboardingForm } = useOnboardingForm();
  const { getContentToken: getFormSchema } = useContentData(
    'schema.businessOwnerFormSchema'
  );

  const form = useForm<PersonalDetailsValues>({
    defaultValues: onboardingForm?.controller ?? defaultInitialValues,
    resolver: yupResolver(createPersonalDetailsSchema(getFormSchema)),
  });

  const onSubmit = () => {
    const errors = form?.formState?.errors;
    if (Object.values(errors).length === 0 && form.formState.isSubmitted) {
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

export { PersonalDetailsStep };
