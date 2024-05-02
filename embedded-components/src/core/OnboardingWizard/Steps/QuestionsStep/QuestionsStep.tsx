import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { smbdoListQuestions } from '@/api/generated/embedded-banking';
import { SchemasQuestionResponse } from '@/api/generated/embedded-banking.schemas';
import { Form, Grid, Separator, Title } from '@/components/ui';
import { useOnboardingForm } from '../../context/form.context';
import { QuestionForm } from '../../Forms/QuestionForm/QuestionForm';
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
        <Grid className={`eb-gap-4 eb-pt-4 ${'eb-grid-flow-row'} `}>
          {questions?.map((question) => (
            <QuestionForm
              key={question?.id}
              question={question}
              form={form}
            />
          ))}
        </Grid>
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
