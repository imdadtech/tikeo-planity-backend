import { z } from 'zod';

const CreateCustomerDataSchema = z.object({
  firstname: z
    .string()
    .min(3, 'first name is required')
    .max(100, 'first name must be less than 100 characters')
    .optional(),
  lastname: z.string().min(3).max(100, 'last name must be less than 100 characters').optional(),
  phoneNumber: z
    .string()
    .min(8)
    .max(100, 'phone number must be less than 100 characters')
    .optional(),
});

export { CreateCustomerDataSchema };
