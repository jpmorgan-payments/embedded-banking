import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { smbdoListQuestions } from '@/api/generated/embedded-banking';
import { SchemasQuestionResponse } from '@/api/generated/embedded-banking.schemas';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { Title } from '@/components/ui/title';

import { useOnboardingForm } from '../../context/form.context';
import NavigationButtons from '../../Stepper/NavigationButtons';

type QuestionsStepProps = {
  setActiveStep: any;
  activeStep: number;
};

const QuestionsStep = ({ setActiveStep, activeStep }: QuestionsStepProps) => {
  // @ts-ignore

  const { onboardingForm } = useOnboardingForm();
  const [questions, setQuestions] = useState<
    SchemasQuestionResponse[] | undefined
  >([]);
  const form = useForm({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (onboardingForm?.outstandingItems?.questionIds) {
          const res = await smbdoListQuestions(
            onboardingForm?.outstandingItems?.questionIds
          );
          console.log(res);
          setQuestions(res?.questions);
        }
      } catch (error) {
        // TODO add error handler
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = () => {
    const errors = form?.formState?.errors;
    if (!Object.values(errors).length) {
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <Title as="h2">
          Based on what you told us so far, we need additional info
        </Title>

        <Separator />
        {questions?.map((question) => (
          <>
            <Text key={question.id}>{question?.content?.[0].label}</Text>
            <Separator />
          </>
        ))}
        <NavigationButtons
          onSubmit={onSubmit}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
        />
      </form>
    </Form>
  );
};

export { QuestionsStep };
