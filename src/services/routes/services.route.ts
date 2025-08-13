import { Router } from 'express';
import create from '../controllers/create';

const servicesRouter = Router();

servicesRouter.post('/', create);
// servicesRouter.get('/');

export default servicesRouter;
