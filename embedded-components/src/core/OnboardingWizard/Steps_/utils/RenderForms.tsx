import { InputFormField } from '../../formFields/InputFormField';
import {
  SelectFormField,
  SelectFormFieldProps,
} from '../../formFields/SelectFormField';

export interface FormScham extends SelectFormFieldProps {
  fieldType: 'input' | 'select';
}

const RenderForms = ({ formSchema, getContentToken, form }: any) => {
  return (
    <>
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
            default:
              return null;
          }
        }
      )}
    </>
  );
};

export { RenderForms };
