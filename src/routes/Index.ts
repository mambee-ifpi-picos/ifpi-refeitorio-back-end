import { Router, Request, Response } from 'express';
import usersRoutes from './Users';
import menuRoutes from './Menu'

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  res.send('Hello!');
});

routes.use('/users', usersRoutes);
routes.use('/menu', menuRoutes);

export default routes;
