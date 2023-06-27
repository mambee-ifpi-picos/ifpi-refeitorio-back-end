import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { TypeUser } from '../models/enumerators';

// export default class UserService implements IUserServiceInterface {
export default class UserService {
  private userRepository;

  constructor(iUserRepository){
    this.userRepository = iUserRepository;
  }

  genToken (user): string {
    const token = jwt.sign({ registration: user.registration }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
  }

  async loginUser(user): Promise<{user: User, token: string}> {
    const existThisUser = await this.userRepository.getUser(user.registration);
    if(existThisUser){
      const token = this.genToken(existThisUser);
      return { user: existThisUser, token };
    }
    return this.createUser(user);
  }

  async createUser(user): Promise<{user: User, token: string}> {
    if(user.email.includes('@aluno') && !user.course) {
      throw new Error('Informações divergentes.');
    }
    // montar lógica para o usuário do RESTAURANTE
    const infosUser = {
      ...user,
      type: user.email.includes('@aluno') ? TypeUser.STUDENT : TypeUser.ADMIN
    };
    const createdUser = await this.userRepository.add(infosUser);
    const token = this.genToken(createdUser);
    return { user: createdUser, token };
  }

  async getAllUsers(): Promise<User[] | null> {
    const allUsers = await this.userRepository.getAll();
    if(!allUsers){ 
      throw new Error('Não foram encontrados usuários.');
    }; 
    return allUsers;
  }

  async getUser(registration): Promise<any> {
    const user = await this.userRepository.getUser(registration);
    if(!user){ 
      throw new Error('Usuário não encontrado.');
    }; 
    return user;
  }

  async changeUserStatus(registration): Promise<User> {
    const existThisUser = await this.userRepository.getUser(registration);
    if(!existThisUser){
      throw new Error('Usuário não encontrado.');
    }
    const updatedUser = await this.userRepository.changeStatusByRegistration(registration, existThisUser.status);
    return updatedUser;
  }
}