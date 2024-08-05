import { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import * as yup from 'yup';

import { useSmbdoUpdateClient } from '@/api/generated/embedded-banking';
import {
  QuestionListResponse,
  SchemasQuestionResponse,
} from '@/api/generated/embedded-banking.schemas';
import { Grid, Stack, Title } from '@/components/ui';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';
import { useFormSchema } from '@/core/OnboardingWizard/context/formProvider.contex';

// eslint-disable-next-line
import { useStepper } from '../../Stepper/useStepper';
// import { updateOutstandingItems } from '../../utils/actions';
import { makeQuestionsAPIBody } from '../../utils/apiUtilsParsers';
import { useContentData } from '../../utils/useContentData';
import { useGetDataByClientId } from '../hooks';
import { useGetQuestions } from '../hooks/useGetQuestions';
import { RenderForms } from '../utils/RenderForms';

const QuestionsStep = ({ children }: any) => {
  const { activeStep, setCurrentStep } = useStepper();
  const { updateSchema } = useFormSchema();
  const { getContentToken } = useContentData('steps.AdditionalDetailsStep');
  const { data } = useGetDataByClientId('client');
  const { clientId } = useRootConfig();

  const questionList =
    (data?.outstanding?.questionIds?.length &&
      data?.outstanding?.questionIds) ||
    (data?.questionResponses?.length &&
      data?.questionResponses?.map((response: any) => response.questionId));
  const { data: questionsData, isSuccess } = useGetQuestions(questionList);

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

    switch (format?.toLowerCase()) {
      case 'list':
        if (parentId) {
          return yup.array().when(parentId, {
            is: true,
            then: (s) => s.concat(listSchema),
          });
        }
        return listSchema;
      case 'boolean':
        // if (parentId) {
        //   return yup.boolean().when(parentId, {
        //     is: true,
        //     then: (s: any) => s.concat(booleanSchema),
        //   });
        // }
        return booleanSchema;
      case 'integer':
        if (parentId) {
          return yup.number().when(parentId, {
            is: true,
            then: (s) => s.concat(integerSchema),
          });
        }
        return integerSchema;
      case 'single':
      case 'string':
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
    (questionsData as QuestionListResponse)?.questions?.reduce(
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

  useEffect(() => {
    if (data?.questionResponses?.length) {
      data?.questionResponses.forEach((question: any) => {
        form.setValue(question.questionId, question.values);
      });
    }
  }, [data?.questionResponses?.length]);

  const onSubmit = useCallback(async () => {
    const postBody = makeQuestionsAPIBody(form.getValues(), questionList);

    try {
      await submitQuestions({
        id: clientId ?? '',
        data: postBody,
      });

      setCurrentStep(activeStep + 1);
    } catch (err) {
      console.log('@@err', err);
    }
  }, [activeStep]);

  const fieldType = (type: string | undefined) => {
    switch (type?.toLowerCase()) {
      case 'boolean':
        return 'yesNo';
      case 'integer':
        return 'input';
      case 'string':
        return 'textarea';
      default:
        return 'textarea';
    }
  };

  const questionSchame =
    questionsData &&
    questionsData?.questions?.map((question: SchemasQuestionResponse) => {
      return {
        name: question.id,
        labelToken: question?.content?.[0].label,
        fieldType: fieldType(question?.responseSchema?.items?.type),
      };
    });

  return (
    <Stack>
      <Title as="h3"> {getContentToken(`title`)}</Title>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <Grid className={`eb-gap-4 eb-pt-4 ${'eb-grid-flow-row'} `}>
          {!!questionSchame?.length && (
            <RenderForms
              {...{
                formSchema: questionSchame,
                form,
                getContentToken,
                className: `eb-space-y-2 eb-grid eb-grid-cols-3 eb-gap-4 `,
              }}
            />
          )}
        </Grid>
        {children}
      </form>
    </Stack>
  );
};

QuestionsStep.title = 'Questions';

export { QuestionsStep };
