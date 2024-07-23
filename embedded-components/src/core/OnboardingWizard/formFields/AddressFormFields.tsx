import { useFormContext } from 'react-hook-form';

import { Box } from '@/components/ui';
import { useContentData } from '@/core/OnboardingWizard/utils/useContentData';
// eslint-disable-next-line
import { RenderForms } from '@/core/OnboardingWizard/WizardSteps/utils/RenderForms';

const addressSchemaIndividual = [
  {
    labelToken: ' What is your address?',
    fieldType: 'separator',
  },
  {
    name: 'addressLine1',
    fieldType: 'input',
    labelToken: 'Address Line One',
    required: true,
  },
  {
    name: 'addressLine2',
    fieldType: 'input',
    labelToken: 'Address Line Two',
    required: true,
  },
  {
    name: 'addressLine3',
    fieldType: 'input',
    labelToken: 'Address Line Three',
    required: true,
  },
  {
    name: 'city',
    fieldType: 'input',
    labelToken: 'City',
    required: true,
  },
  {
    name: 'state',
    fieldType: 'state',
    labelToken: 'State',
    required: true,
  },
  {
    name: 'zip',
    fieldType: 'input',
    labelToken: 'Zip',
    required: true,
  },
  {
    name: 'countryOfResidence',
    fieldType: 'country',
    labelToken: 'Country of Residence',
    placeholderToken: 'Select country',
    required: true,
  },
];

const orgAddress = [
  {
    labelToken: 'What is your business address?',
    fieldType: 'separator',
  },
  {
    name: 'businessAddressLine1',
    fieldType: 'input',
    labelToken: 'Address Line One',
    required: true,
  },
  {
    name: 'businessAddressLine2',
    fieldType: 'input',
    labelToken: 'Address Line Two',
    required: false,
  },
  {
    name: 'businessAddressLine3',
    fieldType: 'input',
    labelToken: 'Address Line Three',
    required: false,
  },
  {
    name: 'cityBusiness',
    fieldType: 'input',
    labelToken: 'City',
    required: true,
  },
  {
    name: 'stateBusiness',
    fieldType: 'state',
    labelToken: 'State',
    required: true,
  },
  {
    name: 'zipBusiness',
    fieldType: 'input',
    labelToken: 'Zip',
    required: true,
  },
];

const AddressFormFields = ({ type }: any) => {
  const form = useFormContext();

  const { getContentToken } = useContentData('steps.ControllerDetailsStep');

  return (
    <Box className="eb-w-full">
      <RenderForms
        {...{
          formSchema:
            type === 'individual' ? addressSchemaIndividual : orgAddress,
          getContentToken,
          form,
          className: `eb-space-y-4 eb-grid eb-grid-cols-3 eb-gap-4 first:eb-mt-8`,
        }}
      />
    </Box>
  );
};

export { AddressFormFields };
