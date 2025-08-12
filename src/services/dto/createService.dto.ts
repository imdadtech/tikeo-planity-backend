import { z } from 'zod';

const CreateServiceSchema = z.object({
  name: z
    .string()
    .min(3, 'Service name is required')
    .max(100, 'Service name must be less than 100 characters'),
  description: z.string().min(3).optional(),
  price: z.number().positive('Price must be a positive number'),
  duration: z.number().int().positive('Duration must be a positive integer'),
  options: z
    .array(
      z.object({
        name: z
          .string()
          .min(1, 'Option name is required')
          .max(50, 'Option name must be less than 50 characters'),
        price: z.number().nonnegative('Option price must be a non-negative number'),
      }),
    )
    .optional(),
});

export { CreateServiceSchema };
