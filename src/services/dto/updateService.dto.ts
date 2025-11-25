import { z } from 'zod';
import decimalSchema from '../../utils/decimalSchema';

const schedulerSchema = z
  .object({
    id: z.uuid(),
    startTime: z.iso.datetime(),
    endTime: z.iso.datetime(),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: 'endTime must be after startTime',
  });

const createSchedulerSchema = z.object({
  schedulers: z.array(schedulerSchema.omit({ id: true })),
});

const UpdateServiceSchema = z.object({
  name: z
    .string()
    .min(3, 'Service name is required')
    .max(100, 'Service name must be less than 100 characters')
    .optional(),
  description: z.string().min(3).optional(),
  price: decimalSchema
    .refine((val) => val.greaterThan(0), {
      message: 'Price must be a positive decimal number',
    })
    .optional(),
  duration: z.number().int().positive('Duration must be a positive integer').optional(),
  options: z
    .array(
      z.object({
        id: z.uuid(),
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
  schedulers: z.array(schedulerSchema).optional(),
});

export type UpdateServiceDto = z.infer<typeof UpdateServiceSchema>;

export { UpdateServiceSchema, schedulerSchema };
