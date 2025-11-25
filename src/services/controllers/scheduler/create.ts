import { Request, Response } from 'express';
import { createSchedulerSchema } from '../../dto/updateService.dto';

async function createScheduler(req: Request, res: Response) {
  const { serviceId } = req.params;

  const validationBodyResult = createSchedulerSchema.safeParse(req.body);
  if (!validationBodyResult.success) {
    return res
      .status(400)
      .json({ message: 'Invalid request body', errors: validationBodyResult.error });
  }
}

export default createScheduler;
