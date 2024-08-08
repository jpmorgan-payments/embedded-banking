import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  useSmbdoGetClient,
  useSmbdoListQuestions,
  useSmbdoUpdateClient,
} from '@/api/generated/embedded-banking';
import { UpdateClientRequestSmbdo } from '@/api/generated/embedded-banking.schemas';
import { Calendar } from '@/components/ui/calendar';
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

// Define the schema for a single question response
const QuestionResponseSchema = z.object({
  questionId: z.string().max(10),
  values: z.array(z.string()).min(1).max(20),
});

// Define the schema for the entire form
const AdditionalQuestionsFormSchema = z.object({
  questionResponses: z.array(QuestionResponseSchema),
});

type QuestionResponse = z.infer<typeof QuestionResponseSchema>;
type AdditionalQuestionsFormValues = z.infer<
  typeof AdditionalQuestionsFormSchema
>;

// Define question IDs that should use a datepicker
const DATE_QUESTION_IDS = ['30071', '30073']; // Add more IDs as needed

export const AdditionalQuestionsStepForm = () => {
  const { nextStep } = useStepper();
  const { clientId, onPostClientResponse } = useOnboardingContext();

  // Fetch client data to get outstanding question IDs
  const { data: clientData } = useSmbdoGetClient(clientId ?? '');
  const outstandingQuestionIds = clientData?.outstanding?.questionIds ?? [];

  // Fetch questions using the outstanding question IDs
  const { data: questionsData } = useSmbdoListQuestions({
    questionIds: outstandingQuestionIds?.join(','),
  });

  const form = useForm<AdditionalQuestionsFormValues>({
    resolver: zodResolver(AdditionalQuestionsFormSchema),
    defaultValues: {
      questionResponses: outstandingQuestionIds.map((id) => ({
        questionId: id,
        values: [],
      })),
    },
  });

  const {
    mutate: updateClient,
    error: updateClientError,
    status: updateClientStatus,
  } = useSmbdoUpdateClient({
    mutation: {
      onSettled: (data, error) => {
        onPostClientResponse?.(data, error?.response?.data);
      },
      onSuccess: () => {
        toast.success('Additional questions submitted successfully');
        nextStep();
      },
      onError: () => {
        toast.error('Failed to submit additional questions');
      },
    },
  });

  const onSubmit = (values: AdditionalQuestionsFormValues) => {
    if (clientId) {
      const requestBody = {
        questionResponses:
          values.questionResponses as unknown as QuestionResponse[],
      } as UpdateClientRequestSmbdo;

      updateClient({
        id: clientId,
        data: requestBody,
      });
    }
  };

  console.log('@@form', form.formState.errors);

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
            <FormItem className="flex flex-col">
              <FormLabel>{question.description}</FormLabel>
              <Calendar
                mode="single"
                selected={field.value[0] ? new Date(field.value[0]) : undefined}
                onSelect={(date) =>
                  field.onChange([date ? date.toISOString().split('T')[0] : ''])
                }
                disabled={(date) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
              />
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
              <FormItem className="space-y-3">
                <FormLabel>{question.description}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange([value])}
                    defaultValue={field.value[0]}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
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
                    defaultValue={field.value[0]}
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

  // ... (continued from Part 1)

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

    const parentValue = parentResponse.values[0];
    const subQuestion = parentQuestion?.subQuestions?.find((sq: any) =>
      sq.questionIds.includes(question.id)
    );

    if (subQuestion?.anyValuesMatch === 'true') {
      return parentValue === 'true';
    }
    if (Array.isArray(subQuestion?.anyValuesMatch)) {
      return subQuestion.anyValuesMatch.includes(parentValue);
    }

    return false;
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
