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
      labelToken: 'businessName.label',
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
      name: 'organizationDescription',
      fieldType: 'textarea',
      labelToken: 'Business Description',
      placeHolder: 'Descipe your business',
    },
    {
      name: 'website',
      fieldType: 'website',
      labelToken: 'businessWebsite.label',
      required: true,
    },
    {
      name: 'businessPhone',
      fieldType: 'phone',
      labelToken: 'businessPhone.label',
      required: true,
    },

    {
      name: 'countryOfFormation',
      fieldType: 'country',
      labelToken: 'Country Formation',
      placeholderToken: 'Select country',
      required: true,
    },
    {
      name: 'yearOfFormation',
      fieldType: 'input',
      labelToken: 'Year of Formation',
      placeholderToken: 'YYYY',
      required: true,
    },

    {
      labelToken: 'What is your address?',
      fieldType: 'address',
      type: 'organization',
    },
  ],
};

const individualSchema = {
  stepName: 'Individual',
  form: [
    {
      name: 'firstName',
      fieldType: 'input',
      labelToken: 'inputFN',
      placeHolder: 'inputFN',
      required: true,
    },
    {
      name: 'middleName',
      fieldType: 'input',
      labelToken: 'inputMN',
      placeHolder: 'inputMN',
      required: false,
    },
    {
      name: 'lastName',
      fieldType: 'input',
      labelToken: 'inputLN',
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
      // TODO: add Special field type, if fieldType is just a placeholder
      fieldType: null,
      labelToken: 'Job Description',
      required: true,
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
