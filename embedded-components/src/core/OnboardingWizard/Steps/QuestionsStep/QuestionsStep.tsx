import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { smbdoListQuestions } from '@/api/generated/embedded-banking';
import { SchemasQuestionResponse } from '@/api/generated/embedded-banking.schemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Grid,
  RadioGroup,
  RadioGroupItem,
  Separator,
  Stack,
  TextArea,
  Title,
} from '@/components/ui';

import { useOnboardingForm } from '../../context/form.context';
import NavigationButtons from '../../Stepper/NavigationButtons';

type QuestionsStepProps = {
  setActiveStep: any;
  activeStep: number;
};

type QuestionProps = {
  question: SchemasQuestionResponse;
  form: any;
};

const Question = ({ question, form }: QuestionProps) => {
  return (
    <>
      {question?.responseSchema?.items?.type === 'boolean' ? (
        <FormField
          control={form.control}
          name={`${question?.id}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="eb-my-5" asterisk>
                {question?.content && question.content[0].label}
              </FormLabel>

              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="eb-flex eb-flex-row eb-space-y-1"
                >
                  <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                    <RadioGroupItem value="yes" />

                    <FormLabel className="eb-font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                    <RadioGroupItem value="no" />

                    <FormLabel className="eb-font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      ) : (
        <FormField
          control={form.control}
          name={`${question?.id}`}
          render={({ field }) => (
            <FormItem>
              <Stack>
                <FormLabel className="eb-my-5" asterisk>
                  {question?.content && question.content[0].label}
                </FormLabel>
                <FormControl>
                  <TextArea
                    {...field}
                    size="md"
                    className="eb-h-30 eb-border-solid eb-border"
                  />
                </FormControl>
                <FormMessage />
              </Stack>
            </FormItem>
          )}
        />
      )}
      <Separator />
    </>
  );
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
            <Question questions={questions} question={question} form={form} />
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
