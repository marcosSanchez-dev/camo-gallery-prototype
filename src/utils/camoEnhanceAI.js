export async function enhanceWithAI({ imageName = "uploaded image" }) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const prompt = `
You're CamoEnhanceAI, an expert in visual optimization.
The user uploaded a photo titled "${imageName}" taken in poor lighting.

Describe 3 enhancements that would make this image visually better, and give a simulated score boost (0 to 1).
Format output as JSON like this:

{
  "adjustments": {
    "brightness": "+20%",
    "contrast": "+15%",
    "sharpness": "+10%"
  },
  "scoreBoost": 0.42
}
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You return only JSON as described.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(data.error));

  return JSON.parse(data.choices[0].message.content);
}
