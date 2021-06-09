import { Router } from 'express';

const restaurantRouter = Router();

restaurantRouter.get('/', async (req, res) => {
  // TODO: Implement the GET all restaurants endpoint
});

restaurantRouter.get('/:id', async (req, res) => {
  // TODO: Implement the GET restaurant by ID endpoint
});

restaurantRouter.post('/', async (req, res) => {
  // TODO: Implement the Create restaurant endpoint
});

restaurantRouter.put('/', async (req, res) => {
  // TODO: Implement the Update restaurant endpoint
});

restaurantRouter.delete('/:id', async (req, res) => {
  // TODO: Implement the Delete restaurant by ID endpoint
});

export default restaurantRouter;
