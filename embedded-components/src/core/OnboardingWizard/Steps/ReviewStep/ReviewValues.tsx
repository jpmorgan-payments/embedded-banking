import React, { FC } from 'react';

import { Grid } from '@/components/ui/grid';
import { Group } from '@/components/ui/group';
import { Text } from '@/components/ui/text';

// import { Grid, Text, Group, useMantineTheme } from '@mantine/core';
// import { TooltipComponent } from '../TooltipComponent/TooltipComponent';

export enum DisplayType {
  grid = 'grid',
  group = 'group',
}

type ReviewValuesProps = {
  fieldLabel: string;
  fieldLabelTooltip?: string;
  fieldValue?: string | JSX.Element;
  index: number;
  displayType?: DisplayType;
  customRenderer?: FC;
};

const ReviewValues = ({
  fieldLabel,
  fieldLabelTooltip,
  fieldValue,
  index,
  displayType,
  customRenderer,
}: ReviewValuesProps) => {
  if (displayType === DisplayType.group) {
    let valueToBeDisplayed;
    try {
      valueToBeDisplayed =
        typeof customRenderer === 'function'
          ? customRenderer({ getValue: () => fieldValue })
          : fieldValue;
    } catch (e) {
      valueToBeDisplayed = fieldValue;
    }
    return (
      <Group className="eb-border-b eb-border-dotted eb-p-1">
        <Group>
          <Text>{fieldLabel}</Text>
          {/* {fieldLabelTooltip && (
            <TooltipComponent
              label={fieldLabelTooltip}
              icon={'QuestionCircle'}
              actionIconLabel="More Details"
              multiline
              width={300}
            />
          )} */}
        </Group>
        <Text size="sm">{valueToBeDisplayed}</Text>
      </Group>
    );
  }
  return (
    <Grid className="eb-grid-cols-2 eb-border-b-2 eb-border-dotted eb-p-1">
      <Group>
        <Text size="sm">{fieldLabel}</Text>
        {/* {fieldLabelTooltip && (
            <TooltipComponent
              label={fieldLabelTooltip}
              icon={'QuestionCircle'}
              actionIconLabel="More Details"
              multiline
              width={300}
            />
          )} */}
      </Group>

      <Text size="sm">{fieldValue}</Text>
    </Grid>
  );
};

export default ReviewValues;
