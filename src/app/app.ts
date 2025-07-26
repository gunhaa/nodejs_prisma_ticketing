import express, { Express, Request, Response } from "express";
import { eventRouter } from "../router/event";
import { paymentRouter } from "../router/payment";


const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/event", eventRouter);
app.use("/payment", paymentRouter);

app.all("/", (req: Request, res: Response) => {
  res.send("use /event, /payment router");
});


export default app;
