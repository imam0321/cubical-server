import z from "zod";

const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export const createOrganizationValidation = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(60)
    .trim(),
  email: z
    .email({ message: "Invalid email address." })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  phone: z
    .string()
    .refine((v) => !v || phoneRegex.test(v), {
      message: "Invalid phone number format.",
    }),
  address: z.string().min(1, { message: "Address required" }).max(250),
  website: z
    .string()
    .optional()
    .nullable()
    .refine((v) => !v || z.string().url().safeParse(v).success, {
      message: "Website must be a valid URL.",
    }),

  maxEmployees: z
    .number()
    .int()
    .min(1, { message: "maxEmployees must be at least 1." })
    .max(10000)
    .optional()
    .default(10),

  currentEmployees: z
    .number()
    .int()
    .min(0, { message: "currentEmployees cannot be negative." })
    .optional()
    .default(0),
})