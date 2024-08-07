import { Box, Separator, Title } from '@/components/ui';

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
          hidden,
          parent,
        }: QuestionSchema) => {
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
                    className: `first:eb-mt-6 ${hidden && 'eb-collapse '}`,
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
                      getContentToken(placeholderToken) || placeholderToken,
                    required,
                    form,
                    optionsList: optionsList || [],
                    defaultValue,
                    className: `${hidden && 'eb-hidden'}`,
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
                <Box
                  className={` ${!!parent && (form.getValues(parent) === 'false' || !form.getValues(parent)) ? 'eb-hidden' : 'eb-visible'}`}
                  key={name}
                >
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
                    className: `${hidden && 'eb-collapse'}`,
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