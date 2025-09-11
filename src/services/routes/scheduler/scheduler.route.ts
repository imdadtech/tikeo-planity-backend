import { Router } from 'express';
import updateScheduler from '../../controllers/scheduler/update';

const servicePath = '/service';
const schedulerPath = '/scheduler';

const schedulerRouter = Router();

schedulerRouter.put(`${servicePath}/:serviceId${schedulerPath}`, updateScheduler);

export default schedulerRouter;
