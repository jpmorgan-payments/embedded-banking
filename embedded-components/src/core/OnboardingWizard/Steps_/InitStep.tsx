import { useEffect, useState } from 'react';

import { useContentData } from '../utils/useContentData';
import { RenderForms } from './utils/RenderForms';

const InitStep = ({ schema, form }: any) => {
  const [blank, setUpdate] = useState(0);
  const { getContentToken } = useContentData('steps.BusinessDetailsStep');
  const orgTypesFormFields = schema?.form?.filter(
    (field: any) => field.name === 'organizationType'
  )[0];
  const countryFormFields = schema?.form?.filter(
    (field: any) => field.name === 'countryOfFormation'
  )[0];

  console.log('@@STEP1', schema, form, orgTypesFormFields);

  useEffect(() => {
    if (!orgTypesFormFields?.optionsList) {
      orgTypesFormFields.optionsList = [
        'Corporation',
        'Limited Partnership',
        'Limited Liability Company',
        'Sole Proprietorship',
      ];
      setUpdate(blank + 1);
    }

    if (!countryFormFields?.optionsList) {
      countryFormFields.optionsList = ['US', 'Canada', 'UK'];
      setUpdate(blank + 1);
    }
  }, [orgTypesFormFields, countryFormFields]);

  return (
    <>
      <RenderForms {...{ formSchema: schema.form, getContentToken, form }} />
    </>
  );
};

InitStep.contentData = 'BusinessDetailsStep';

export { InitStep };
