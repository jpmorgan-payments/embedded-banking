import { defaultValues } from '../../context/form.context';
import { InputFormField } from '../../formFields/InputFormField';
import { SelectFormField } from '../../formFields/SelectFormField';

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
        }: any) => {
          console.log('@@optionsList', formSchema, optionsList);

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
                    defaultValues,
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
