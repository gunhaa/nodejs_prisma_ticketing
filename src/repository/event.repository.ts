import { PrismaClient, Prisma } from "@prisma/client";
import prisma from "../../prisma/prismaClient";
import { CreateEventDto } from "../validator/validator";

class EventRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async registerEvent(validateEvent: CreateEventDto) {

    // 미리 event title 찾은 후, 중복이라면 생성 불가 시켜야함 혹은 DB 수준에서 차단

    const event = await prisma.event.create({
      data: {
        eventTitle: validateEvent.eventTitle,
        maxSeat: validateEvent.maxSeats,
        createdAt: new Date(),
      }
    });

    const seatsData: Prisma.SeatCreateManyInput[] = Array.from({ length: validateEvent.maxSeats }, (_, i) => ({
      seatNumber: i + 1,
      seatStatus: "AVAILABLE",
      eventId: event.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await prisma.seat.createMany({
      data: seatsData,
    });

    return event;
  }
}

const eventRepository = new EventRepository(prisma);

export { eventRepository, EventRepository };
