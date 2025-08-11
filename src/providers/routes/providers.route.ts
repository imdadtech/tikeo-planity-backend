import { Router } from 'express';
import create from '../controllers/create';
import me from '../controllers/me';
import update from '../controllers/update';

const providersRouter = Router();

providersRouter.post('/', create);
providersRouter.get('/me', me);
providersRouter.put('/me', update);

export default providersRouter;
