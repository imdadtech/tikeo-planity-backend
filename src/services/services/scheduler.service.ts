import prisma from '../../config/prisma/client';

class SchedulerService {
  async remove(id: string) {
    return prisma.schedule.delete({
      where: { id, isBooked: false },
    });
  }
}

const schedulerService = new SchedulerService();

export default schedulerService;
