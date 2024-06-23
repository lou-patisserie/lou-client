import { z } from "zod";

export const AddOnFormSchema = z.object({
  deliveryDate: z.date({
    required_error: "Delivery pickup date is required",
  }),
  deliveryTime: z.string({
    required_error: "Please select a time for delivery.",
  }),
  complimentaryMsg: z
    .string()
    .max(250, { message: "Complimentary message is too long" })
    .refine((data) => data === "" || data.length >= 5, {
      message: "Complimentary message is too short",
    })
    .optional(),
});
