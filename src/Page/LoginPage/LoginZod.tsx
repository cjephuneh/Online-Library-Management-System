import { z } from "zod";

export const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, {
    message: "The password you provided must have at least 6 characters.",
  }),
});

export type LoginDataType = z.infer<typeof schema>;
