import { Request, Response, Router } from 'express';
import UserRepository from '../repositories/UserRepository';
import UserService from '../services/UserService';

const routes = Router();
const userService = new UserService(new UserRepository);

routes.post('/createUser', async (req: Request, res: Response) => {
  try{
    const { name, registration, course, email } = req.body;
    if(!name || !registration || !email ) {
      throw new Error('Não foram enviados todos os campos necessários.');
    }
    const logedUser = await userService.createUser({
      name, 
      registration,
      course,
      email
    });
    // gerar token de autenticação para o usuário
    return res.status(201).json(logedUser);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

routes.get('/unique/:registration', async (req: Request, res: Response) => {
  try {
    const { registration } = req.params;
    const user = await userService.getUser(registration);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

routes.get('/all', async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

routes.put('/change-status/:registration', async (req: Request, res: Response) => {
  try {
    const { registration } = req.params;
    const updatedUser = await userService.changeUserStatus(registration);
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

export default routes;