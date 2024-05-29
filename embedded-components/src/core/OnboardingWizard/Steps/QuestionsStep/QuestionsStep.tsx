import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import {
  smbdoListQuestions,
  smbdoUpdateClient,
} from '@/api/generated/embedded-banking';
import { SchemasQuestionResponse } from '@/api/generated/embedded-banking.schemas';
import { Form, Grid, Stack, Title } from '@/components/ui';

import { useOnboardingForm } from '../../context/form.context';
import { QuestionForm } from '../../Forms/QuestionForm/QuestionForm';
import NavigationButtons from '../../Stepper/NavigationButtons';
import { updateOutstandingItems } from '../../utils/actions';
import { makeQuestionsAPIBody } from '../../utils/apiUtilsParsers';

type QuestionsStepProps = {
  setActiveStep: any;
  activeStep: number;
};

const getValidationType = (question: SchemasQuestionResponse) => {
  switch (question?.responseSchema?.items?.type) {
    case 'boolean':
      return yup
        .string()
        .oneOf(['true', 'false'])
        .required(question?.description);
    case 'string':
      return yup.string().required(question?.description);
    default:
      return yup.string().required(question?.description);
  }
};

const shapeSchema = (questions: SchemasQuestionResponse[] | undefined) => {
  const schema = {};
  if (questions) {
    for (const q of questions) {
      // @ts-ignore
      schema[`${q?.id}`] = getValidationType(q);
    }
  }
  return schema;
};

const QuestionsStep = ({ setActiveStep, activeStep }: QuestionsStepProps) => {
  const { onboardingForm, setOnboardingForm } = useOnboardingForm();
  const [questions, setQuestions] = useState<
    SchemasQuestionResponse[] | undefined
  >([]);

  const form = useForm<any>({
    resolver: yupResolver(yup.object().shape(shapeSchema(questions))),
    mode: 'onBlur',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (onboardingForm?.outstandingItems?.questionIds) {
          const res = await smbdoListQuestions(
            onboardingForm?.outstandingItems?.questionIds
          );

          setQuestions(res?.questions);
        }
      } catch (error) {
        // TODO add error handler
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async () => {
    const errors = form?.formState?.errors;
    if (!Object.values(errors).length) {
      try {
        const postBody = makeQuestionsAPIBody(form.getValues());
        const res = await smbdoUpdateClient(onboardingForm?.id, postBody);
        const newOnboardingForm = updateOutstandingItems(
          onboardingForm,
          res.outstanding
        );
        setOnboardingForm(newOnboardingForm);
        setActiveStep(activeStep + 1);
      } catch (error) {
        // TODO add error handler
        console.log(error);
      }
    }
  };

  return (
    <Stack className="eb-w-full eb-gap-2">
      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <Title as="h3">
            Based on what you told us so far, we need additional info
          </Title>

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
            setActiveStep={setActiveStep}
            activeStep={activeStep}
          />
        </form>
      </Form>
    </Stack>
  );
};

export { QuestionsStep };
