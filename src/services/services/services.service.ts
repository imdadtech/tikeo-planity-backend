import prisma from '../../config/prisma/client';
import { CreateServiceDto } from '../dto/createService.dto';

class ServicesService {
  async createService(providerId: string, data: CreateServiceDto) {
    if (data.options) {
      const options = [...data.options];

      return prisma.service.create({
        data: {
          ...data,
          providerId,
          options: {
            create: options,
          },
        },
      });
    }

    return prisma.service.create({
      data: {
        ...data,
        providerId,
        options: undefined,
      },
    });
  }

  async getServiceByUserId(userId: string) {
    return prisma.service.findFirst({
      where: {
        provider: {
          userId: userId,
        },
      },
      include: {
        options: true,
      },
    });
  }
}

const servicesService = new ServicesService();

export default servicesService;
