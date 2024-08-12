import { useMemo } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  useSmbdoGetClient,
  useSmbdoListQuestions,
  useSmbdoUpdateClient,
} from '@/api/generated/embedded-banking';
import {
  SchemasQuestionResponse,
  UpdateClientRequestSmbdo,
} from '@/api/generated/embedded-banking.schemas';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useStepper } from '@/components/ui/stepper';

import { FormActions } from '../FormActions/FormActions';
import { useOnboardingContext } from '../OnboardingContextProvider/OnboardingContextProvider';
import { ServerErrorAlert } from '../ServerErrorAlert/ServerErrorAlert';

// Define question IDs that should use a datepicker
const DATE_QUESTION_IDS = ['30071', '30073']; // Add more IDs as needed

const createDynamicZodSchema = (questionsData: SchemasQuestionResponse[]) => {
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  questionsData.forEach((question) => {
    const itemType = question?.responseSchema?.items?.type ?? 'string';
    // @ts-expect-error
    const itemEnum = question?.responseSchema?.items?.enum;

    let valueSchema;

    if (question.id && DATE_QUESTION_IDS.includes(question.id)) {
      valueSchema = z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format');
    } else if (itemType) {
      switch (itemType) {
        case 'boolean':
          valueSchema = z.enum(['true', 'false']);
          break;
        case 'string':
          if (itemEnum) {
            valueSchema = z.enum(itemEnum);
          } else {
            valueSchema = z.string();
          }
          break;
        case 'integer':
          valueSchema = z.string().regex(/^\d+$/, 'Must be a number');
          break;
        default:
          valueSchema = z.string();
      }
    } else {
      console.log('Unknown question type', question);
      return;
    }

    // If the question allows multiple values, wrap it in an array
    if (question?.responseSchema?.type === 'array') {
      valueSchema = z
        .array(valueSchema)
        .min(question?.responseSchema?.minItems ?? 1)
        .max(question?.responseSchema?.minItems ?? 1);
    }

    schemaFields[`question_${question.id}`] = z.array(valueSchema);
  });

  return z.object(schemaFields);
};

export const AdditionalQuestionsStepForm = () => {
  const { nextStep } = useStepper();
  const { clientId } = useOnboardingContext();

  // Fetch client data to get outstanding question IDs
  const { data: clientData } = useSmbdoGetClient(clientId ?? '');

  // Get outstanding question IDs and existing question responses
  const outstandingQuestionIds = clientData?.outstanding?.questionIds ?? [];
  const existingQuestionResponses = clientData?.questionResponses ?? [];

  // Merge outstanding and existing question IDs
  const allQuestionIds = useMemo(() => {
    const existingIds = existingQuestionResponses.map(
      (response) => response.questionId
    );
    return [...new Set([...outstandingQuestionIds, ...existingIds])];
  }, [outstandingQuestionIds, existingQuestionResponses]);

  // Fetch all questions
  const { data: questionsData } = useSmbdoListQuestions({
    questionIds: allQuestionIds.join(','),
  });

  // Prepare default values for the form
  const defaultValues = useMemo(
    () => ({
      questionResponses: allQuestionIds.map((id) => {
        const existingResponse = existingQuestionResponses.find(
          (response) => response.questionId === id
        );
        return {
          questionId: id,
          values: existingResponse ? existingResponse.values : [],
        };
      }),
    }),
    [allQuestionIds, existingQuestionResponses]
  );

  const {
    mutate: updateClient,
    error: updateClientError,
    status: updateClientStatus,
  } = useSmbdoUpdateClient({
    mutation: {
      onSuccess: () => {
        toast.success('Additional questions submitted successfully');
        nextStep();
      },
      onError: () => {
        toast.error('Failed to submit additional questions');
      },
    },
  });

  const renderQuestionInput = (question: any, index: number) => {
    const fieldName = `questionResponses.${index}.values` as const;
    const itemType = question.responseSchema.items?.type;
    const hasEnum = !!question.responseSchema.items?.enum;

    // Check if the question should use a datepicker
    if (DATE_QUESTION_IDS.includes(question.id)) {
      return (
        <FormField
          control={form.control}
          name={fieldName}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{question.description}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  onChange={(e) => field.onChange([e.target.value])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }

    switch (itemType) {
      case 'BOOLEAN':
        return (
          <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
              <FormItem className="eb-space-y-3">
                <FormLabel>{question.description}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange([value])}
                    defaultValue={field?.value?.[0]}
                    className="eb-flex eb-flex-col eb-space-y-1"
                  >
                    <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="eb-font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="eb-font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'STRING':
        if (hasEnum) {
          return (
            <FormField
              control={form.control}
              name={fieldName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{question.description}</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange([value])}
                    defaultValue={field?.value?.[0]}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {question.responseSchema.items.enum.map(
                        (option: string) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        }
        return (
          <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{question.description}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => field.onChange([e.target.value])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'INTEGER':
        return (
          <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{question.description}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange([e.target.value])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      default:
        return (
          <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{question.description}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => field.onChange([e.target.value])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dynamicSchema = useMemo(() => {
    const visibleQuestions: SchemasQuestionResponse[] =
      questionsData?.questions ?? [];
    if (!visibleQuestions) return z.object({});
    return createDynamicZodSchema(visibleQuestions);
  }, [questionsData]);

  const form = useForm({
    //resolver: zodResolver(dynamicSchema),
    defaultValues,
  });

  const isQuestionVisible = (question: any) => {
    if (!question.parentQuestionId) return true;

    const parentQuestion = questionsData?.questions?.find(
      (q) => q.id === question.parentQuestionId
    );
    if (!parentQuestion) return false;

    const parentResponse = form
      .watch(`questionResponses`)
      .find((r) => r.questionId === parentQuestion.id);

    if (!parentResponse) return false;

    const parentValue = parentResponse?.values?.[0];
    const subQuestion = parentQuestion?.subQuestions?.find((sq: any) =>
      sq.questionIds.includes(question.id)
    );

    if (subQuestion?.anyValuesMatch === 'true') {
      return parentValue === 'true';
    }

    if (typeof subQuestion?.anyValuesMatch === 'string') {
      return subQuestion.anyValuesMatch === parentValue;
    }

    if (Array.isArray(subQuestion?.anyValuesMatch)) {
      return (subQuestion.anyValuesMatch as string[]).includes(
        parentValue ?? ''
      );
    }

    return false;
  };

  const onSubmit = (values: any) => {
    if (clientId) {
      const questionResponses = Object.entries(values).map(([key, value]) => ({
        questionId: key.replace('question_', ''),
        values: Array.isArray(value) ? value : [value],
      }));

      const requestBody = {
        questionResponses,
      } as UpdateClientRequestSmbdo;

      updateClient({
        id: clientId,
        data: requestBody,
      });
    }
  };

  const renderQuestions = () => {
    if (!questionsData) return null;

    return questionsData?.questions?.map((question, index) => {
      if (!isQuestionVisible(question)) return null;

      return (
        <div key={question.id} className="eb-mb-6">
          {renderQuestionInput(question, index)}
        </div>
      );
    });
  };

  if (updateClientStatus === 'pending') {
    return <div>Submitting additional questions...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="eb-space-y-6">
        <h2 className="eb-text-2xl eb-font-bold">Additional Questions</h2>

        {renderQuestions()}

        <ServerErrorAlert error={updateClientError} />
        <FormActions />
      </form>
    </Form>
  );
};

export default AdditionalQuestionsStepForm;
