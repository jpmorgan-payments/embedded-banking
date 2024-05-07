import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { Stack, Title } from '@/components/ui';

import { addController } from '../../utils/actions';
import { useOnboardingForm } from '../../context/form.context';
import { AddressForm } from '../../Forms/AddressForm/AddressForm';
import { PersonalDetailsForm } from '../../Forms/PersonalDetailsForm/PersonalDetailsForm';
import NavigationButtons from '../../Stepper/NavigationButtons';
import { useContentData } from '../../utils/useContentData';
import {
  createPersonalDetailsSchema,
  PersonalDetailsValues,
} from './PersonalDetailsStep.schema';

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
    if (!Object.values(errors).length) {
      const newOnboardingForm = addController(onboardingForm, form.getValues());
      setOnboardingForm(newOnboardingForm);
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <Stack className="eb-w-full eb-gap-2">
      <Title as="h2">Tell us about yourself</Title>
      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <Text size="lg" >
            Please provide your personal information. We will verify that you
            are a controller of the business.
          </Text>
          <PersonalDetailsForm form={form} />
          <Text size="lg" className="eb-my-3">What is your personal address?</Text>

          <AddressForm form={form} />
          <NavigationButtons
            onSubmit={onSubmit}
            setActiveStep={setActiveStep}
            activeStep={activeStep}
          />
        </form>
      </Form>
    </Stack>
  );
};

export { PersonalDetailsStep };
