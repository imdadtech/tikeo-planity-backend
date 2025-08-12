import { Request, Response } from 'express';
import { CreateServiceSchema } from '../dto/createService.dto';

async function create(req: Request, res: Response) {
  const validationBodyResult = CreateServiceSchema.safeParse(req.body);

  if (!validationBodyResult.success) {
    return res.status(400).json({ message: validationBodyResult.error });
  }
}

export default create;
