import { Router, Request, Response } from 'express';
import eventService from '../service/event.service';

const eventRouter = Router();


eventRouter.post('/', async (req: Request, res: Response) => {

    // service layer registerEvent 호출
    const event = await eventService.registerEvent(req);
    // eventId 같은 주요 정보는 노출 재고, DTO로 변환 후 반환 고려
    res.status(201).json({
        message: "event 생성에 성공했습니다",
        event: event,
    });
});

eventRouter.get('/:eventId/seats', (req: Request, res: Response) => {
    res.status(200).json({ message: '남은 좌석 조회' });
});

eventRouter.post('/:eventId/seats/:seatNo/dibs', (req: Request, res: Response) => {
  res.status(200).json({ status: '찜하기' });
});

export { eventRouter };
