import { Box } from '@/components/ui';

import { DobFormField } from '../../formFields/DobFormField';
import { InputFormField } from '../../formFields/InputFormField';
import { JobTitlesFormField } from '../../formFields/JobTitlesFormField';
import { PhoneFormField } from '../../formFields/PhoneFormField';
import {
  SelectFormField,
  SelectFormFieldProps,
} from '../../formFields/SelectFormField';
import { SsnFormField } from '../../formFields/SsnFormField';
import { UsStatesFormField } from '../../formFields/UsStatesFormField';

export interface FormScham extends SelectFormFieldProps {
  fieldType:
    | 'input'
    | 'select'
    | 'phone'
    | 'birthdate'
    | 'ssn'
    | 'state'
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

            default:
              return null;
          }
        }
      )}
    </Box>
  );
};

export { RenderForms };
