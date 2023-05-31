import { Title, Checkbox, Alert, Input } from '@mantine/core';
import { IconClipboardCheck, IconInfoCircle } from '@tabler/icons';

import { ValuesTable } from 'components';

import type { Step, OnboardingValues } from '../../models';

import { reviewStepSchema } from './ReviewStep.schema';

const ReviewStep: Step = ({ form, entityType }) => {
  const values: OnboardingValues = form.values;

  const valuesMap = [
    {
      title: 'Business Details',
      entries: [
        {
          label: 'Business Name',
          value: values.businessName || 'N/A',
        },
        {
          label: 'EIN',
          value: values.ein || 'N/A',
        },
        {
          label: 'Year of FOrmation',
          value: String(values.yearOfFormation),
        },
        {
          label: 'Website',
          value: values.websiteNotAvailable ? 'N/A' : values.website,
        },
        {
          label: 'Business Description',
          value: values.businessDescription,
        },
        {
          label: 'Business Address',
          value: values.businessAddress,
        },
        {
          label: 'City',
          value: values.businessCity,
        },
        {
          label: 'State',
          value: values.businessState,
        },
        {
          label: 'ZIP Code',
          value: values.businessZipCode,
        },
        {
          label: 'Phone',
          value: values.businessPhone,
        },
        {
          label: 'Industry Category',
          value: values.industryCategory,
        },
        {
          label: 'Industry Type',
          value: values.industryType,
        },
      ],
    },
    {
      title:
        values.ownersExist === 'yes' && values.controllerIsOwner === 'yes'
          ? 'Business Owner 1 (Controller) Details'
          : 'Controller Details',
      entries: [
        {
          label: 'First Name',
          value: values.controllerFirstName,
        },
        {
          label: 'Middle Name',
          value: values.controllerMiddleName,
        },
        {
          label: 'Last Name',
          value: values.controllerLastName,
        },
        {
          label: 'Email',
          value: values.controllerEmail,
        },
        ...(entityType !== 'Sole Proprietor'
          ? [
              {
                label: 'Job Title',
                value: values.controllerJobTitle,
              },
            ]
          : []),
        {
          label: 'Controller Address',
          value: values.controllerAddressSameAsBusiness
            ? values.businessAddress
            : values.controllerAddress,
        },
        {
          label: 'City',
          value: values.controllerAddressSameAsBusiness
            ? values.businessCity
            : values.controllerCity,
        },
        {
          label: 'State',
          value: values.controllerAddressSameAsBusiness
            ? values.businessState
            : values.controllerState,
        },
        {
          label: 'ZIP Code',
          value: values.controllerAddressSameAsBusiness
            ? values.businessZipCode
            : values.controllerZipCode,
        },
        {
          label: 'Phone',
          value: values.controllerPhone,
        },
        {
          label: 'Birth Date',
          value: values.controllerBirthDate.toLocaleDateString(),
        },
        {
          label: 'Social Security Number',
          value: values.ein
            ? `XXX-XX-${values.controllerSsn4}`
            : values.controllerSsn9,
        },
      ],
    },
  ].concat(
    values.ownersExist === 'yes'
      ? values.owners?.map((owner, index) => ({
          title: `Business Owner ${
            index + 1 + (values.controllerIsOwner === 'yes' ? 1 : 0)
          } Details`,
          entries: [
            {
              label: 'First Name',
              value: owner.firstName,
            },
            {
              label: 'Middle Name',
              value: owner.middleName,
            },
            { label: 'Last Name', value: owner.lastName },
            { label: 'Email', value: owner.email },
            { label: 'Address', value: owner.address },
            { label: 'City', value: owner.city },
            { label: 'State', value: owner.state },
            { label: 'ZIP Code', value: owner.zipCode },
            { label: 'Phone', value: owner.phone },
            {
              label: 'Birth Date',
              value: owner.birthDate.toLocaleDateString(),
            },
            {
              label: 'Social Security Number',
              value: `XXX-XX-${owner.ssn4}`,
            },
          ],
        }))
      : [],
  );

  return (
    <section>
      <Title order={2} mb="sm">
        Review
      </Title>
      <Alert
        icon={<IconInfoCircle size={16} />}
        title="Ensure all of the information is correct"
        mb="xl"
      >
        After you submit this form, it takes time to review your information and
        complete onboarding. During this time, you will not be able to edit this
        data, so make sure everything is correct.
      </Alert>
      <ValuesTable valuesMap={valuesMap} />
      <Input.Wrapper error={form.getInputProps('attested').error}>
        <Checkbox
          label="I certify, to the best of my knowledge, that the 
            information provided above is complete and correct"
          {...form.getInputProps('attested', {
            type: 'checkbox',
          })}
        />
      </Input.Wrapper>
    </section>
  );
};

ReviewStep.label = 'Review';
ReviewStep.Icon = IconClipboardCheck;
ReviewStep.validationSchema = reviewStepSchema;

export { ReviewStep };
