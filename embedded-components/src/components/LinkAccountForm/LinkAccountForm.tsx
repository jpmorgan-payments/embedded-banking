import { useForm, yupResolver } from '@mantine/form';
import { TextInput, Button, Box, Text, Radio, Group, Stack } from '@mantine/core';
import { EBThemeWrapper } from '@/shared/EBThemeWrapper';

export const LinkAccountForm = () => {
  const form = useForm();

  return (
    <EBThemeWrapper>
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
            <TextInput label="Routing number" required />
            <Group align="right" mt="xs">
              <Button type="submit">Submit</Button>
            </Group>
          </Stack>
        </form>
      </Box>
    </EBThemeWrapper>
  );
};
