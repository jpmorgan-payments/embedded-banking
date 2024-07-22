import express, { json } from "express";
import cors from "cors";    
import { generateCodeWithOpenAI } from "./generateCodeWithOpenAI.js";
import { loadOasFile } from "./loadOasFile.js";

const app = express();
const PORT = 1234;

app.use(json());
app.use(cors());

app.post("/api/chat-completion", async (req, res) => {
  const userMessage = req.body;

  try {
    const openApiSpec = loadOasFile("./openapi.yaml");

    const response = await generateCodeWithOpenAI(
      userMessage,
      JSON.stringify(openApiSpec)
    );

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
