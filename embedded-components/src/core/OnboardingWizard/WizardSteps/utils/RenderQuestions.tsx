import {
  QuestionResponse,
  QuestionResponseSubQuestionsItem,
} from '@/api/generated/smbdo.schemas';
import { Box, Separator, Title } from '@/components/ui';

import { CalendarFormField } from '../../formFields/CalendarFormField';
import { CheckBoxListFormFields } from '../../formFields/CheckboxListFormFields';
import { CountryFormField } from '../../formFields/CountryFormField';
import { DobFormField } from '../../formFields/DobFormField';
import { EinFormField } from '../../formFields/EinFormField';
import { InputFormField } from '../../formFields/InputFormField';
import { JobTitlesFormField } from '../../formFields/JobTitlesFormField';
import { PhoneFormField } from '../../formFields/PhoneFormField';
import {
  SelectFormField,
  SelectFormFieldProps,
} from '../../formFields/SelectFormField';
import { SsnFormField } from '../../formFields/SsnFormField';
import { TextareaFormField } from '../../formFields/TextareaFormField';
import { UsStatesFormField } from '../../formFields/UsStatesFormField';
import { YesNoFromField } from '../../formFields/YesNoFromField';

export interface QuestionSchema extends SelectFormFieldProps {
  questions: QuestionResponse[];
  parentId: string;
  fieldType:
    | 'input'
    | 'select'
    | 'phone'
    | 'birthdate'
    | 'ssn'
    | 'state'
    | 'separator'
    | 'country'
    | 'ein'
    | 'textarea'
    | 'website'
    | 'industryType'
    | 'orgType'
    | 'address'
    | 'jobTitle'
    //---------
    | 'calendar'
    | 'checklist'
    | 'yesNo';
}

