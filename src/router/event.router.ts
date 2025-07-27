import { Router, Request, Response } from "express";
import eventService from "../service/event.service";

const eventRouter = Router();

eventRouter.post("/", async (req: Request, res: Response) => {
  // service layer registerEvent 호출
  const event = await eventService.registerEvent(req);
  // eventId 같은 주요 정보는 노출 재고, DTO로 변환 후 반환 고려
  res.status(201).json({
    message: "event 생성에 성공했습니다",
    event: event,
  });
});

eventRouter.get("/:eventId/seats", async (req: Request, res: Response) => {
  try {
    const seats = await eventService.getSeatsByEventId(req);

    res.status(200).json({
      message: "좌석 검색에 성공했습니다",
      seats: seats,
    });
  } catch (err) {
    if (err instanceof Error && err.message === "NOT_FOUND_EVENT") {
      return res.status(404).json({ message: "이벤트를 찾을 수 없습니다." });
    }
    return res.status(500).json({ message: "서버 오류" });
  }
});

eventRouter.post(
  "/:eventId/seats/:seatNo/dibs",
  (req: Request, res: Response) => {
    res.status(200).json({ status: "찜하기" });
  }
);

export { eventRouter };
