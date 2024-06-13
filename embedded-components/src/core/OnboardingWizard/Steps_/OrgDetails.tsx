import { useContentData } from '../utils/useContentData';
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

export { OrgDetails };
