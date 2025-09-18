import { Router } from 'express';
import updateScheduler from '../../controllers/scheduler/update';
import deleteSchedule from '../../controllers/scheduler/delete';

const servicePath = '/service';
const schedulerPath = '/scheduler';

const schedulerRouter = Router();

schedulerRouter.put(`${servicePath}/:serviceId${schedulerPath}`, updateScheduler);
schedulerRouter.delete(`${schedulerPath}/:scheduleId`, deleteSchedule);

export default schedulerRouter;
