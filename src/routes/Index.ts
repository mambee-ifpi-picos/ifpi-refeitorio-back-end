import { Router, Request, Response } from 'express';
import itemsRoutes from './Items';
import menuRoutes from './Menu';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  res.send('Hello!');
});

routes.use('/menu', menuRoutes);
routes.use('/items', itemsRoutes);

export default routes;
