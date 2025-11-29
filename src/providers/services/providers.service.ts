import prisma from '../../config/prisma/client';

class ProvidersService {
  async createProvider(
    businessName: string,
    linkCode: string,
    userId: string,
    address?: string,
    description?: string,
    website?: string,
    currency?: string,
  ) {
    return prisma.provider.create({
      data: {
        businessName,
        description,
        address,
        linkCode,
        website,
        currency,
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
    website?: string,
    imageUrl?: string,
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
        website,
        photoUrl: imageUrl,
      },
    });
  }

  async createCustomer(
    firstname: string,
    lastname: string,
    phoneNumber: string,
    providerId: string,
  ) {
    return prisma.customer.create({
      data: { firstname, lastname, phoneNumber, providerId },
    });
  }

  async getCustomerById(customerId: string, providerId: string) {
    try {
      const customer = await prisma.customer.findUnique({
        where: {
          id: customerId,
        },
      });
      if (!customer || customer.providerId !== providerId) {
        throw new Error('Access denied ');
      }

      return customer;
    } catch (error) {
      throw new Error(`Error : ${error}`);
    }
  }
  async getAllCustomers(providerId: string, page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;

      const [customers, total] = await Promise.all([
        prisma.customer.findMany({
          where: {
            providerId,
          },
          skip,
          take: limit,
          orderBy: {
            createdAt: 'desc',
          },
        }),
        prisma.customer.count({
          where: {
            providerId,
          },
        }),
      ]);

      return {
        customers,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des customers: ${error}`);
    }
  }

  async updateCustomer(id: string, firstname?: string, lastname?: string, phoneNumber?: string) {
    return prisma.customer.update({
      where: { id },
      data: { firstname, lastname, phoneNumber },
    });
  }

  async deleteCustomer(id: string, providerId: string) {
    const customer = await this.getCustomerById(id, providerId);
    if (!customer) {
      throw new Error('Customer not found or access denied');
    }

    return prisma.customer.delete({ where: { id } });
  }
}

const providersService = new ProvidersService();

export default providersService;
