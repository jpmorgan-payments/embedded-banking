import { ReactNode } from 'react';

import { contentTokensOnboardingEng } from './contentTokensOnboardingEng';

const useContentData = (prefixes: string) => {
  const contentTokensList = contentTokensOnboardingEng;

  const getContentToken = (
    key: string,
    wordList?: Array<ReactNode | ReactNode[] | undefined>,
    customPrefix?: string
  ) => {
    const compoundKey = `${customPrefix ?? prefixes}.${key}`;

    const content = contentTokensList[compoundKey];

    return content;
  };

  return { getContentToken };
};

export type GetContentTokenType = ReturnType<
  typeof useContentData
>['getContentToken'];

export { useContentData };
