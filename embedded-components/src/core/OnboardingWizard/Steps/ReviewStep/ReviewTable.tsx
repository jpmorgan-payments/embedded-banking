import { Group } from '@/components/ui/group';
import { Title } from '@/components/ui/title';
import { Text } from '@/components/ui/text';

import ReviewValues from './ReviewValues';

export type ValuesMapType = {
  title?: string | JSX.Element;
  titleRightContent?: JSX.Element;
  subtitle?: string | JSX.Element;
  entries: {
    label: string;
    value?: string | JSX.Element;
    color?: DefaultMantineColor | 'dark.3';
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
              <Title size="h3" order={2} role={'heading'} aria-live="polite">
                {section.title}
              </Title>
              {section?.titleRightContent}
            </Group>
          ) : null}
          {section.subtitle ? <Text>{section.subtitle}</Text> : null}
          <div>
            {section.entries.map((entry, index) => (
              <ReviewValues
                key={index + entry.label}
                fieldLabel={entry.label}
                fieldValue={entry?.value}
                index={index}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
