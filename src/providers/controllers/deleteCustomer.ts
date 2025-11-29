import { Request, Response } from 'express';
import { getProviderFromRequest } from '../utiles/getProviderFromRequest';
import providersService from '../services/providers.service';

async function deleteCustomer(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const providerData = await getProviderFromRequest(req, res);
    if (!providerData) return;
    const { provider, provider_id } = providerData;
    await providersService.deleteCustomer(id, provider_id);
    return res.status(200).json({
      success: true,
      message: 'Customer deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error deleting customer',
    });
  }
}

export default deleteCustomer;
