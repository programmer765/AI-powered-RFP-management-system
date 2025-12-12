import { Router } from "express";
import type { Request, Response } from "express";
const chatRouter : Router = Router();
const geminiApiUrl = process.env.GEMINI_API_URL || '';
const apiKey = process.env.API_KEY || '';

chatRouter.post("/message", async (req: Request, res: Response) => {
  const { message } = req.body;
  console.log("Received message:", message);

  const resp = await fetch(geminiApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': `${apiKey}`
    },
    body: JSON.stringify({
      system_instruction: {
        parts: [
          {
            text: "Provide a json response with the important keywords from the user's message for the product, like product specs, product name, price, availability, and any other relevant details. And don't provide any other text outside of the json response. Just respond with the json object of the product."
          }
        ]
      },
      contents: [
        {
          parts: [{ text: message }],
        },
      ],
    })
  })

  const data = await resp.json();
  const replyText = data?.candidates?.[0]?.content?.parts?.[0].text || "No reply";
  if(replyText === "No reply") {
    return res.status(500).json({ error: "No reply from Gemini API" });
  }
  const replyJsonText = replyText.substring(replyText.indexOf('{'), replyText.lastIndexOf('}') + 1);
  const replyJson = JSON.parse(replyJsonText);
  console.log(data)
  res.status(200).json({ reply: replyJson });
});

export default chatRouter;