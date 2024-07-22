import OpenAI from "openai";
import { config } from "dotenv";
import { sampleCode } from "./samples/sampleCode.js";
import Anthropic from "@anthropic-ai/sdk";

config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const openai = new OpenAI(OPENAI_API_KEY);

const anthropic = new Anthropic({
  apiKey: process.env["ANTHROPIC_API_KEY"], // defaults to process.env["ANTHROPIC_API_KEY"]
});

function createPrompt1(answers, openApiSpec) {
  // Generate a prompt using the answers and the OAS
  // This is a simplified example; you should adjust it based on your specific requirements
  return `Get the list of fields and validaiton rules to generate UI and API request from the API operation from ${openApiSpec}`;
}

function createPrompt2(answers, openApiSpec) {
  // Generate a prompt using the answers and the OAS
  // This is a simplified example; you should adjust it based on your specific requirements
  return `Based on the following user selections: ${JSON.stringify(
    answers
  )} and the above fields and validation rules, generate the corresponding form fields and API interaction code.`;
}

const systemPrompt = `
You are helping a developer to generate code based on the user's selections and the OpenAPI Specification. 
You will generate the code based on the user's selections and the OpenAPI Specification.
You would split the code into multiple files to make it more readable and follow SOLiD best practices.

If the user selects "Add a linked accounts" capability, you would need to use information from https://developer.payments.jpmorgan.com/docs/embedded-banking-solutions/embedded-payments/how-to/add-linked-account
to sequence API calls to add a linked account.

Also please use the below mermaid sequence diagram to understand the flow of the API calls.

sequenceDiagram
    Client->>EB: POST /recipients with the recipientType: "LINKED_ACCOUNT"
    EB-->>Client: 200 response contains status: "MICRODEPOSITS_INITIATED"
    Client->>EB: POST /recipients/{id}/verify-microdeposit
    EB-->>Client: 200 response contains status: "VERIFIED"

Include detailed code implementation for the API calls and use @tanstack/react-query to manage the API calls.

You will include all fields from OAS in the return statement and validation logic is implemented as per the OAS.

Every your response should be a valid JSON object with the following structure: {"selectedCapability1/file1Name", "code1Content", "selectedCapability/file2Name", "code2Content", ... "selectedCapabilityX/fileNName", "codeNContent"} where fileNName is the name of the file, selectedCapability is one of EB API capabilities in PascalCase
 and codeNContent is the content of the file. 
For example: {"file1.tsx": {"content": "import React from 'react'; ..."}, "type.ts": {}, "package.json": {"content": {dependencies: {"react": "^17.0.2", "axios": "^0.24.0", "@mantine/core": "^7.0.0"}}}"}

Always include index.js file as an entry point for codesandbox which will refer the above capabilities files.

Generate as many files as needed to implement the capability.

Ensure that codesanbox is valid and can render UI and make API calls.

You always would include package.json file with the latest available version of the dependencies required to run the code in codesandbox.

Avoid the errors like "Could not find module in path: '@material-ui/core/styles.css' relative to '/App.tsx'"

Please generate response with more than 3000 tokens but less than 4000 tokens.

Every your response should be a valid JSON format
`;

// function createPrompt2(answers, openApiSpec) {
//   // Generate a prompt using the answers and the OAS
//   // This is a simplified example; you should adjust it based on your specific requirements
//   return `Based on the following user selections: ${JSON.stringify(
//     answers
//   )} and the OpenAPI Specification: ${openApiSpec}, generate the corresponding form fields and API interaction code.`;
// }

export async function generateCodeWithOpenAI(
  answers,
  openApiSpec,
  type = "openai"
) {
  const prompt1 = createPrompt1(answers, openApiSpec);
  const prompt2 = createPrompt2(answers, openApiSpec);

  let completion = null;

  if (type === "openai") {
    completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k", // Consider using the most suitable model based on cost and efficiency
      seed: 42,
      temperature: 0.2,
      // response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        { role: "user", content: prompt1 },
        {
          role: "user",
          content:
            'Based on the following user selections: {"uiLibrary":"@react","componentLibrary":"@mantine/core","capabilities":["Add a linked account"]} and the above fields and validation rules, generate the corresponding form fields and API interaction code.',
        },
        { role: "assistant", content: JSON.stringify(sampleCode) },
        { role: "user", content: prompt2 },
      ],
    });
    console.log("completion", completion);
    return completion.choices[0];
  }

  if (type === "claude") {
    completion = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 4090,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content:
            `${prompt1}. Based on the following user selections: {"uiLibrary":"@react","componentLibrary":"@mantine/core","capabilities":["Add a linked account"]} and the above fields and validation rules, generate the corresponding form fields and API interaction code.`,
        },
        { role: "assistant", content: JSON.stringify(sampleCode) },
        { role: "user", content: `${prompt1}. ${prompt2}` },
      ],
    });
    console.log("completion", completion);
    return JSON.parse(completion.content[0]?.text);
  }
}
