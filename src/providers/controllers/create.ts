import { Request, Response } from 'express';
import { CreateProviderDataSchema } from '../dto/createProviderData.dto';
import providersService from '../services/providers.service';
import { User } from '../../user/type';

async function create(req: Request, res: Response) {
  const validationBodyResult = CreateProviderDataSchema.safeParse(req.body);

  if (!validationBodyResult.success) {
    return res.status(400).json({ message: validationBodyResult.error });
  }

  try {
    console.log('req.user', req.user);

    const userId = (req.user as User).id;
    const { businessName, description, address, linkCode, website, currency } =
      validationBodyResult.data;

    await providersService.createProvider(
      businessName,
      linkCode,
      userId!,
      address,
      description,
      website,
      currency,
    );

    return res.status(201).json({
      message: 'Provider created successfully',
    });
  } catch (error) {
    console.error('Error creating provider:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export default create;
