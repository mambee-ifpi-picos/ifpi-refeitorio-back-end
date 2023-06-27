import { Router, Request, Response } from 'express';
import appointmentRoutes from './Appointment';
import itemsRoutes from './Items';
import menuRoutes from './Menu';
import userRoutes from './User';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  res.send('Hello!');
});

routes.use('/menu', menuRoutes);
routes.use('/items', itemsRoutes);
routes.use('/user', userRoutes);
routes.use('/appointment', appointmentRoutes);

export default routes;
