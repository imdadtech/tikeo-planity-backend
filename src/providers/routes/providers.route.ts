import { Router } from 'express';
import create from '../controllers/create';
import me from '../controllers/me';
import passport from 'passport';

const providersRouter = Router();

providersRouter.post('/', create);
providersRouter.get('/me', me);

export default providersRouter;
