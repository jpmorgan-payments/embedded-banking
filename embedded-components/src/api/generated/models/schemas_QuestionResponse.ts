/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AnyValuesMatch } from './AnyValuesMatch';
import type { ContentItem } from './ContentItem';
import type { LocaleId } from './LocaleId';
import type { QuestionDescription } from './QuestionDescription';
import type { QuestionId } from './QuestionId';
import type { ResponseSchema } from './ResponseSchema';
import type { schemas_QuestionIdList } from './schemas_QuestionIdList';

export type schemas_QuestionResponse = {
    content?: Array<ContentItem>;
    defaultLocale?: LocaleId;
    description?: QuestionDescription;
    id?: QuestionId;
    parentQuestionId?: QuestionId;
    responseSchema?: ResponseSchema;
    subQuestions?: Array<{
anyValuesMatch?: AnyValuesMatch;
questionIds?: schemas_QuestionIdList;
}>;
};
