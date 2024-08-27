import { ReactNode } from 'react';
import reactStringReplace from 'react-string-replace';

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

    if (wordList && content) {
      let contentTemplate: any = content;

      wordList?.forEach((word, idx) => {
        const refEx = new RegExp(`({word${idx || ''}})`, 'g');
        contentTemplate = reactStringReplace(
          contentTemplate,
          refEx,
          () => word
        );
      });

      if (contentTemplate?.length) {
        return contentTemplate?.join('');
      }

      return contentTemplate;
    }

    return content;
  };

  return { getContentToken };
};

export type GetContentTokenType = ReturnType<
  typeof useContentData
>['getContentToken'];

export { useContentData };
