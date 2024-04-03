import { Box, Grid } from '@mantine/core';
import { Prism } from '@mantine/prism';

type CodeSampleProps = {
  code: any;
  component: any;
};

export const CodeSamplePanel = ({ code, component }: CodeSampleProps) => {
  return (
    <Grid align="center" justify="center" style={{ width: '100%' }}>
      <Grid.Col span={8}>
        <Box  p="lg" style={{ minWidth: '50%' }}>
          {component}
        </Box>

        <Prism
          colorScheme="dark"
          style={{ minWidth: '80%' }}
          language="javascript"
        >
          {code}
        </Prism>
      </Grid.Col>
    </Grid>
  );
};
