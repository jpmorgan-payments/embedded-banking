import OpenAI from "openai";
import { config } from "dotenv";

import { introText } from "./introText.js";

config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const openai = new OpenAI(OPENAI_API_KEY);

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

// function createPrompt2(answers, openApiSpec) {
//   // Generate a prompt using the answers and the OAS
//   // This is a simplified example; you should adjust it based on your specific requirements
//   return `Based on the following user selections: ${JSON.stringify(
//     answers
//   )} and the OpenAPI Specification: ${openApiSpec}, generate the corresponding form fields and API interaction code.`;
// }

export async function generateCodeWithOpenAI(answers, openApiSpec) {
  const prompt1 = createPrompt1(answers, openApiSpec);
  const prompt2 = createPrompt2(answers, openApiSpec);

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106", // Consider using the most suitable model based on cost and efficiency
    seed: 42,
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `
          You are helping a developer to generate code based on the user's selections and the OpenAPI Specification. 
          You will generate the code based on the user's selections and the OpenAPI Specification.
          You would split the code into multiple files to make it more readable and follow SOLiD best practices.
          My code output contains the every form fields specified in OAS as well as API interaction code.
          You will include all fields from OAS in the return statement and validation logic is implemented as per the OAS.
          
          Every your response should be a valid json object with the following structure: {"file1Name", "code1Content", "file2Name", "code2Content", ... "fileNName", "codeNContent"} where fileNName is the name of the file and codeNContent is the content of the file. 
          For example: {"file1.tsx": {"content": "import React from 'react'; ..."}, "type.ts": {}, "package.json": {"content": {dependencies: {"react": "^17.0.2", "axios": "^0.24.0", "@mantine/core": "^7.0.0"}}}"}
          
          You always would include package.json file with the dependencies required to run the code in codesandbox.
          `,
      },
      { role: "user", content: prompt1 },
      { role: "user", content: prompt2 },
    ],
  });

  console.log("completion", completion);
  return completion.choices[0];
}
