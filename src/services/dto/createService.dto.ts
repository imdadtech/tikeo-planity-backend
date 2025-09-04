import { z } from 'zod';
import decimalSchema from '../../utils/decimalSchema';

const schedulerSchema = z
  .object({
    startTime: z.iso.datetime(),
    endTime: z.iso.datetime(),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: 'endTime must be after startTime',
  });

const CreateServiceSchema = z.object({
  name: z
    .string()
    .min(3, 'Service name is required')
    .max(100, 'Service name must be less than 100 characters'),
  description: z.string().min(3).optional(),
  price: decimalSchema.refine((val) => val.greaterThan(0), {
    message: 'Price must be a positive decimal number',
  }),
  duration: z.number().int().positive('Duration must be a positive integer'),
  options: z
    .array(
      z.object({
        name: z
          .string()
          .min(1, 'Option name is required')
          .max(50, 'Option name must be less than 50 characters'),
        price: decimalSchema.refine((val) => val.greaterThan(0), {
          message: 'Price must be a positive decimal number',
        }),
      }),
    )
    .optional(),
  schedulers: z.array(schedulerSchema),
});

export type CreateServiceDto = z.infer<typeof CreateServiceSchema>;

export { CreateServiceSchema };
