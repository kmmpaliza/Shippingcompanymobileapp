import { Message } from "../types/chat";
import { datasetChatbot } from "../data/dataset_ai_chatbot";


export async function sendMessage(messages: Message[]) {
  // Get the last user message
  const lastUserMessage = messages[messages.length - 1]?.content || "";

  // Construct the prompt including the dataset
   const prompt = `
You are a Logistics Digital Twin AI assistant.
Use the following dataset to answer all user issues.
Do NOT mention "based on the dataset" or anything extra.
Respond strictly using the dataset.
Format the response exactly like this, with headings bolded and spacing:

**Summary:**
<summary text>

**Root Cause:**
<root cause text>

**Recommendation:**
1. <first recommendation>
2. <second recommendation>
...

Dataset:
${JSON.stringify(datasetChatbot, null, 2)}

User issue: ${lastUserMessage}
`;

  const response = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "logistics-twin",
      messages: [
        { role: "system", content: prompt }
      ],
      stream: false,
    }),
  });

  const data = await response.json();
  return data.message?.content || "No data found for this issue.";
}
