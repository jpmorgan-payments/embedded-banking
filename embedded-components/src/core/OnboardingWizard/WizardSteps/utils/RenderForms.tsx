import { Box, Separator, Title } from '@/components/ui';

import { AddressFormFields } from '../../formFields/AddressFormFields';
import { AdressTypeFormField } from '../../formFields/AddressTypeFormField';
import { CountryFormField } from '../../formFields/CountryFormField';
import { DobFormField } from '../../formFields/DobFormField';
import { EinFormField } from '../../formFields/EinFormField';
import { IndustryFormField } from '../../formFields/IndustryFormField';
import { InputFormField } from '../../formFields/InputFormField';
import { JobTitlesFormField } from '../../formFields/JobTitlesFormField';
// eslint-disable-next-line
import { OrgTypeFormField } from '../../formFields/OrgTypeFormField';
import { PhoneFormField } from '../../formFields/PhoneFormField';
import {
  SelectFormField,
  SelectFormFieldProps,
} from '../../formFields/SelectFormField';
import { SsnFormField } from '../../formFields/SsnFormField';
import { TextareaFormField } from '../../formFields/TextareaFormField';
import { UsStatesFormField } from '../../formFields/UsStatesFormField';
import { WebsiteFromField } from '../../formFields/WebsiteFormField';
import { YesNoFromField } from '../../formFields/YesNoFromField';

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
    | 'orgType'
    | 'address'
    | 'addressType'
    | 'jobTitle'
    //---------
    | 'yesNo';
}

const RenderForms = ({
  formSchema,
  getContentToken,
  form,
  className,
  onChange,
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
          disabled,
          optionsList,
          defaultValue,
          type,
          hidden,
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
                    disabled,
                    form,
                    defaultValue,
                    className: `first:eb-mt-2 ${hidden && 'eb-collapse '}`,
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
                    disabled,
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
                    type,
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
                    disabled,
                    className: ' eb-col-end-4',
                  }}
                />
              );

            case 'orgType':
              return (
                <OrgTypeFormField
                  key={name}
                  {...{
                    name,
                    labelToken: getContentToken(labelToken) ?? labelToken,
                    placeholderToken:
                      getContentToken(placeholderToken) ?? placeholderToken,
                    required,
                    form,
                    defaultValue,
                    disabled,
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
                  key={(getContentToken(labelToken) ?? labelToken) || name}
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
                <Box
                  className={`eb-col-span-3 ${hidden && 'eb-collapse'}`}
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

            case 'website':
              return (
                <Box className="eb-col-span-3" key={name}>
                  <WebsiteFromField
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
                <Box className="eb-col-span-3" key={name}>
                  <IndustryFormField
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

            case 'address':
              return (
                <Box className="eb-col-span-3" key={name}>
                  <AddressFormFields
                    {...{
                      name,
                      labelToken: getContentToken(labelToken) ?? labelToken,
                      placeholderToken:
                        getContentToken(placeholderToken) || placeholderToken,
                      required,
                      form,
                      defaultValue,
                      type,
                    }}
                  />
                </Box>
              );

            case 'addressType':
              return (
                <AdressTypeFormField
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
                    // TODO: classes are incorrect
                    className: '',
                  }}
                />
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
                    onChange,
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
