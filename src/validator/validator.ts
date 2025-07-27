import { z } from "Zod";

const createEventSchema = z.object({
  eventTitle: z.string().min(1, "이벤트 이름은 필수입니다."),
  maxSeats: z.coerce
    .number()
    .int()
    .positive()
    .default(100)
    .transform((val) => (val > 500 ? 500 : val)),
});

type CreateEventDto = z.infer<typeof createEventSchema>;

const validateEventIdSchema = z.object({
  eventId: z.coerce.number().int().positive(),
});

type ValidateEventId = z.infer<typeof validateEventIdSchema>;

const validateRegisterDibsSchema = z.object({
  eventId: z.coerce.number().int().positive(),
  seatNo: z.coerce.number().int().positive(),
  memberEmail: z.email(),
});

type ValidateRegisterDibsSchema = z.infer<typeof validateRegisterDibsSchema>;

export {
  createEventSchema,
  CreateEventDto,
  validateEventIdSchema,
  ValidateEventId,
  validateRegisterDibsSchema,
  ValidateRegisterDibsSchema,
};
