import { Request, Response } from 'express';
import providersService from '../services/providers.service';
import { User } from '../../user/type';
import { CreateCustomerDataSchema } from '../dto/createCustomerData.dto';
import { getProviderFromRequest } from '../utiles/getProviderFromRequest';

export async function updateCustomer(req: Request, res: Response) {
  const validationBodyResult = CreateCustomerDataSchema.safeParse(req.body);

  if (!validationBodyResult.success) {
    return res.status(400).json({
      success: false,
      message: 'Invalid data',
      errors: validationBodyResult.error,
    });
  }
  const jsonHasKey = Object.keys(validationBodyResult.data).length > 0;

  if (!jsonHasKey) {
    return res.status(400).json({ message: 'No data provided for update' });
  }

  try {
    const { firstname, lastname, phoneNumber } = validationBodyResult.data;
    const providerData = await getProviderFromRequest(req, res);
    if (!providerData) return;
    const { provider, provider_id } = providerData;

    if (provider_id === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Provider ID is missing',
      });
    }

    const customer = await providersService.updateCustomer(
      firstname,
      lastname,
      phoneNumber,
      provider_id,
    );

    return res.status(201).json({
      success: true,
      message: 'Customer updqte succesfully',
      data: customer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server Error',
    });
  }
}