const RenderQuestions = ({
  formSchema,
  getContentToken,
  form,
  className,
}: any) => {
  return (
    <Box className={className}>
      {formSchema.map(
        ({
          name,
          fieldType,
          labelToken,
          placeholderToken,
          required,
          optionsList,
          defaultValue,
          type,
          parentId,
          questions,
        }: QuestionSchema) => {
          const parentQuestion: QuestionResponse | undefined = questions?.find(
            (q) => q.id === parentId
          );

          const subParentQuestion:
            | QuestionResponseSubQuestionsItem[]
            | undefined = parentQuestion?.subQuestions?.filter((subQ) => {
            return Array.isArray(form.getValues(parentId))
              ? form.getValues(parentId).includes(subQ.anyValuesMatch)
              : form.getValues(parentId) === subQ.anyValuesMatch;
          });

          const hiddenElement =
            !!parentId &&
            (form.getValues(parentId) === 'false' ||
              !form.getValues(parentId) ||
              !subParentQuestion
                ?.map((q) => q.questionIds)
                .flat()
                ?.includes(name) ||
              (parentId && !form.getValues(parentId)))
              ? 'eb-hidden'
              : 'eb-visible';

          if (hiddenElement === 'eb-hidden' && form.getValues(name)) {
            form.setValue(name, undefined);
          }

          switch (fieldType) {
            case 'input':
              return (
                <InputFormField
                  key={name}
                  {...{
                    name,
                    labelToken: getContentToken(labelToken) ?? labelToken,
                    placeholderToken:
                      getContentToken(placeholderToken) ?? placeholderToken,
                    required,
                    form,
                    defaultValue,
                    className: `first:eb-mt-6 ${hiddenElement}`,
                  }}
                />
              );
            case 'select':
              return (
                <SelectFormField
                  key={name}
                  {...{
                    name,
                    labelToken: getContentToken(labelToken) ?? labelToken,
                    placeholderToken:
                      getContentToken(placeholderToken) ||
                      placeholderToken ||
                      'Select an option',
                    required,
                    form,
                    optionsList: optionsList || [],
                    defaultValue,
                    className: `${hiddenElement}`,
                  }}
                />
              );
            case 'phone':
              return (
                <PhoneFormField
                  key={name}
                  {...{
                    name,
                    labelToken: getContentToken(labelToken) ?? labelToken,
                    placeholderToken:
                      getContentToken(placeholderToken) || placeholderToken,
                    required,
                    form,
                    defaultValue,
                  }}
                />
              );

            case 'calendar':
              return (
                <Box className={`${hiddenElement}`} key={name}>
                  <CalendarFormField
                    {...{
                      name,
                      labelToken: getContentToken(labelToken) ?? labelToken,
                      placeholderToken:
                        getContentToken(placeholderToken) || placeholderToken,
                      required,
                      form,
                      defaultValue,
                    }}
                  />
                </Box>
              );

            case 'birthdate':
              return (
                <DobFormField
                  key={name}
                  {...{
                    name,
                    labelToken: getContentToken(labelToken) ?? labelToken,
                    placeholderToken:
                      getContentToken(placeholderToken) || placeholderToken,
                    required,
                    form,
                    defaultValue,
                  }}
                />
              );

            case 'ssn':
              return (
                <SsnFormField
                  key={name}
                  {...{
                    name,
                    labelToken: getContentToken(labelToken) ?? labelToken,
                    placeholderToken:
                      getContentToken(placeholderToken) || placeholderToken,
                    required,
                    form,
                    defaultValue,
                  }}
                />
              );

            case 'state':
              return (
                <UsStatesFormField
                  key={name}
                  {...{
                    name,
                    labelToken: getContentToken(labelToken) ?? labelToken,
                    placeholderToken:
                      getContentToken(placeholderToken) || placeholderToken,
                    required,
                    form,
                    defaultValue,
                  }}
                />
              );

            case 'country':
              return (
                <Box className={`${hiddenElement}`} key={name}>
                  <CountryFormField
                    key={name}
                    {...{
                      name,
                      labelToken: getContentToken(labelToken) ?? labelToken,
                      placeholderToken:
                        getContentToken(placeholderToken) ?? placeholderToken,
                      required,
                      form,
                      defaultValue,
                    }}
                  />
                </Box>
              );

            case 'jobTitle':
              return (
                <JobTitlesFormField
                  key={name}
                  {...{
                    name,
                    labelToken: getContentToken(labelToken) ?? labelToken,
                    placeholderToken:
                      getContentToken(placeholderToken) || placeholderToken,
                    required,
                    form,
                    defaultValue,
                  }}
                />
              );
            case 'separator':
              return (
                <>
                  <Title as="h3" className="eb-mb-4">
                    {getContentToken(labelToken) ?? labelToken}
                  </Title>
                  <Separator></Separator>
                </>
              );

            case 'ein':
              return (
                <EinFormField
                  key={name}
                  {...{
                    name,
                    labelToken: getContentToken(labelToken) ?? labelToken,
                    placeholderToken:
                      getContentToken(placeholderToken) || placeholderToken,
                    required,
                    form,
                    defaultValue,
                  }}
                />
              );

            case 'textarea':
              return (
                <Box className={`${hiddenElement}`} key={name}>
                  <TextareaFormField
                    {...{
                      name,
                      labelToken: getContentToken(labelToken) ?? labelToken,
                      placeholderToken:
                        getContentToken(placeholderToken) || placeholderToken,
                      required,
                      form,
                      defaultValue,
                    }}
                  />
                </Box>
              );

            case 'yesNo':
              return (
                <>
                  {!parentQuestion?.parentQuestionId &&
                    parentQuestion?.parentQuestionId === parentId && (
                      <Separator />
                    )}
                  <YesNoFromField
                    key={name}
                    {...{
                      name,
                      labelToken: getContentToken(labelToken) ?? labelToken,
                      placeholderToken:
                        getContentToken(placeholderToken) || placeholderToken,
                      required,
                      form,
                      defaultValue,
                      type,
                      className: `${hiddenElement}`,
                    }}
                  />
                </>
              );

            case 'checklist':
              return (
                <CheckBoxListFormFields
                  key={name}
                  {...{
                    name,
                    labelToken: getContentToken(labelToken) ?? labelToken,
                    placeholderToken:
                      getContentToken(placeholderToken) || placeholderToken,
                    required,
                    form,
                    defaultValue,
                    type,
                    className: `${hiddenElement}`,
                    optionsList: optionsList || [],
                  }}
                />
              );

            default:
              return null;
          }
        }
      )}
    </Box>
  );
};

export { RenderQuestions };
