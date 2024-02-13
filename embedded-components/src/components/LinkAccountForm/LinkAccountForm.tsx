import { useForm, yupResolver } from '@mantine/form';
import { TextInput, Button, Box, Text, Radio, Group, Stack, MantineProvider } from '@mantine/core';
import { theme } from '../../theme';

export const LinkAccountForm = () => {
  const form = useForm();

  return (
    <MantineProvider theme={theme}>
      <Box>
        <form onSubmit={undefined}>
          <Stack>
            <TextInput label="First name" required />
            <TextInput label="Last name" required />
            <Radio.Group
              label="Account type"
              required
              styles={() => ({
                error: {
                  marginTop: 10,
                },
              })}
            >
              <Group mt="xs">
                <Radio value="CHECKING" label="Checking" />
                <Radio value="SAVINGS" label="Savings" />
              </Group>
            </Radio.Group>
            <TextInput label="Account number" required />
            <TextInput label="Routing Number name" required />
            <Group align="right" mt="xs">
              <Button type="submit">Submit</Button>
            </Group>
          </Stack>
        </form>
      </Box>
    </MantineProvider>
  );
};
