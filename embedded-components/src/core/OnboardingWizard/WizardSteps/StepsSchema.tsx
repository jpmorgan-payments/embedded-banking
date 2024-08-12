const introSchema = {
  stepName: 'Intro',
  title: 'Lets get you started',
  form: [
    {
      name: 'organizationName',
      fieldType: 'input',
      labelToken: 'businessName.label',
      required: true,
    },
    {
      name: 'businessEmail',
      fieldType: 'input',
      labelToken: 'Business Email',
      placeholderToken: 'email',
      required: true,
    },
    {
      name: 'organizationType',
      fieldType: 'orgType',
      labelToken: 'Organization Type',
      placeholderToken: 'Select type',
      required: true,
    },
    {
      name: 'countryOfFormation',
      fieldType: 'country',
      labelToken: 'Country Formation',
      placeholderToken: 'Select country',
      required: true,
    },
  ],
};

const businessSchema = {
  stepName: 'Organization',
  form: [
    {
      name: 'organizationName',
      fieldType: 'input',
      labelToken: 'Legal Business Name',
      required: true,
    },
    {
      name: 'dbaName',
      fieldType: 'input',
      labelToken: 'businessAliasName.label',
      placeholder: 'businessAliasName.placeholder',
    },
    {
      name: 'businessEmail',
      fieldType: 'input',
      labelToken: 'businessEmail.label',
      placeholderToken: 'businessEmail.placeholder',
      required: true,
    },
    {
      name: 'organizationType',
      fieldType: 'orgType',
      labelToken: 'Organization Type',
      placeholderToken: 'Select type',
      required: true,
      disabled: true,
    },
    {
      name: 'countryOfFormation',
      fieldType: 'country',
      labelToken: 'Country of Formation',
      placeholderToken: 'Select country',
      required: true,
      disabled: true,
    },
    {
      name: 'yearOfFormation',
      fieldType: 'input',
      labelToken: 'Year of Formation',
      placeholderToken: 'YYYY',
      required: true,
    },
    {
      name: 'ein',
      fieldType: 'ein',
      labelToken: 'solePropBusinessIdentification.option.ein',
      required: true,
    },
    {
      name: 'industryCategory',
      fieldType: 'industryType',
    },
    {
      name: 'industryType',
      fieldType: null,
    },
    {
      name: 'organizationDescription',
      fieldType: 'textarea',
      labelToken: 'Business Description',
      placeHolder: 'Descipe your business',
      required: true,
    },
    {
      name: 'website',
      fieldType: 'website',
      labelToken: 'businessWebsite.label',
    },
    {
      name: 'websiteAvailable',
      fieldType: null,
    },
    {
      name: 'businessPhone',
      fieldType: 'phone',
      labelToken: 'businessPhone.label',
      required: true,
    },

    {
      labelToken: 'What is your address?',
      fieldType: 'address',
      type: 'organization',
    },
    {
      name: 'businessAddressLine1',
      fieldType: null,
    },
    {
      name: 'businessAddressLine2',
      fieldType: null,
    },
    {
      name: 'businessAddressLine3',
      fieldType: null,
    },
    {
      name: 'businessCity',
      fieldType: null,
    },
    {
      name: 'businessState',
      fieldType: null,
    },
    {
      name: 'businessPostalCode',
      fieldType: null,
    },
  ],
};

const individualSchema = {
  stepName: 'Individual',
  form: [
    {
      name: 'firstName',
      fieldType: 'input',
      labelToken: 'Legal First Name',
      placeHolder: 'Fist Name',
      required: true,
    },
    {
      name: 'middleName',
      fieldType: 'input',
      labelToken: 'Legal Middle Name',
      placeHolder: 'Last Name',
      required: false,
    },
    {
      name: 'lastName',
      fieldType: 'input',
      labelToken: 'Legal Last Name',
      placeholderToken: 'inputLN',
      required: true,
    },
    {
      name: 'individualEmail',
      fieldType: 'input',
      labelToken: 'Email',
      placeholderToken: 'example@example.com',
      required: true,
    },
    {
      name: 'jobTitle',
      fieldType: 'jobTitle',
      labelToken: 'Job Title',
      placeholderToken: 'Select Job Title',
      required: true,
    },
    {
      name: 'jobTitleDescription',
      fieldType: null,
    },
    {
      name: 'phone',
      fieldType: 'phone',
      labelToken: 'Phone',
      required: true,
    },
    {
      name: 'birthDate',
      fieldType: 'birthdate',
      labelToken: 'Date of Birth',
      required: true,
    },
    {
      name: 'ssn',
      fieldType: 'ssn',
      labelToken: 'Social Security Number',
      required: true,
    },
    {
      labelToken: 'What is your address?',
      fieldType: 'address',
      type: 'individual',
    },
    {
      name: 'addressLine1',
      fieldType: null,
    },
    {
      name: 'addressLine2',
      fieldType: null,
    },
    {
      name: 'addressLine3',
      fieldType: null,
    },
    {
      name: 'city',
      fieldType: null,
    },
    {
      name: 'state',
      fieldType: null,
    },
    {
      name: 'postalCode',
      fieldType: null,
    },
    {
      name: 'countryOfResidence',
      fieldType: null,
    },
  ],
};

const questionsSchema = {
  stepName: 'Questions',
  display: true,
};

const decisionMaker = {
  stepName: 'Decision Makers',
  display: true,
};

const reviewSchema = {
  stepName: 'Review',
  display: true,
  dependencies: {
    required: ['clientId', 'questionsAnswered'],
  },
};

const stepsSchema = [
  introSchema,
  individualSchema,
  questionsSchema,
  reviewSchema,
];

export {
  stepsSchema,
  introSchema,
  individualSchema,
  decisionMaker,
  questionsSchema,
  reviewSchema,
  businessSchema,
};
