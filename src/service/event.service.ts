import { Request } from "express";
import {
  eventRepository,
  EventRepository,
} from "../repository/event.repository";
import {
  CreateEventDto,
  createEventSchema,
  ValidateEventId,
  validateEventIdSchema,
} from "../validator/validator";
import { Event, Seat } from "@prisma/client";
import { seatRepository, SeatRepository } from "../repository/seat.repository";

class EventService {
  private readonly eventRepository;
  private readonly seatRepository;

  constructor(eventRepository: EventRepository, seatRepository: SeatRepository) {
    this.eventRepository = eventRepository;
    this.seatRepository = seatRepository;
  }

  async registerEvent(req: Request): Promise<Event> {
    const validateEvent: CreateEventDto = createEventSchema.parse(req.body);

    return this.eventRepository.registerEvent(validateEvent);
  }

  async getSeatsByEventId(req: Request): Promise<Seat[]> {
    const validatedEventId: ValidateEventId = validateEventIdSchema.parse(req.params);
    // eventId 로 검색후 유효성검사
    const findEvent = await eventRepository.findByEventId(validatedEventId);

    if (!findEvent) {
      throw new Error("NOT_FOUND_EVENT");
    }

    // 찾은 event 기반 seats 검색
    const findSeats = await this.seatRepository.findByEvent(findEvent);

    return findSeats;
  }
}

export default new EventService(eventRepository, seatRepository);
