import { Router } from 'express';
import create from '../controllers/create';

const servicesRouter = Router();

servicesRouter.post('/services', create);
servicesRouter.get('/services');

export default servicesRouter;
