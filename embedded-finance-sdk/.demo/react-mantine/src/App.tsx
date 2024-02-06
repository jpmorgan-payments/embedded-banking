import "@mantine/core/styles.css";
import {
  Button,
  Container,
  Group,
  MantineProvider,
  Paper,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { usePaymentValidation } from "@jpmorgan-payments/embedded-finance-sdk";
import { theme } from "./theme";

function App() {
  const { validate: validateUK, fieldDefinitions: fieldDefinitionsUK } =
    usePaymentValidation("UK");

  const { validate: validateHK, fieldDefinitions: fieldDefinitionsHK } =
    usePaymentValidation("HK");

  const form = useForm({
    validate: (values) => validateUK(values)?.errors,
    validateInputOnBlur: true,
  });

  const form2 = useForm({
    validate: (values) => validateHK(values)?.errors,
    validateInputOnBlur: true,
  });

  return (
    <MantineProvider theme={theme}>
      <Container size="lg" mt="xl" mb="xl">
        <Group wrap="nowrap" justify="center" align="flex-start">
          <Paper withBorder radius="sm" shadow="sm" p="md" w={800}>
            <Title mb="md">United Kingdom (GBP)</Title>
            <form>
              <Stack>
                {fieldDefinitionsUK?.map((def) => (
                  <TextInput
                    key={def.name}
                    {...def}
                    placeholder={def?.examples?.[0]}
                    {...form.getInputProps(def.name)}
                  />
                ))}
                <Button type="submit">Submit</Button>
              </Stack>
            </form>
          </Paper>

          <Paper withBorder radius="sm" shadow="sm" p="md" w={800}>
            <Title mb="md">Hong Kong (HKD)</Title>
            <form>
              <Stack>
                {fieldDefinitionsHK?.map((def) => (
                  <TextInput
                    key={def.name}
                    {...def}
                    placeholder={def?.examples?.[0]}
                    {...form2.getInputProps(def.name)}
                  />
                ))}
                <Button type="submit">Submit</Button>
              </Stack>
            </form>
          </Paper>
        </Group>
      </Container>
    </MantineProvider>
  );
}

export default App;
