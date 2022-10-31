import { Router, Request, Response } from 'express';
import menuRoutes from './Menu';
import usersRoutes from './Users';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  res.send('Hello!');
});

routes.use('/users', usersRoutes);
routes.use('/menu', menuRoutes);

export default routes;
