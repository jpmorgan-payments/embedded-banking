import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Text } from '@/components/ui/text';
import { AddressForm } from './AddressForm/AddressForm';
import { PersonalDetailsForm } from './PersonalDetailsForm/PersonalDetailsForm';
import { Button } from '@/components/ui/button';
import { createDecisionMakerFormSchema, DecisionMakerFormValues } from './DecisionMakerForm.schema';

const defaultInitialValues = createDecisionMakerFormSchema().cast(
  {}
) as DecisionMakerFormValues;


const DecisionMakerForm = () => {
  const form = useForm<any>({
    initialValues: defaultInitialValues,
    validateInputOnBlur: true,
    validate: yupResolver(
      createDecisionMakerFormSchema()
    ),
  });

  const onSubmit = () => {
    console.log(form.getValues())
  }

  return (
    <Form {...form}>
      <form  onSubmit={form.handleSubmit(onSubmit)} >
        <ScrollArea className="eb-border-t-2 eb-px-6">

        <Text size="lg">
            Tell us about yourself
          </Text>
          
          <Text size="lg">
            Please provide your personal information. We will verify that you
            are a controller of the business.
          </Text>
          <PersonalDetailsForm form={form} />
          <Text size="lg">What is your personal address?</Text>

          <AddressForm form={form}/>
          <Button className="eb-bg-black" type="button">Back</Button>
          <Button className="eb-bg-black" type="submit">
            Next
          </Button>
        </ScrollArea>
      </form>
    </Form>
  );
};

export { DecisionMakerForm };
