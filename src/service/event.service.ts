import { Request } from "express";
import {
  eventRepository,
  EventRepository,
} from "../repository/event.repository";
import { CreateEventDto, createEventSchema } from "../validator/validator";
import { Event } from "@prisma/client";

class EventService {
  private readonly eventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  async registerEvent(req: Request): Promise<Event>{

    const validateEvent: CreateEventDto = createEventSchema.parse(req.body);

    return this.eventRepository.registerEvent(validateEvent);
  }

}

export default new EventService(eventRepository);
