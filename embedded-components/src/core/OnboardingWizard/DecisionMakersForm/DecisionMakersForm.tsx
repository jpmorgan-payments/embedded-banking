import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Text } from '@/components/ui/text';
import { AddressForm } from './AddressForm/AddressForm';
import { PersonalDetailsForm } from './PersonalDetailsForm/PersonalDetailsForm';
import { Button } from '@/components/ui/button';


const DecisionMakerForm = () => {
  const form = useForm<any>({});

  return (
    <Form {...form}>
      <form /* onSubmit={form?.handleSubmit(onSubmit)} */>
        <ScrollArea className="eb-border-t-2 eb-px-6">

        <Text size="lg">
            Tell us about yourself
          </Text>
          
          <Text size="lg">
            Please provide your personal information. We will verify that you
            are a controller of the business.
          </Text>
          <PersonalDetailsForm />
          <Text size="lg">What is your personal address?</Text>

          <AddressForm />
          <Button type="button">Back</Button>
          <Button variant="default" type="submit">
            Next
          </Button>
        </ScrollArea>
      </form>
    </Form>
  );
};

export { DecisionMakerForm };
