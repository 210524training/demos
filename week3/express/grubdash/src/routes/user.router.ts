import express, { Router } from 'express';
import userService from '../services/user.service';
import { AuthenticationError } from '../errors';
import User from '../models/user';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  console.log('Reached our user router get all function');

  if(!req.session.isLoggedIn || !req.session.user) {
    throw new AuthenticationError('You must be logged in to access this functionality');
  }

  // Past the above if statement, we have confirmed that the user is logged in

  // Pretend that we have some actual data
  // This is an array of just this 1 user
  // But this should instead use our DynamoDB DocumentClient to fetch data
  res.json(
    await userService.getAll(),
  );
});

userRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  res.json(
    await userService.getById(id),
  );
});

userRouter.post('/', async (req: express.Request<unknown, unknown, User, unknown, {}>, res) => {
  res.json(
    await userService.add(req.body),
  );
});

userRouter.put('/', async (req: express.Request<unknown, unknown, User, unknown, {}>, res) => {
  res.json(
    await userService.update(req.body),
  );
});

userRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  res.json(
    await userService.delete(id),
  );
});

export default userRouter;
