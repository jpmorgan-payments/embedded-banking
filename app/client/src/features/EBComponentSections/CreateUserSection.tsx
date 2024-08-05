import { Text, Box } from '@mantine/core';
import { Panel } from 'components';
import { Prism } from '@mantine/prism';

export const CreateUserSection = () => {
  return (
    <Panel title="CreateUser">
      <Text size="md" mb="sm">
        To create a user, please run the following POST command.
      </Text>
      <Box style={{ maxWidth: 600 }}>
        <Prism language={'javascript'}>
          POST REQUEST
        </Prism>
      </Box>
    </Panel>
  );
};
