import inquirer from "inquirer";
import cliProgress from "cli-progress";
import colors from "ansi-colors";

import { generateCodeWithOpenAI } from "./generateCodeWithOpenAI.js";
import { generateAndOpenSandbox } from "./generateAndOpenSandbox.js";
import { loadOasFile } from "./loadOasFile.js";
import { unicornAscii } from "./unicornAscii.js";


unicornAscii();

// Define the questions
const questions = [
  {
    type: "list",
    name: "uiLibrary",
    message: "What is your UI rendering library / framework?",
    choices: ["ReactJS", "VueJS", "Angular", "Svelte"],
  },
  {
    type: "list",
    name: "componentLibrary",
    message: "What is your prefered component library?",
    choices: ["@material-ui", "@salt-ds/core", "@mantine/core", "@shadcn-ui"],
  },
  {
    type: "checkbox",
    name: "capabilities",
    message: "What capability(ies) do you want to implement?",
    choices: [
      "Onboard a client",
      "Add a link account",
      "Make a payment",
      "Display a payment",
    ],
  },
];

// Create a new progress bar instance
const progressBar = new cliProgress.SingleBar({
  format:
    "Unicorn is generating code ... |" +
    colors.magenta("{bar}") +
    "| {percentage}%",
  barCompleteChar: "\u2588",
  barIncompleteChar: "\u2591",
  hideCursor: true,
});

// Function to ask questions
async function askQuestions() {
  const answers = await inquirer.prompt(questions);

  // Start the progress bar
  progressBar.start(100, 0);

  // Simulate progress
  let progress = 0;
  const intervalId = setInterval(() => {
    progress += 5;
    progressBar.update(progress);

    if (progress >= 100) {
      clearInterval(intervalId);
      progressBar.stop();
    }
  }, 500); // Update progress every 500ms

  const openApiSpec = loadOasFile("./openapi.yaml");

  const generatedCode = await generateCodeWithOpenAI(
    answers,
    JSON.stringify(openApiSpec)
  );
  generateAndOpenSandbox(generatedCode?.message?.content);
}

askQuestions();
