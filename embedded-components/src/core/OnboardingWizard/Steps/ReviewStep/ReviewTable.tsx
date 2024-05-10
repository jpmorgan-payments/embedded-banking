import { Group } from '@/components/ui/group';
import { Text } from '@/components/ui/text';
import { Title } from '@/components/ui/title';

import ReviewValues from './ReviewValues';

export type ValuesMapType = {
  title?: string | JSX.Element;
  titleRightContent?: JSX.Element;
  subtitle?: string | JSX.Element;
  entries: {
    label: string;
    value?: string | JSX.Element;
    color?: any | 'dark.3';
    dimmed?: boolean;
  }[];
}[];

type ValuesTableProps = {
  valuesMap: ValuesMapType;
};

export function ReviewTable({ valuesMap }: ValuesTableProps) {
  return (
    <div aria-hidden="false">
      {valuesMap.map((section, index) => (
        <div key={index}>
          {section.title ? (
            <Group>
              <Title as="h3" aria-live="polite">
                {section.title}
              </Title>
              {section?.titleRightContent}
            </Group>
          ) : null}
          {section.subtitle ? <Text>{section.subtitle}</Text> : null}
          <div>
            {section.entries.map((entry, idx: number) => (
              <ReviewValues
                key={idx + entry.label}
                fieldLabel={entry.label}
                fieldValue={entry?.value}
                index={idx}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
