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
  ValidateRegisterDibsSchema,
  validateRegisterDibsSchema,
} from "../validator/validator";
import { Dibs, Event, Seat } from "@prisma/client";
import { seatRepository, SeatRepository } from "../repository/seat.repository";
import { memberRepository, MemberRepository } from "../repository/member.repository";

class EventService {
  private readonly eventRepository;
  private readonly seatRepository;
  private readonly memberRepository;

  constructor(eventRepository: EventRepository, seatRepository: SeatRepository, memberRepository: MemberRepository) {
    this.eventRepository = eventRepository;
    this.seatRepository = seatRepository;
    this.memberRepository = memberRepository;
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

  async registerDibs(req: Request): Promise<Dibs> {

    // member 없으면 만들어 db저장
    // body로 email을 입력받아야함
    const parsedRequest = this.parseRequest(req);
    const validatedRequest = validateRegisterDibsSchema.parse(parsedRequest);

    const findMember = await this.memberRepository.findOrCreateMember(validatedRequest);

    // seat 존재 여부 조회

    // dibs 생성
  }

  private parseRequest(req: Request): unknown {
    return {
      eventId: req.params.eventId,
      seatNo: req.params.seatNo,
      memberEmail: req.body.memberEmail,
    }
  }
}

export default new EventService(eventRepository, seatRepository, memberRepository);
