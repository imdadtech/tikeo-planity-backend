import 'dotenv/config';
import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import authRouter from './auth/routes/auth.route';
import userRouter from './user/routes/user.route';
import providersRouter from './providers/routes/providers.route';
import servicesRouter from './services/routes/services.route';
import initializePassport from './config/passport/initialize';
import isAProvider from './middlewares/isAProvider';
import currencyRouter from './currency/routes/currency.route';

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = '/api';

initializePassport(passport);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.get('/', (_req, res) => {
  res.send('Hello TypeScript with Node.js!');
});

app.use(`${BASE_URL}/auth`, authRouter);
app.use(`${BASE_URL}/user`, userRouter);
app.use(
  `${BASE_URL}/providers`,
  passport.authenticate('jwt', { session: false }),
  isAProvider,
  providersRouter,
);
app.use(
  `${BASE_URL}/services`,
  passport.authenticate('jwt', { session: false }),
  isAProvider,
  servicesRouter,
);
app.use(`${BASE_URL}/currencies`, currencyRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export { app };
