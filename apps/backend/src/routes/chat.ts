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
            text: "Arrange the following message into a formal Request for Proposal (RFP) document format, including sections such as Introduction, Objectives, Scope of Work, Deliverables, Timeline, Budget, and Evaluation Criteria."
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
  console.log(data)
  res.status(200).json({ reply: data });
});

export default chatRouter;