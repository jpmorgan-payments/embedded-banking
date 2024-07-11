import { SchemasQuestionResponse } from '@/api/generated/embedded-banking.schemas';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
  Separator,
  Stack,
  TextArea,
} from '@/components/ui';

type QuestionFormProps = {
  question: SchemasQuestionResponse;
  form: any;
};

const QuestionForm = ({ question, form }: QuestionFormProps) => {
  console.log('@@question', question);

  return (
    <>
      {/* TODO: TYPE ARE INCORRECT */}
      {question?.responseSchema?.items?.type === 'BOOLEAN' ? (
        <FormField
          control={form.control}
          name={`${question?.id}`}
          render={({ field }) => {
            console.log('@@field', field);
            return (
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
                      <RadioGroupItem value="true" />

                      <FormLabel className="eb-font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="eb-flex eb-items-center eb-space-x-3 eb-space-y-0">
                      <RadioGroupItem value="false" />

                      <FormLabel className="eb-font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>

                <FormMessage />
              </FormItem>
            );
          }}
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
                    className="eb-h-30 eb-border eb-border-solid"
                  />
                </FormControl>
                <FormMessage />
              </Stack>
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export { QuestionForm };
