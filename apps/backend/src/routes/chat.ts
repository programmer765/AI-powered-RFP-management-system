import { Router } from "express";
import type { Request, Response } from "express";
const chatRouter : Router = Router();

chatRouter.post("/message", (req: Request, res: Response) => {
  const { message } = req.body;
  console.log("Received message:", message);
  res.status(200).json({ reply: "Message received" });
});

export default chatRouter;