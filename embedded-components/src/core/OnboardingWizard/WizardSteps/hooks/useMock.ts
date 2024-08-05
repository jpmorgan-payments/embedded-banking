import { useMemo } from 'react';

import { fromApiToForm } from '../../utils/fromApiToForm';

// TODO: check if nessary, since i use mockArgs
const useMockData = (data: any) => {
  const reviewData = useMemo(() => {
    return data && fromApiToForm(data);
  }, [data]);

  return reviewData;
};
export { useMockData };
