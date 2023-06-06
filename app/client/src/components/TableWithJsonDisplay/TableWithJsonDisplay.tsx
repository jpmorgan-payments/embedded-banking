import { forwardRef } from 'react';
import {
  Badge,
  Box,
  BoxProps,
  Button,
  Code,
  Group,
  Modal,
  ScrollArea,
  Skeleton,
  Table,
} from '@mantine/core';
import { Prism } from '@mantine/prism';
import { useDisclosure } from '@mantine/hooks';
import { IconEye } from '@tabler/icons';

interface TableWithJsonDisplayProps extends BoxProps {
  ths: JSX.Element;
  rows?: JSX.Element[];
  json?: object;
  isLoading?: boolean;
  title?: string;
  apiEndpoint?: string;
}

export const TableWithJsonDisplay = ({
  children,
  ths,
  rows,
  json,
  isLoading,
  apiEndpoint,
  ...rest
}: TableWithJsonDisplayProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      {json || isLoading ? (
        <>
          <Modal
            opened={opened}
            onClose={close}
            size="xl"
            title={
              <Group spacing={4} align="center">
                <Badge variant="filled" color="green" radius="xs">
                  GET
                </Badge>
                <Code sx={{ backgroundColor: 'unset' }}>{apiEndpoint}</Code>
              </Group>
            }
          >
            <Prism
              language="json"
              styles={{ line: { width: 'unset' } }}
              radius={0}
            >
              {JSON.stringify(json, null, 4)}
            </Prism>
          </Modal>
          <Group position="right" mb={4}>
            <Button
              size="xs"
              compact
              leftIcon={<IconEye size={16} />}
              variant="subtle"
              color="gray"
              onClick={open}
              loading={isLoading}
              disabled={isLoading}
            >
              View JSON
            </Button>
          </Group>
        </>
      ) : null}
      <Box {...rest} style={{ position: 'relative' }}>
        <ScrollArea offsetScrollbars type="auto">
          <Table striped withColumnBorders withBorder>
            <thead>{ths}</thead>
            <tbody>
              {isLoading
                ? Array(2)
                    .fill(0)
                    .map((_, index) => (
                      <tr key={index}>
                        <td colSpan={100}>
                          <Skeleton h={22} />
                        </td>
                      </tr>
                    ))
                : rows}
            </tbody>
          </Table>
        </ScrollArea>
      </Box>
    </>
  );
};
