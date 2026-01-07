import { Request, Response } from 'express';
import providersService from '../services/providers.service';
import { User } from '../../user/type';
import { CreateCustomerDataSchema } from '../dto/createCustomerData.dto';
import { getProviderFromRequest } from '../utiles/getProviderFromRequest';

export async function createCustomer(req: Request, res: Response) {
  const validationBodyResult = CreateCustomerDataSchema.safeParse(req.body);

  if (!validationBodyResult.success) {
    return res.status(400).json({
      success: false,
      message: 'Invalid data',
      errors: validationBodyResult.error,
    });
  }

  try {
    const { firstname, lastname, phoneNumber } = validationBodyResult.data;
    const providerData = await getProviderFromRequest(req, res);
    if (!providerData) return;
    const { provider, provider_id } = providerData;

    const customer = await providersService.createCustomer(
      firstname,
      lastname,
      phoneNumber,
      provider_id,
    );

    return res.status(201).json({
      success: true,
      message: 'Customer créé avec succès',
      data: customer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Erreur serveur',
    });
  }
}
