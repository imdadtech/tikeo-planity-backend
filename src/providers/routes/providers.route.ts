import { Router } from 'express';
import create from '../controllers/create';
import passport from 'passport';

const providersRouter = Router();

providersRouter.post('/', create);

export default providersRouter;
