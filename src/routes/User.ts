import { Request, Response, Router } from 'express';
import auth from '../middleware/auth';
import isAdmin from '../middleware/isAdmin';
import UserRepository from '../repositories/UserRepository';
import UserService from '../services/UserService';

const routes = Router();
const userService = new UserService(new UserRepository);

routes.post('/signin', async (req: Request, res: Response) => {
  try{
    const { name, registration, course, email } = req.body;
    if(!name || !registration || !email ) {
      throw new Error('Não foram enviados todos os campos necessários.');
    }
    const logedUser = await userService.loginUser({
      name, 
      registration,
      course,
      email
    });
    return res.status(201).json({ user: logedUser });
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

routes.get('/unique/:registration', auth, async (req: Request, res: Response) => {
  try {
    const { registration } = req.params;
    const user = await userService.getUser(registration);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

routes.get('/all', auth, isAdmin, async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

routes.put('/change-status/:registration', auth, isAdmin, async (req: Request, res: Response) => {
  try {
    const { registration } = req.params;
    const updatedUser = await userService.changeUserStatus(registration);
    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

export default routes;