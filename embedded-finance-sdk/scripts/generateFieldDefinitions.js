const fs = require("fs");
const path = require("path");
const {
  extractFieldDefinitions,
} = require("../dist/utils/extractFieldDefinitions");

const { schemas } = require("../dist/schemas");

const outputPath = path.join(__dirname, "../src/fieldDefinitions/");
const indexFilePath = path.join(outputPath, "index.ts");

let indexContent =
  'import { FieldDefinition } from "../models/FieldDefinition";\n\n';

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

Object.entries(schemas).forEach(([country, schema]) => {
  const fieldDefinitions = extractFieldDefinitions(schema);
  const definitionsFileName = `${country}FieldDefinitions.ts`;
  const content = `export const ${country}FieldDefinitions = ${JSON.stringify(
    fieldDefinitions,
    null,
    2
  )};\n`;

  // Write the country's field definitions to their own file
  fs.writeFileSync(path.join(outputPath, definitionsFileName), content, "utf8");

  // Add import to the index file
  indexContent += `import { ${country}FieldDefinitions } from './${definitionsFileName.replace(
    ".ts",
    ""
  )}';\n`;
});

// Add the export object to the index file
indexContent += "\nexport const fieldDefinitions = {\n";
Object.keys(schemas).forEach((country) => {
  indexContent += `  "${country}": ${country}FieldDefinitions,\n`;
});
indexContent += "};\n";

// Write the index file
fs.writeFileSync(indexFilePath, indexContent, "utf8");

console.log("Field definitions and index file have been generated.");
