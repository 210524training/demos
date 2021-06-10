import expressSession from 'express-session';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import path from 'path';
import StatusCodes from 'http-status-codes';

import dotenv from 'dotenv';

import log from './log';
import baseRouter from './routes';

dotenv.config({});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));
app.use(expressSession({
  secret: 'whatever-probably-should-be-from-env-vars',
  cookie: {},
}));

app.use('/', baseRouter);

const { BAD_REQUEST } = StatusCodes;
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // TODO: Refactor later that sends back more than just a 400
  // Because not all requests that fail are the fault of the client
  console.log('Our custom error handler');
  log.error(err);
  res.status(BAD_REQUEST).json({
    error: err.message,
  });

  next(err);
});

export default app;
