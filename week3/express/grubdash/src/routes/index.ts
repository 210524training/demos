import express, { Router } from 'express';
// import path from 'path';
import userRouter from './user.router';
import restaurantRouter from './restaurant.router';
import userService from '../services/user.service';

const baseRouter = Router();

/* GET home page */
// baseRouter.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../public/views/index.html'));
// });

/* GET login page */
// baseRouter.get('/login', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../public/views/login.html'));
// });

// baseRouter.get('/json', async () => {
//   console.log('Our callback was invoked!');
//   // res.json({ data: 'This is sending back JSON' });

//   throw new Error('Something went wrong!');
// });

baseRouter.post('/login', async (req: express.Request<unknown, unknown, { username: string, password: string }, unknown, {}>, res) => {
  const { username, password } = req.body;

  const user = await userService.login(username, password);

  req.session.isLoggedIn = true;

  req.session.user = user;

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
