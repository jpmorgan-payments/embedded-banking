import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Text } from '@/components/ui/text';

import { useContentData } from '../useContentData';
import { AddressForm } from './AddressForm/AddressForm';
import {
  createDecisionMakerFormSchema,
  DecisionMakerFormValues,
} from './DecisionMakerForm.schema';
import { PersonalDetailsForm } from './PersonalDetailsForm/PersonalDetailsForm';
import NavigationButtons from '../Stepper/NavigationButtons';

const defaultInitialValues = createDecisionMakerFormSchema().cast(
  {}
) as DecisionMakerFormValues;

type DecisionMakersFormProps = {
  setActiveStep: any;
  activeStep: number;
}

const DecisionMakerForm = ({setActiveStep, activeStep}: DecisionMakersFormProps ) => {
  const { getContentToken: getFormSchema } = useContentData(
    'schema.businessOwnerFormSchema'
  );
  const form = useForm<any>({
    defaultValues: defaultInitialValues,
    resolver: yupResolver(createDecisionMakerFormSchema(getFormSchema)),
  });

  const onSubmit = () => {
    const errors = form?.formState?.errors;
    if (Object.values(errors).length === 0 && form.formState.isSubmitted)
      setActiveStep(activeStep + 1);
  }

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
      <ScrollArea className="eb-h-[calc(100vh)] eb-border-t-2 eb-px-6">
          <Text size="lg">Tell us about yourself</Text>

          <Text size="lg">
            Please provide your personal information. We will verify that you
            are a controller of the business.
          </Text>
          <PersonalDetailsForm form={form} />
          <Text size="lg">What is your personal address?</Text>

          <AddressForm form={form} />
          <NavigationButtons
          onSubmit={onSubmit}
        setActiveStep={setActiveStep}
        activeStep={activeStep}
      />
        </ScrollArea>
      </form>
    </Form>
  );
};

export { DecisionMakerForm };
