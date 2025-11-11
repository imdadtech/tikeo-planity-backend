import { Router } from 'express';
import create from '../controllers/create';
import me from '../controllers/me';
import update from '../controllers/update';
import createProviderService from '../../services/controllers/provider/createProviderService';
import getProviderService from '../../services/controllers/provider/getProviderService';
import schedulerRouter from '../../services/routes/scheduler/scheduler.route';
import upload from '../../middlewares/multer-config';
import uploadFile from '../controllers/uploadFile';

const providersRouter = Router();

const servicePath = '/service';

providersRouter.post('/', create);

providersRouter.post(servicePath, createProviderService);
providersRouter.get(servicePath, getProviderService);
providersRouter.use(schedulerRouter);
providersRouter.put('/upload:userId', upload.single('file'), uploadFile);

providersRouter.get('/me', me);
providersRouter.put('/me', update);

export default providersRouter;
