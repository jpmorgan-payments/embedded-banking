import { useEffect, useState } from 'react';

import { useContentData } from '../utils/useContentData';
import { RenderForms } from './utils/RenderForms';

const IndDetails = ({ schema, form }: any) => {
  const [blank, setUpdate] = useState(0);
  const { getContentToken } = useContentData('steps.ControllerDetailsStep');

  const countryFormFields = schema?.form?.filter(
    (field: any) => field.name === 'countryOfResidence'
  )[0];

  useEffect(() => {
    if (!countryFormFields?.optionsList) {
      countryFormFields.optionsList = ['US', 'Canada', 'UK'];
      setUpdate(blank + 1);
    }
  }, [countryFormFields]);

  return (
    <>
      <RenderForms {...{ formSchema: schema.form, getContentToken, form }} />
    </>
  );
};

IndDetails.contentData = 'controllerDetailsSchema';

export { IndDetails };
