import { forwardRef } from 'react';
import {
  Badge,
  Box,
  Code,
  Grid,
  Group,
  MediaQuery,
  Paper,
  type PaperProps,
  Title,
} from '@mantine/core';
import { ObjectDisplay } from 'components';

interface PanelProps extends PaperProps {
  width?: number | string;
  objectDisplayHeight?: number;
  requestBody?: object;
  responseBody?: object;
  isLoading?: boolean;
  title?: string;
  apiCallType?: 'GET' | 'POST' | 'DELETE';
  apiEndpoint?: string;
}

const callTypeColor = {
  GET: 'green',
  POST: 'blue',
  DELETE: 'red',
};

export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  (
    {
      children,
      width,
      objectDisplayHeight,
      requestBody,
      responseBody,
      isLoading = false,
      title,
      apiCallType,
      apiEndpoint,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <Paper
        shadow="xs"
        radius={0}
        style={{
          maxWidth: width ?? '100%',
          position: 'relative',
          ...style,
        }}
        ref={ref}
        {...props}
      >
        <Grid>
          <Grid.Col xs={12} lg="auto">
            <Box p="md">
              {title || apiCallType ? (
                <Group align="end" spacing={0}>
                  {title ? (
                    <Title order={2} mb="sm" mr="xl">
                      {title}
                    </Title>
                  ) : null}
                  <Group spacing={4} mb="md" align="center">
                    {apiCallType ? (
                      <Badge
                        variant="filled"
                        color={callTypeColor[apiCallType]}
                        radius="xs"
                      >
                        {apiCallType}
                      </Badge>
                    ) : null}
                    <Code sx={{ backgroundColor: 'unset' }}>{apiEndpoint}</Code>
                  </Group>
                </Group>
              ) : null}
              {children}
            </Box>
          </Grid.Col>
          {requestBody || responseBody || isLoading ? (
            <Grid.Col xs={12} lg="content">
              <MediaQuery styles={{ width: '100%' }} smallerThan="lg">
                <ObjectDisplay
                  request={requestBody}
                  response={responseBody}
                  isLoading={isLoading}
                  w={480}
                  h="100%"
                  scrollAreaHeight={objectDisplayHeight}
                />
              </MediaQuery>
            </Grid.Col>
          ) : null}
        </Grid>
      </Paper>
    );
  },
);
