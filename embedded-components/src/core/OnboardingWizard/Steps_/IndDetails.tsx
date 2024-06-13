import { useEffect, useState } from 'react';

import { Box } from '@/components/ui';

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
    <Box className="eb-grid eb-grid-cols-3 eb-gap-4">
      <RenderForms {...{ formSchema: schema.form, getContentToken, form }} />
    </Box>
  );
};

IndDetails.contentData = 'controllerDetailsSchema';

export { IndDetails };
