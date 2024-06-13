const StepsSchema: any = ({
  form,
  contentToken,
  stepSchema,
  getContentToken,
}: any) => {
  const initStep = {
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

  const businessStep = {
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
  const individaulStep = {
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
        name: 'lastName',
        fieldType: 'input',
        labelToken: 'inputLN',
        placeholderToken: 'inputLN',
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
  return [initStep, individaulStep];
};

export { StepsSchema };
