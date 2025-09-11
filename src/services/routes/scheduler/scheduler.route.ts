import { Router } from 'express';
import updateScheduler from '../../controllers/scheduler/update';

const servicePath = '/service';

const schedulerRouter = Router();

schedulerRouter.put(`${servicePath}/:serviceId`, updateScheduler);

export default schedulerRouter;
