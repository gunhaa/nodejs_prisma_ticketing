import express, { Express, Request, Response, NextFunction} from "express";
import { eventRouter } from "../router/event.router";
import { paymentRouter } from "../router/payment.router";
import { ZodError } from "Zod";
import { Prisma } from "@prisma/client";

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

  // Prisma 클라이언트가 예상할 수 있는 에러 처리
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // 특정 에러 코드에 따라 다른 응답을 보낼 수 있습니다.
    // 예: P2002는 유니크 제약 조건 위반입니다.
    if (err.code === 'P2002') {
      return res.status(409).json({ // 409 Conflict
        message: '이미 존재하는 값입니다.',
        // 어떤 필드가 중복되었는지 알려줄 수 있습니다.
        field: err.meta?.target, 
      });
    }
    // 다른 Prisma 에러들은 일반적인 500 에러로 처리할 수 있습니다.
    return res.status(500).json({ message: '데이터베이스 처리 중 오류가 발생했습니다.' });
  }
  
  // Prisma 클라이언트 유효성 검사 에러 처리
  if (err instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({
          message: '데이터베이스 요청에 필요한 값이 유효하지 않습니다.',
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
