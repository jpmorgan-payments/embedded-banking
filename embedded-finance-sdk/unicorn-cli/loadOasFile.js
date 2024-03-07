import yaml from "js-yaml";
import fs from "fs";

export function loadOasFile(filePath) {
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    return yaml.load(fileContents);
  } catch (e) {
    console.error(`Failed to load or parse the OAS file: ${e.message}`);
    return null;
  }
}
