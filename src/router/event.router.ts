import { Router, Request, Response } from "express";
import eventService from "../service/event.service";

const eventRouter = Router();

eventRouter.post("/", async (req: Request, res: Response) => {
  // service layer registerEvent 호출
  const createdEvent = await eventService.registerEvent(req);
  // eventId 같은 주요 정보는 노출 재고, DTO로 변환 후 반환 고려
  return res.status(201).json({
    message: "event 생성에 성공했습니다",
    event: createdEvent,
  });
});

eventRouter.get("/:eventId/seats", async (req: Request, res: Response) => {
  try {
    const findSeats = await eventService.getSeatsByEventId(req);

    return res.status(200).json({
      message: "좌석 검색에 성공했습니다",
      seats: findSeats,
    });
  } catch (err) {
    if (err instanceof Error && err.message === "NOT_FOUND_EVENT") {
      return res.status(404).json({ message: "이벤트를 찾을 수 없습니다." });
    }
    return res.status(500).json({ message: "서버 오류" });
  }
});

// 찜하기
// body에 member email 필수
eventRouter.post(
  "/:eventId/seats/:seatNo/dibs",
  async (req: Request, res: Response) => {
    const createdDibs = await eventService.registerDibs(req);
  }
);

export { eventRouter };
