const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "../src/fieldDefinitions/");
const indexFilePath = path.join(outputPath, "index.ts");

let placeholderContent = "export const fieldDefinitions = {};\n";

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

// Write the index file
fs.writeFileSync(indexFilePath, placeholderContent, "utf8");

console.log("Placeholder index file has been generated.");
