import { Router } from 'express';
import userRouter from './user.router';
import restaurantRouter from './restaurant.router';

const baseRouter = Router();

baseRouter.get('/json', async (req, res) => {
  console.log('Our callback was invoked!');
  // res.json({ data: 'This is sending back JSON' });

  throw new Error('Something went wrong!');
});

baseRouter.post('/login', async (req, res) => {
  // TODO: Implement Login Functionality
});

baseRouter.post('/logout', async (req, res) => {
  // TODO: Implement Logout Functionality
});

baseRouter.use('api/v1/users', userRouter);
baseRouter.use('api/v1/restaurants', restaurantRouter);

export default baseRouter;
