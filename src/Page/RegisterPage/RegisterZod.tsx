import { z } from "zod";

export const schema = z
  .object({
    fname: z
      .string()
      .min(1, { message: "Full Name must have at least a character long." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(8, {
      message: "The password you provided must have at least 8 characters.",
    }),
    password2: z.string().min(8, {
      message: "The password you provided must have at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.password2, {
    message: "Your password and confirm password must match.",
    path: ["password2"],
  })
  .refine((data) => !data.password.includes(data.email.split("@")[0]), {
    message: "Your password is too similar to your email!",
    path: ["password"],
  });

export type RegisterDataType = z.infer<typeof schema>;
