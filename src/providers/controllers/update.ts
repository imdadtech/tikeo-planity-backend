import { Request, Response } from 'express';
import { UpdateProviderDataSchema } from '../dto/updateProviderData.dto';

async function update(req: Request, res: Response) {
  const userId = (req.user as { id: string }).id;

  const validationBodyResult = UpdateProviderDataSchema.safeParse(req.body);

  if (!validationBodyResult.success) {
    return res.status(400).json({ message: validationBodyResult.error });
  }

  return res.status(200).json({
    message: 'Provider updated successfully',
  });
}

export default update;
