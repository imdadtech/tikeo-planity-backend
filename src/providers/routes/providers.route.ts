import { Router } from 'express';
import create from '../controllers/create';

const providersRouter = Router();

providersRouter.post('/', create);

export default providersRouter;
