import express, { Router } from 'express';
import Restaurant from '../models/restaurant';
import restaurantService from '../services/restaurant.service';

const restaurantRouter = Router();

restaurantRouter.get('/', async (req, res) => {
  res.json(
    await restaurantService.getAll(),
  );
});

restaurantRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  res.json(
    await restaurantService.getById(id),
  );
});

restaurantRouter.post('/', async (req: express.Request<unknown, unknown, Restaurant, unknown, {}>, res) => {
  res.json(
    await restaurantService.add(req.body),
  );
});

restaurantRouter.put('/', async (req: express.Request<unknown, unknown, Restaurant, unknown, {}>, res) => {
  res.json(
    await restaurantService.update(req.body),
  );
});

restaurantRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  res.json(
    await restaurantService.delete(id),
  );
});

export default restaurantRouter;
