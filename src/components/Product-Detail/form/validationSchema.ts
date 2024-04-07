import { z } from "zod";

export const FormSchema = z.object({
    deliveryDate: z.date({
      required_error: "Delivery Pickup Date is Required",
    }),
    deliveryTime: z.string({
      required_error: "Please select a time for delivery.",
    }),
    candleAndKnife: z.boolean().default(false).optional(),
    greetingCard: z.boolean().default(false).optional(),
    complimentaryMsg: z
      .string()
      .min(5, {
        message: "Complimentary message is too short",
      })
      .max(150, { message: "Complimentary message is too long" }).optional(),
  });