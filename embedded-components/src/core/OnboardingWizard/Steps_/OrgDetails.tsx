import { useContentData } from '../utils/useContentData';
import { businessSchema } from './StepsSchema';
import { RenderForms } from './utils/RenderForms';

const OrgDetails = ({ schema, form }: any) => {
  const { getContentToken } = useContentData('steps.BusinessDetailsStep');
  return (
    <>
      <RenderForms {...{ formSchema: schema.form, getContentToken, form }} />
    </>
  );
};

OrgDetails.contentData = 'BusinessDetailsStep';
OrgDetails.formSchema = businessSchema;

export { OrgDetails };
