import { useCallback, useEffect } from 'react';
import uniqBy from 'lodash/uniqBy';
import { useFormContext } from 'react-hook-form';
import * as yup from 'yup';

import { useSmbdoUpdateClient } from '@/api/generated/smbdo';
import {
  QuestionListResponse,
  QuestionResponse,
  ResponseSchema,
  ResponseSchemaItem,
} from '@/api/generated/smbdo.schemas';
import { Grid, Stack, Title } from '@/components/ui';
import { useRootConfig } from '@/core/EBComponentsProvider/RootConfigProvider';
import { useFormSchema } from '@/core/OnboardingWizard/context/formProvider.context';

import { useError } from '../../context/error.context';
// eslint-disable-next-line
import { useStepper } from '../../Stepper/useStepper';
// import { updateOutstandingItems } from '../../utils/actions';
import { makeQuestionsAPIBody } from '../../utils/apiUtilsParsers';
import { useContentData } from '../../utils/useContentData';
import { useGetDataByClientId } from '../hooks';
import { useGetQuestions } from '../hooks/useGetQuestions';
import { RenderQuestions } from '../utils/RenderQuestions';

const QuestionsStep = ({ children }: any) => {
  const { activeStep, setCurrentStep } = useStepper();
  const { updateSchema } = useFormSchema();
  const { getContentToken } = useContentData('steps.AdditionalDetailsStep');
  const { data } = useGetDataByClientId();
  const { clientId } = useRootConfig();
  const { setError } = useError();

  const questionList =
    (data?.outstanding?.questionIds?.length &&
      data?.outstanding?.questionIds) ||
    (data?.questionResponses?.length &&
      data?.questionResponses?.map((response: any) => response.questionId));

  const {
    data: questionsData,
    isSuccess,
  }: { data: QuestionListResponse | undefined; isSuccess: boolean } =
    useGetQuestions(questionList as string[]);

  const findSubQuestions = questionsData?.questions
    ?.filter((q) => q?.subQuestions?.length)
    ?.map((question) => {
      return (
        question?.subQuestions?.length &&
        question.subQuestions
          .filter((subQ) => !!subQ?.questionIds?.length)
          .map((q) => q?.questionIds)
      );
    })
    .flat(2);

  const {
    data: subQuestionsData,
    // isSuccess: isSucessSub,
  }: { data: QuestionListResponse | undefined; isSuccess: boolean } =
    useGetQuestions((findSubQuestions ?? ['']) as string[]);

  const fullQuesitonSet = uniqBy(
    [questionsData?.questions, subQuestionsData?.questions].flat(),
    'id'
  ).filter(Boolean);

  const { mutateAsync: submitQuestions } = useSmbdoUpdateClient();
  const form = useFormContext();
  const DATE_QUESTION_IDS = ['30071', '30073'];
  const COUNTRY_QUESTION_IDS = ['30072', '30070'];

  // THIS ENABLES UPDATE ON FORUM RENDER
  form.watch();

  const getValidationByFormat = (
    qSchema: ResponseSchema,
    format?: string,
    parentId?: string
  ) => {
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
        if (qSchema.maxItems && qSchema.maxItems > 1 && qSchema.minItems) {
          return yup
            .array()
            .min(qSchema.minItems, getContentToken('listSchemaError') as string)
            .max(
              qSchema.maxItems,
              // TODO: Get correct error message
              `Only select ${qSchema.maxItems} options`
            )
            .required();
        }
        return stringSchema;
    }
  };

  const yupObject = yup.object().shape(
    fullQuesitonSet?.reduce((a: any, v: any) => {
      if (!v?.id) return a;

      return {
        ...a,
        [v.id]: getValidationByFormat(
          v.responseSchema,
          v.responseSchema?.items?.type,
          v?.parentQuestionId
        ),
      };
    }, {})
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
        if (DATE_QUESTION_IDS.includes(question.questionId)) {
          form.setValue(
            question.questionId,
            new Date(question?.values?.[0] || question?.values)
          );
          return;
        }

        form.setValue(
          question.questionId,
          question?.values?.[0] || question?.values
        );
      });
    }
  }, [data?.questionResponses?.length]);

  const onSubmit = useCallback(async () => {
    const postBody = makeQuestionsAPIBody(
      form.getValues(),
      questionList as string[]
    );

    try {
      await submitQuestions({
        id: clientId ?? '',
        data: postBody,
      });

      setCurrentStep(activeStep + 1);
    } catch (err) {
      setError(true);
    }
  }, [activeStep]);

  //TODO: We need to update the type once this Response is resolved
  interface EnumQ extends ResponseSchemaItem {
    enum?: string[];
  }
  const fieldType = (
    questions: ResponseSchema,
    opt: { date: boolean; country: boolean }
  ) => {
    // eslint-disable-next-line
    const items: EnumQ | undefined = questions.items;
    const type = items?.type;

    switch (type?.toLowerCase()) {
      case 'enum':
        return 'select';
      case 'boolean':
        return 'yesNo';
      case 'integer':
        return 'input';
      case 'string':
        if (questions?.maxItems && questions?.maxItems > 1) {
          return `checklist`;
        }

        if (opt.date) {
          return 'calendar';
        }
        if (opt.country) {
          return 'country';
        }

        if (items?.enum?.length) {
          return `select`;
        }
        return 'textarea';
      default:
        return 'textarea';
    }
  };

  const questionSchame = fullQuesitonSet?.length
    ? fullQuesitonSet?.map((question: any | QuestionResponse) => {
        return {
          name: question?.id,
          labelToken: question?.content?.[0].label,
          fieldType: fieldType(
            question?.responseSchema,

            // TODO: Temporary
            {
              date: DATE_QUESTION_IDS.includes(question?.id),
              country: COUNTRY_QUESTION_IDS.includes(question?.id),
            }
          ),
          hidden: !!question?.parentQuestionId,
          parentId: question?.parentQuestionId,
          questions: questionsData?.questions,
          optionsList:
            question?.responseSchema?.items?.enum?.map((list: string) => {
              return {
                value: list,
                label: list,
              };
            }) ?? [],
        };
      })
    : [];

  return (
    <Stack>
      <Title as="h3"> {getContentToken(`title`)}</Title>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <Grid className="eb-flex-col eb-gap-4 eb-pt-4">
          {!!questionSchame?.length && (
            <RenderQuestions
              {...{
                formSchema: questionSchame,
                form,
                getContentToken,
                className: `eb-space-y-2 eb-grid eb-gap-4 `,
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
