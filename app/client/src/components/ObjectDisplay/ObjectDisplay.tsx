import {
  LoadingOverlay,
  MantineProvider,
  Paper,
  PaperProps,
  Tabs,
} from '@mantine/core';
import { Prism, PrismProps } from '@mantine/prism';

export interface ObjectDisplayProps extends PaperProps {
  request?: object;
  response?: object;
  isLoading?: boolean;
  scrollAreaHeight?: number;
}

export const ObjectDisplay = ({
  request,
  response,
  isLoading = false,
  scrollAreaHeight,
  ...rest
}: ObjectDisplayProps) => {
  const prismProps: Omit<PrismProps, 'children'> = {
    language: 'json',
    colorScheme: 'dark',
    radius: 0,
    styles: {
      line: { width: 'unset' },
      scrollArea: { height: scrollAreaHeight },
    },
  };

  return (
    <MantineProvider theme={{ colorScheme: 'dark' }}>
      <Paper
        radius={0}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        })}
        style={{ position: 'relative' }}
        {...rest}
      >
        <LoadingOverlay visible={isLoading} />
        <Tabs
          defaultValue={request ? 'request' : 'response'}
          styles={(theme) => ({
            tabsList: {
              backgroundColor: theme.colors.dark[6],
            },
          })}
        >
          <Tabs.List>
            {request && <Prism.Tab value="request">Request Body</Prism.Tab>}
            {(response || isLoading) && (
              <Prism.Tab value="response">Sample Response</Prism.Tab>
            )}
          </Tabs.List>
          {request && (
            <Tabs.Panel value="request">
              <Prism {...prismProps}>{JSON.stringify(request, null, 4)}</Prism>
            </Tabs.Panel>
          )}
          {(response || isLoading) && (
            <Tabs.Panel value="response">
              <Prism {...prismProps}>
                {isLoading ? '' : JSON.stringify(response, null, 4)}
              </Prism>
            </Tabs.Panel>
          )}
        </Tabs>
      </Paper>
    </MantineProvider>
  );
};
