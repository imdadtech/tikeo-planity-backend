import { Request, Response } from 'express';
import providersService from '../services/providers.service';
import { User } from '../../user/type';
import { getProviderFromRequest } from '../utiles/getProviderFromRequest';

export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const providerData = await getProviderFromRequest(req, res);
    if (!providerData) return;
    const { provider, provider_id } = providerData;

    if (provider_id === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Provider ID is missing',
      });
    }

    const customer = await providersService.getCustomerById(id, provider_id);

    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error instanceof Error ? error.message : 'Customer non trouvé',
    });
  }
};

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const providerData = await getProviderFromRequest(req, res);
    if (!providerData) return;
    const { provider, provider_id } = providerData;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await providersService.getAllCustomers(provider_id, page, limit);

    res.status(200).json({
      success: true,
      data: result.customers,
      pagination: result.pagination,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Erreur serveur',
    });
  }
};
