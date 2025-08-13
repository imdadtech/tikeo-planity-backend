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

  async getProviderByUserId(userId: string, includeService = false) {
    return prisma.provider.findUnique({
      where: {
        userId: userId,
      },
      include: {
        service: includeService,
      },
    });
  }

  async updateProvider(
    userId: string,
    businessName?: string,
    description?: string,
    address?: string,
    linkCode?: string,
  ) {
    return prisma.provider.update({
      where: {
        userId: userId,
      },
      data: {
        businessName,
        description,
        address,
        linkCode,
      },
    });
  }
}

const providersService = new ProvidersService();

export default providersService;
