import { Anchor, List, Text, Title } from '@mantine/core';
import { PageWrapper } from 'components';
import { GITHUB_REPO } from 'data/constants';

export const OverviewPage = () => {
  return (
    <PageWrapper title="Embedded Banking Showcase">
      <Text>
        Embedded Banking gives you financial tools from J.P. Morgan — such as
        money movement, real-time payments, and account services — and lets you
        place them directly into your own platform.
      </Text>
      <Title order={2} mt="xs">
        What is this showcase?
      </Title>
      <div>
        <Text>
          This showcase application demonstrates the main use cases for each
          endpoint of the Embedded Banking API.
        </Text>
        <Text>
          Explore this app to get a general sense of the experiences you can
          create, alongside mocked API requests and responses. You can:
        </Text>
      </div>
      <List withPadding>
        <List.Item>
          <b>Onboard clients</b> - see an example flow for onboarding a client
          to Embedded Banking, including the data points you need to collect.
        </List.Item>
        <List.Item>
          <b>Manage accounts</b> - walk through the managing an account from a
          client's perspective.
        </List.Item>
        <List.Item>
          <b>Manage debit cards</b> - see the steps for adding and managing
          debit cards.
        </List.Item>
        <List.Item>
          <b>Move money</b> - make payments and add recipients, as your clients
          would in Embedded Banking.
        </List.Item>
      </List>
      <Text>
        You can also take a closer look at this application's code at the{' '}
        <Anchor href={GITHUB_REPO} target="_blank" color="blue">
          GitHub repository
        </Anchor>
        .
      </Text>
      <Title order={2} mt="xs">
        Authentication
      </Title>
      <Text>
        In this sample app, your requests are not sent to the live Embedded
        Banking APIs. In a live environment, a token is required in the header
        of your requests.
      </Text>
      <Title order={2} mt="xs">
        Learn more
      </Title>
      <div>
        <Text>
          Learn more about Embedded Banking at:{' '}
          <Anchor
            href="https://www.jpmorgan.com/solutions/treasury-payments/embedded-banking"
            target="_blank"
            color="blue"
          >
            https://www.jpmorgan.com/solutions/treasury-payments/embedded-banking
          </Anchor>
        </Text>
        {/* <Text>
          Register and explore the full Embedded Banking APIs at:{' '}
          <Anchor
            href="https://developer-console.prod.aws.jpmchase.net/docs/embedded-banking"
            target="_blank"
            color="blue"
          >
            https://developer-console.prod.aws.jpmchase.net/docs/embedded-banking
          </Anchor>
        </Text> */}
      </div>
    </PageWrapper>
  );
};
