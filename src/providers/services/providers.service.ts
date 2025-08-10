import prisma from '../../config/prisma/client';

class ProvidersService {
  async createProvider(
    businessName: string,
    linkCode: string,
    userId: string,
    address?: string,
    description?: string,
  ) {
    return prisma.provider.create({
      data: {
        businessName,
        description,
        address,
        linkCode,
        userId: userId,
      },
    });
  }
}

const providersService = new ProvidersService();

export default providersService;
