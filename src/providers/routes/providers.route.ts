import { Router } from 'express';
import create from '../controllers/create';
import me from '../controllers/me';
import update from '../controllers/update';
import createProviderService from '../../services/controllers/provider/createProviderService';
import getProviderService from '../../services/controllers/provider/getProviderService';
import schedulerRouter from '../../services/routes/scheduler/scheduler.route';
import { createCustomer } from '../controllers/createCustomer';
import { getAllCustomers, getCustomerById } from '../controllers/getCustomer';
import { updateCustomer } from '../controllers/updateCustomer';
import deleteCustomer from '../controllers/deleteCustomer';

const providersRouter = Router();

const servicePath = '/service';

providersRouter.post('/', create);

providersRouter.post(servicePath, createProviderService);
providersRouter.get(servicePath, getProviderService);
providersRouter.use(schedulerRouter);

providersRouter.get('/me', me);
providersRouter.put('/me', update);

providersRouter.post('/customer', createCustomer);
providersRouter.get('/customer/:id', getCustomerById);
providersRouter.get('/customers', getAllCustomers);
providersRouter.put('/customer/:id', updateCustomer);
providersRouter.delete('/customer/:id', deleteCustomer);

export default providersRouter;
