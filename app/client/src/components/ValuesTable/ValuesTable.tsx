import { Title, Box, Grid, Text } from '@mantine/core';

type ValuesTableProps = {
  valuesMap: {
    title?: string;
    entries: {
      label: string;
      value?: string;
    }[];
  }[];
};

export const ValuesTable = ({ valuesMap }: ValuesTableProps) => {
  return (
    <div>
      {valuesMap.map((section, index) => (
        <div key={index}>
          {section.title ? (
            <Title mb="sm" order={3}>
              {section.title}
            </Title>
          ) : null}
          <Box mb="xl">
            {section.entries.map((entry) => (
              <Grid
                key={entry.label}
                sx={{
                  borderBottom: '1px dotted grey',
                }}
                mt="xs"
              >
                <Grid.Col xs={6} sm={4}>
                  <Text weight="bold" size="sm">
                    {entry.label}
                  </Text>
                </Grid.Col>
                <Grid.Col xs={6} sm={8}>
                  <Text size="sm">{entry.value}</Text>
                </Grid.Col>
              </Grid>
            ))}
          </Box>
        </div>
      ))}
    </div>
  );
};
