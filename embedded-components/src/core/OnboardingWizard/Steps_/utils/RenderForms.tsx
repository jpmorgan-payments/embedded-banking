import { Box, Separator, Title } from '@/components/ui';

import { CountryFormField } from '../../formFields/CountryFormField';
import { DobFormField } from '../../formFields/DobFormField';
import { EinFormField } from '../../formFields/EinFormField';
import { IndustryFormField } from '../../formFields/IndustryFormField';
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
import { WebsiteFromField } from '../../formFields/WebsiteFormField';

export interface FormScham extends SelectFormFieldProps {
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
    | 'jobTitle';
}

const RenderForms = ({ formSchema, getContentToken, form, className }: any) => {
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
        }: FormScham) => {
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
                    className: 'first:eb-mt-6',
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
                <Box
                  className="eb-col-span-3"
                  key={getContentToken(labelToken) ?? labelToken}
                >
                  <Title as="h3" className="eb-mb-4">
                    {getContentToken(labelToken) ?? labelToken}
                  </Title>
                  <Separator></Separator>
                </Box>
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
                <Box className="eb-col-span-3">
                  <TextareaFormField
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
                </Box>
              );

            case 'website':
              return (
                <Box className="eb-col-span-3">
                  <WebsiteFromField
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
                </Box>
              );

            case 'industryType':
              return (
                <Box className="eb-col-span-3">
                  <IndustryFormField
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
                </Box>
              );

            default:
              return null;
          }
        }
      )}
    </Box>
  );
};

export { RenderForms };
