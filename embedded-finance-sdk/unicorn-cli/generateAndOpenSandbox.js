import open from "open";
import axios from "axios";

// Function to generate and open the sandbox URL
export async function generateAndOpenSandbox(content) {

  try {
    const response = await axios.post(
      "https://codesandbox.io/api/v1/sandboxes/define?json=1",
      {
        // Your sandbox configuration based on sandboxId
        files: JSON.parse(content),
      },
      {
        responseType: "json",
      }
    );

    const sandboxId = response.data.sandbox_id;

    // Construct the sandbox URL from response
    const sandboxUrl = `https://codesandbox.io/s/${sandboxId}`;

    // Open the URL in the default browser
    await open(sandboxUrl);
    console.log(`\n\nSandbox is opened in your browser: ${sandboxUrl}`);
  } catch (error) {
    console.error("Failed to create or open the sandbox:", error);
  }
}
