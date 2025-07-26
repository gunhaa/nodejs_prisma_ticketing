import { Router, Request, Response } from "express";

const paymentRouter = Router();

paymentRouter.post("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "결제하기" });
});

export { paymentRouter };
