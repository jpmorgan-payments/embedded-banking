import { Box, Grid } from '@mantine/core';
import { Prism } from '@mantine/prism';

type ComponentSamplePanelProps = {
  code: string;
  component: React.ReactNode;
};

export const ComponentSamplePanel = ({ code, component }:ComponentSamplePanelProps) => {
  return (
    <Grid align="center" justify="center" style={{ width: '100%' }}>
      <Grid.Col lg={8} sm={10}>
        <Box p="lg">{component}</Box>
        <Prism colorScheme="dark" language="javascript">
          {code}
        </Prism>
      </Grid.Col>
    </Grid>
  );
};
