import { Router } from 'express';
import updateScheduler from '../../controllers/scheduler/update';

const schedulerRouter = Router();

schedulerRouter.put('/:serviceId', updateScheduler);

export default schedulerRouter;
