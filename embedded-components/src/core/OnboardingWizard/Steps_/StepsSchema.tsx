const initSchema = {
  stepName: 'Init',
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
      fieldType: 'select',
      labelToken: 'Organization Type',
      placeholderToken: 'Select type',
      required: true,
    },
    {
      name: 'countryOfFormation',
      fieldType: 'select',
      labelToken: 'Select Country',
      placeholderToken: 'Select country',
      required: true,
    },
  ],
};

const businessSchema = {
  stepName: 'Business',
  form: [
    {
      name: 'businessDescription',
      fieldType: 'textArea',
      labelToken: 'businessDescription.label',
      placeHolder: 'businessDescription.placeholder',
      required: true,
    },
    {
      name: 'businessEmail',
      fieldType: 'input',
      labelToken: 'businessEmail.label',
      placeholderToken: 'businessEmail.placeholder',
    },
    // {
    //   name: 'legalStructure',
    //   fieldType: 'select',
    //   selectOptions: (options: any) => options,
    // },
  ],
};

const individaulSchema = {
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
      name: 'email',
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
      fieldType: 'select',
      labelToken: 'Country of Residence',
      placeholderToken: 'Select country',
      required: true,
    },
  ],
};

const questionsSchema = {
  stepName: 'Questions',
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
  initSchema,
  individaulSchema,
  questionsSchema,
  reviewSchema,
];

export {
  stepsSchema,
  initSchema,
  individaulSchema,
  questionsSchema,
  reviewSchema,
  businessSchema,
};
