import { z } from "zod";

export const CheckOutValidator = z.object({
  priceId: z.string(),
  name: z.enum(["FREE", "SILVER", "GOLD", "CREATOR"]),
});

export type CheckOutSchema = z.infer<typeof CheckOutValidator>;
