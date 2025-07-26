import { Router, Request, Response } from 'express';
import prisma from '../../prisma/prismaClient';

const eventRouter = Router();

eventRouter.post('/', (req: Request, res: Response) => {
  res.status(200).json({ status: '이벤트 등록' });
});

eventRouter.get('/:eventId/seats', (req: Request, res: Response) => {
    res.status(200).json({ message: '남은 좌석 조회' });
});

eventRouter.post('/:eventId/seats/:seatNo/dibs', (req: Request, res: Response) => {
  res.status(200).json({ status: '찜하기' });
});

export { eventRouter };
