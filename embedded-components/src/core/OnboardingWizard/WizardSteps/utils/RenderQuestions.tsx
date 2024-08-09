import {
  SchemasQuestionResponse,
  SchemasQuestionResponseSubQuestionsItem,
} from '@/api/generated/embedded-banking.schemas';
import { Box, Separator, Title } from '@/components/ui';

import { CalendarFormField } from '../../formFields/CalendarFormField';
// import { AddressFormFields } from '../../formFields/AddressFormFields';
import { CountryFormField } from '../../formFields/CountryFormField';
import { DobFormField } from '../../formFields/DobFormField';
import { EinFormField } from '../../formFields/EinFormField';
// import { IndustryFormField } from '../../formFields/IndustryFormField';
import { InputFormField } from '../../formFields/InputFormField';
import { JobTitlesFormField } from '../../formFields/JobTitlesFormField';
// eslint-disable-next-line
// import { OrgTypeFormField } from '../../formFields/OrgTypeFormField';
import { PhoneFormField } from '../../formFields/PhoneFormField';
import {
  SelectFormField,
  SelectFormFieldProps,
} from '../../formFields/SelectFormField';
import { SsnFormField } from '../../formFields/SsnFormField';
import { TextareaFormField } from '../../formFields/TextareaFormField';
import { UsStatesFormField } from '../../formFields/UsStatesFormField';
// import { WebsiteFromField } from '../../formFields/WebsiteFormField';
import { YesNoFromField } from '../../formFields/YesNoFromField';

export interface QuestionSchema extends SelectFormFieldProps {
  questions: SchemasQuestionResponse[];
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
          const parentQuestion: SchemasQuestionResponse | undefined =
            questions?.find((q) => q.id === parentId);

          const subParentQuestion:
            | SchemasQuestionResponseSubQuestionsItem
            | undefined = parentQuestion?.subQuestions?.find(
            (subQ) => form.getValues(parentId) === subQ.anyValuesMatch
          );

          const hiddenElement =
            !!parentId &&
            (form.getValues(parentId) === 'false' ||
              form.getValues(parentId) === 'None' ||
              !subParentQuestion?.questionIds?.includes(name) ||
              !form.getValues(parentId))
              ? 'eb-hidden'
              : 'eb-visible';

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
