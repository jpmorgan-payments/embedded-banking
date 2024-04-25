import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
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

const defaultInitialValues = createDecisionMakerFormSchema().cast(
  {}
) as DecisionMakerFormValues;

const DecisionMakerForm = () => {
  const { getContentToken: getFormSchema } = useContentData(
    'schema.businessOwnerFormSchema'
  );
  const form = useForm<any>({
    defaultValues: defaultInitialValues,
    resolver: yupResolver(createDecisionMakerFormSchema(getFormSchema)),
  });

  const onSubmit = () => {
    console.log('submitted!');
  };

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <ScrollArea className="eb-border-t-2 eb-px-6">
          <Text size="lg">Tell us about yourself</Text>

          <Text size="lg">
            Please provide your personal information. We will verify that you
            are a controller of the business.
          </Text>
          <PersonalDetailsForm form={form} />
          <Text size="lg">What is your personal address?</Text>

          <AddressForm form={form} />
          <Button className="eb-bg-black" type="button">
            Back
          </Button>
          <Button className="eb-bg-black" type="submit">
            Next
          </Button>
        </ScrollArea>
      </form>
    </Form>
  );
};

export { DecisionMakerForm };
