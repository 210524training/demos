import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  // TODO: Implement the GET all users endpoint
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
