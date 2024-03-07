# Unicorn CLI

Unicorn CLI is a command-line interface for ...

## Demo Script: Introducing UnicornCoder

Welcome to UnicornCoder, the CLI utility designed to supercharge your development workflow! With UnicornCoder, you can seamlessly integrate JPMorgan's Embedded Banking Solutions into your web apps, saving you valuable time and enabling you to implement advanced payment functionalities with ease.

Here's how it works:

1. Let's dive into every developer's favorite tool - the command line interface - and launch the UnicornCoder command.
2. UnicornCoder will guide you through a series of questions, asking about your preferred UI Framework, component library, and the set of Embedded Banking features you want to generate a draft implementation for.
3. Once you've provided your preferences, UnicornCoder will fetch the latest Open API specification, process it accordingly to the selected features, and generate UI code for you. It will even open the code in Codesandbox UI, making it effortless to integrate into your existing codebase or start a brand new project from scratch.

UnicornCoder is here to revolutionize your development experience. Say goodbye to manual integration and hello to accelerated development with UnicornCoder!

Give it a try and experience the power of UnicornCoder today!

## Installation

Provide instructions on how to install your CLI.

## Usage

Provide instructions on how to use your CLI.

## Flow

Here is a basic flow of operations in the Unicorn CLI:

```plaintext
start
  ↓
ask questions
  ↓
call openai chat completion API to generate source code files to implement selected EB 
capabilities to be used within sandbox API request 
  ↓
call sandbox define api and open codesanbox draft browser tab
  ↓
handle errors
  ↓
end
```

### OAS refinement approach

OAS should be de-referenced and minimized for LLM processing.
A number of CLI tools or/and https://editor-next.swagger.io/ could be used to do this.
