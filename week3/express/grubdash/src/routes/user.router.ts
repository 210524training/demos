import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  console.log('Reached our user router get all function');

  if(!req.session.isLoggedIn || !req.session.user) {
    throw new Error('You must be logged in to access this functionality');
  }

  // Past the above if statement, we have confirmed that the user is logged in

  // Pretend that we have some actual data
  // This is an array of just this 1 user
  // But this should instead use our DynamoDB DocumentClient to fetch data
  res.json([req.session.user]);
});

userRouter.get('/:id', async (req, res) => {
  // TODO: Implement the GET user by ID endpoint
});

userRouter.post('/', async (req, res) => {
  // TODO: Implement the Create user endpoint
});

userRouter.put('/', async (req, res) => {
  // TODO: Implement the Update user endpoint
});

userRouter.delete('/:id', async (req, res) => {
  // TODO: Implement the Delete user by ID endpoint
});

export default userRouter;
