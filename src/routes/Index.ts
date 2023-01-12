import { Router, Request, Response } from 'express';
import menuRoutes from './Menu';
import itemsRoutes from './Items';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  res.send('Hello!');
});

routes.use('/menu', menuRoutes);
routes.use('/items', itemsRoutes);

export default routes;
