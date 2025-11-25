import { Request, Response } from 'express';

async function createScheduler(req: Request, res: Response) {
  const { serviceId } = req.params;
}

export default createScheduler;
