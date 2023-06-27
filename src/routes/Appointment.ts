import { Request, Response, Router } from 'express';
import auth from '../middleware/auth';
import isAdmin from '../middleware/isAdmin';
import isUserTypeRestaurant from '../middleware/isUserTypeRestaurant';
import AppointmentRepository from '../repositories/AppointmentRepository';
import MenuRepository from '../repositories/MenuRepository';
import UserRepository from '../repositories/UserRepository';
import AppointmentService from '../services/AppointmentService';
import MenuService from '../services/MenuService';
import UserService from '../services/UserService';

const routes = Router();
const userService = new UserService(new UserRepository);
const menuService = new MenuService(new MenuRepository());
const appointmentService = new AppointmentService(new AppointmentRepository);

routes.post('/', auth, async (req: Request, res: Response) => {
  try {
    const { menuId } = req.body;
    const user = await userService.getUser(res.locals.decoded.registration);
    if(!user) throw new Error('Usuário não encontrado.');
    const menu = await menuService.getMenuById(menuId);
    if(!menu) throw new Error('Menu não encontrado.');
    const appointment = await appointmentService.createAppointment(user.registration, menu.id);
    return res.status(201).json({ appointment });
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

routes.delete('/', auth, async (req: Request, res: Response) => {
  try {
    const { appointmentId } = req.body;
    const appointmentDeleted = await appointmentService.cancelAppointment(appointmentId);
    return res.status(201).json({ appointment: appointmentDeleted });
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

routes.get('/getAll', auth, isAdmin, async (req: Request, res: Response) => {
  try {
    const { menuId, userId } = req.body;
    const appointments = await appointmentService.getAllAppointments(menuId, userId);
    return res.status(200).json({ appointments });
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

// routes.put('/markPresence', auth, isUserTypeRestaurant, async (req: Request, res: Response) => {
routes.put('/markPresence', async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const user = await userService.getUser(userId);
    if(!user) throw new Error('Usuário não encontrado.');
    const currentMenu = await menuService.getCurrentMenu();
    if(!currentMenu) throw new Error('Não foi encontrado um menu cadastrado.');
    const appointmentInCurrentMenu = user.appointment?.filter(appointment => appointment.menuId === currentMenu.id)[0];
    if(!appointmentInCurrentMenu) throw new Error('O usuário não realizou a reserva.');
    const appointmentMarkedHowPresent = await appointmentService.markPresence(appointmentInCurrentMenu.id);
    return res.status(200).json({ appointmentMarkedHowPresent });
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

export default routes;