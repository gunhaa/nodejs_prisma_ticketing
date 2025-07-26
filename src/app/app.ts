import express, { Express, Request, Response, NextFunction} from "express";
import { eventRouter } from "../router/event.router";
import { paymentRouter } from "../router/payment.router";
import { ZodError } from "Zod";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/event", eventRouter);
app.use("/payment", paymentRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  
  // Zod 유효성 검증 에러 처리
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "입력값이 올바르지 않습니다.",
      errors: err.issues.map(e => ({ path: e.path, message: e.message })),
    });
  }

  return res
    .status(400)
    .json({ message: err.message || "알 수 없는 오류가 발생했습니다." });
});

app.all("/", (req: Request, res: Response) => {
  res.send("use /event, /payment router");
});

export default app;
