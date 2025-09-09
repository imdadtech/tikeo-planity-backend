import prisma from '../../config/prisma/client';
import { CreateServiceDto } from '../dto/createService.dto';

class ServicesService {
  async createService(providerId: string, data: CreateServiceDto) {
    return prisma.service.create({
      data: {
        ...data,
        providerId,
        options: {
          create: data.options,
        },
        schedulers: {
          create: data.schedulers,
        },
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
        schedulers: true,
      },
    });
  }
}

const servicesService = new ServicesService();

export default servicesService;
