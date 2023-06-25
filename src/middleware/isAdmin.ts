import { NextFunction, Request, Response } from 'express';
import { TypeUser } from '../models/enumerators';
import UserRepository from '../repositories/UserRepository';
import UserService from '../services/UserService';

const userService = new UserService(new UserRepository);

export default async function isAdmin (req: Request, res: Response, next: NextFunction) {
  const userRegistration = res.locals.decoded.registration;
  const user = await userService.getUser(userRegistration);
  if(user.type === TypeUser.ADMIN){
    next();
  } else {
    return res.status(403).json('Não autorizado.');
  }
  return null;
}