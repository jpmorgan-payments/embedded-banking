import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Group,
  Loader,
  LoadingOverlay,
  Popover,
  Text,
  Textarea,
  Title,
  Image,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { handleRequest } from 'msw';
import axios from 'axios';
import { IconBuildingFactory, IconMacro, IconSum } from '@tabler/icons';

function UnicornAssistant() {
  const [loading, setLoading] = useState(false);
  const [opened, handlers] = useDisclosure(false);

  const [questionResponses, setQuestionResponses] = useState({} as any);

  const questions = [
    {
      type: 'list',
      name: 'uiLibrary',
      message: 'What is your UI rendering library / framework?',
      choices: ['@react', '@vue', '@angular', '@svelte'],
    },
    {
      type: 'list',
      name: 'componentLibrary',
      message: 'What is your prefered component library?',
      choices: ['@material-ui', '@salt-ds/core', '@mantine/core', '@chakra-ui'],
    },
    {
      type: 'checkbox',
      name: 'capabilities',
      message: 'What capability(ies) do you want to implement?',
      choices: [
        'Onboard a client',
        'Add a linked account',
        'Make a payment',
        'Display a payment details',
        'Manage notifications',
      ],
    },
  ];

  // Assuming you have an API endpoint to send the data to
  const handleRequest = async () => {
    console.log('Request sent', questionResponses);
    setLoading(true);
    // Assuming you have the data you want to send in a variable called requestData
    try {
      const response = await axios.post(
        'http://localhost:1234/api/chat-completion',
        JSON.stringify(questionResponses),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const responseData = await response.data;
      // Handle the response data here
      console.log(responseData);

      const sandboxResponse = await axios.post(
        'https://codesandbox.io/api/v1/sandboxes/define?json=1',
        {
          // Your sandbox configuration based on sandboxId
          files: JSON.parse(responseData?.message?.content),
        },
        {
          responseType: 'json',
        },
      );

      const sandboxId = sandboxResponse.data.sandbox_id;

      // Construct the sandbox URL from response
      const sandboxUrl = `https://codesandbox.io/s/${sandboxId}`;

      // Open the URL in the default browser
      console.log(`\n\nSandbox is opened in your browser: ${sandboxUrl}`);
      window.open(sandboxUrl, '_blank');
      setLoading(false);
    } catch (error) {
      // Handle any errors here
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div
      style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 999 }}
    >
      <Popover
        opened={opened}
        onClose={() => handlers.close()}
        position="top"
        withArrow
        shadow="md"
        width={400}
      >
        <Popover.Target>
          <Avatar
            size={50}
            radius="xl"
            src="/avatar.png"
            alt="Avatar"
            style={{ cursor: 'pointer' }}
            onClick={() => handlers.toggle()}
          />
        </Popover.Target>
        <Popover.Dropdown
          sx={(theme) => ({
            background:
              theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          })}
        >
          <>
            <Title order={3} mb={10}>
              Unicorn Assitant
            </Title>
            {questions.map((question) => (
              <Box my="xl" key={question.name}>
                <Text size="sm" style={{ marginBottom: 10 }}>
                  {question.message}
                </Text>
                <Chip.Group
                  multiple={question?.type === 'checkbox'}
                  onChange={(v) =>
                    setQuestionResponses((prevState: any) => ({
                      ...prevState,
                      [question?.name]: v,
                    }))
                  }
                >
                  <Group position="left" spacing={5}>
                    {question.choices.map((choice) => (
                      <Chip
                        key={choice}
                        value={choice}
                        color="pink"
                        variant="light"
                      >
                        {choice}
                      </Chip>
                    ))}
                  </Group>
                </Chip.Group>
              </Box>
            ))}
            <Text size="sm" style={{ marginBottom: 10 }}>
              Please provide additional information about your code base or
              project
            </Text>
            <Textarea
              placeholder="Ask me anything"
              minRows={4}
              onChange={(v) =>
                setQuestionResponses((prevState: any) => ({
                  ...prevState,
                  ['additionaInfo']: v.target.value,
                }))
              }
            />
            <Button
              onClick={() => handleRequest()}
              fullWidth
              variant="outline"
              style={{ marginTop: 10 }}
              loading={loading}
              leftIcon={<IconSum />}
            >
              Let's do some magic !
            </Button>
          </>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}

export default UnicornAssistant;
