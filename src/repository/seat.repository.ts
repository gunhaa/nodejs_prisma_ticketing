import { Event, PrismaClient } from "@prisma/client";
import prisma from "../../prisma/prismaClient";

class SeatRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findByEvent(findEvent: Event) {
    const findSeats = await this.prisma.seat.findMany({
        where: {
            eventId: findEvent.id
        }
    });
    return findSeats;
  }
}

const seatRepository = new SeatRepository(prisma);

export { seatRepository, SeatRepository };
