import 'dotenv/config';
import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import authRouter from './auth/routes/auth.route';
import userRouter from './user/routes/user.route';
import initializePassport from './config/passport/initialize';

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
