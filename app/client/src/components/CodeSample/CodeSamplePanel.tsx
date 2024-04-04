import { Box, Grid } from '@mantine/core';
import { Prism } from '@mantine/prism';

type CodeSampleProps = {
  code: string;
  component: React.ReactNode;
};

export const CodeSamplePanel = ({ code, component }: CodeSampleProps) => {
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
