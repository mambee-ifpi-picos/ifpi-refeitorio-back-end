import { Router, Request, Response } from 'express';
import menuRoutes from './Menu';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  res.send('Hello!');
});

routes.use('/menu', menuRoutes);

export default routes;
