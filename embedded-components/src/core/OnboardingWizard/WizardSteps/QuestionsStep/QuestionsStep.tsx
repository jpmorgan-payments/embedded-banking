import { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import * as yup from 'yup';

import {
  useSmbdoListQuestions,
  useSmbdoUpdateClient,
} from '@/api/generated/embedded-banking';
import {
  QuestionListResponse,
  SchemasQuestionResponse,
} from '@/api/generated/embedded-banking.schemas';
import { Grid, Stack, Title } from '@/components/ui';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';
import { useOnboardingForm } from '@/core/OnboardingWizard/context/form.context';
import { useFormSchema } from '@/core/OnboardingWizard/context/formProvider.contex';
import { QuestionForm } from '@/core/OnboardingWizard/Forms/QuestionForm/QuestionForm';

// eslint-disable-next-line
import { useStepper } from '../../Stepper/useStepper';
// import { updateOutstandingItems } from '../../utils/actions';
import { makeQuestionsAPIBody } from '../../utils/apiUtilsParsers';
import { useContentData } from '../../utils/useContentData';
import { q } from './q';

const QuestionsStep = ({ questionsIds, children }: any) => {
  const { activeStep } = useStepper();
  const { updateSchema } = useFormSchema();
  const { getContentToken } = useContentData('steps.AdditionalDetailsStep');
  const { onboardingForm, setOnboardingForm } = useOnboardingForm();
  const { clientId } = useRootConfig();
  //TODO: When questions are answered, and no questions found, we need to say something here
  const { data: questionsList, isSuccess } = useSmbdoListQuestions({
    questionIds:
      questionsIds?.join(',') || onboardingForm?.questionsIds?.join(','),
  });
  const { mutateAsync: submitQuestions } = useSmbdoUpdateClient();
  const form = useFormContext();

  const getValidationByFormat = (format?: string, parentId?: string) => {
    const listSchema = yup
      .array()
      .min(1, getContentToken('listSchemaError') as string);
    const stringSchema = yup
      .string()
      .required(getContentToken('stringSchemaError') as string);
    const integerSchema = yup
      .number()
      .required(getContentToken('stringSchemaError') as string);

    // const booleanSchema = yup
    //   .string()
    //   .oneOf(['yes', 'no'], getContentToken(`schemaAnswerQuestion`) as string);
    const booleanSchema = yup
      .boolean()
      .required(getContentToken(`schemaAnswerQuestion`) as string);
    // .required(getContentToken('stringSchemaError') as string);

    switch (format) {
      case 'LIST':
        if (parentId) {
          return yup.array().when(parentId, {
            is: true,
            then: (s) => s.concat(listSchema),
          });
        }
        return listSchema;
      case 'BOLEAN':
        // if (parentId) {
        //   return yup.boolean().when(parentId, {
        //     is: true,
        //     then: (s: any) => s.concat(booleanSchema),
        //   });
        // }
        return booleanSchema;
      case 'INTEGER':
        if (parentId) {
          return yup.number().when(parentId, {
            is: true,
            then: (s) => s.concat(integerSchema),
          });
        }
        return integerSchema;
      case 'SINGLE':
      case 'STRING':
      default:
        if (parentId) {
          //   return yup.string().when(parentId, (val, schema) => {
          //     console.log('@@schema, val', val, schema);

          //     return val
          //       ? schema.concat(stringSchema)
          //       : schema.concat(stringSchema);
          //   });

          return yup.string().when(parentId, {
            is: true,
            then: (s) => s.concat(stringSchema),
          });
        }
        return stringSchema;
    }
  };

  const yupObject = yup.object().shape(
    ((questionsList || q) as QuestionListResponse)?.questions?.reduce(
      (a: any, v: any) => {
        if (!v?.id) return a;
        return {
          ...a,
          [v.id]: getValidationByFormat(
            v.responseSchema?.items?.type,
            v?.parentQuestionId
          ),
        };
      },
      {}
    )
  );

  // Update form scema for questions after load
  useEffect(() => {
    if (isSuccess) {
      updateSchema(yupObject);
    }
  }, [isSuccess]);

  const onSubmit = useCallback(async () => {
    const errors = form?.formState?.errors;
    if (errors) {
      return;
    }
    const questionList =
      questionsIds?.join(',') ||
      onboardingForm?.outstandingItems?.questionIds?.join(',');

    const postBody = makeQuestionsAPIBody(form.getValues(), questionList);

    const res = await submitQuestions({
      id: (onboardingForm?.id || clientId) ?? '',
      data: postBody,
    });

    setOnboardingForm({
      ...onboardingForm,
      outstandingItems: res?.outstanding,
      attestations: res?.attestations?.map((map) => map.documentId) || [],
    });
    // setCurrentStep(activeStep + 1);
  }, [activeStep]);

  return (
    <Stack>
      <Title as="h3"> {getContentToken(`title`)}</Title>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <Grid className={`eb-gap-4 eb-pt-4 ${'eb-grid-flow-row'} `}>
          {((questionsList || q) as QuestionListResponse)?.questions?.map(
            (question: SchemasQuestionResponse) => (
              <QuestionForm
                key={question?.id}
                question={question}
                form={form}
              />
            )
          )}
        </Grid>
        {children}
      </form>
    </Stack>
  );
};

QuestionsStep.title = 'Questions';

export { QuestionsStep };
