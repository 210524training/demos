import express, { Router } from 'express';
import userRouter from './user.router';
import restaurantRouter from './restaurant.router';
import User from '../models/user';

const baseRouter = Router();

/* GET home page */
// baseRouter.get('/', (req, res) => {
//   res.sendFile('index.html', {
//     root: 'views/',
//   });
// });

baseRouter.get('/json', async (req, res) => {
  console.log('Our callback was invoked!');
  // res.json({ data: 'This is sending back JSON' });

  throw new Error('Something went wrong!');
});

baseRouter.post('/login', async (req: express.Request<unknown, unknown, { username: string, password: string }, unknown, {}>, res) => {
  const { username, password } = req.body;

  req.session.isLoggedIn = true;

  req.session.user = new User(username, password, '', '', 'Customer');

  res.json(req.session.user);
});

export async function logout(req: express.Request, res: express.Response): Promise<void> {
  if(req.session.user) {
    const { username } = req.session.user;

    req.session.destroy(() => {
      console.log(`${username} logged out`);
    });
  }
  // If they aren't logged in, we don't need to do anything

  res.status(202).send();
}

baseRouter.post('/logout', logout);

baseRouter.use('/api/v1/users', userRouter);
baseRouter.use('/api/v1/restaurants', restaurantRouter);

export default baseRouter;
