import { Router } from 'express';
import create from '../controllers/create';
import get from '../controllers/get';

const servicesRouter = Router();

servicesRouter.post('/', create);
servicesRouter.get('/', get);

export default servicesRouter;
