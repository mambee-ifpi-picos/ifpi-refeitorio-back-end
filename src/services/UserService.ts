import jwt from 'jsonwebtoken';
import { TypeUser } from '../models/Enumerators';
import { User, UserAndToken, UserToCreate } from '../models/User';
import IUserRepository from '../repositories/interfaces/UserRepositoryInterface';
import IUserServiceInterface from './interfaces/UserServiceInterface';

export default class UserService implements IUserServiceInterface {
  private userRepository: IUserRepository;

  constructor(iUserRepository){
    this.userRepository = iUserRepository;
  }

  genToken (user: User): string {
    const token = jwt.sign({ registration: user.registration }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
  }

  async loginUser(user: UserToCreate): Promise<UserAndToken> {
    const existThisUser: User = await this.userRepository.getUser(user.registration);
    if(existThisUser){
      const token = this.genToken(existThisUser);
      return {
        user: existThisUser, 
        token
      };
    }
    return this.createUser(user);
  }

  async createUser(user: UserToCreate): Promise<UserAndToken> {
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
    return {
      user: createdUser,
      token
    };
  }

  async getAllUsers(): Promise<User[]> {
    const allUsers: User[] = await this.userRepository.getAll();
    if(!allUsers){ 
      throw new Error('Não foram encontrados usuários.');
    }; 
    return allUsers;
  }

  async getUser(registration: string): Promise<User> {
    const user = await this.userRepository.getUser(registration);
    if(!user){ 
      throw new Error('Usuário não encontrado.');
    }; 
    return user;
  }

  async changeUserStatus(registration: string): Promise<User> {
    const existThisUser: User = await this.userRepository.getUser(registration);
    if(!existThisUser){
      throw new Error('Usuário não encontrado.');
    }
    const updatedUser: User = await this.userRepository.changeStatusByRegistration(registration, existThisUser.status);
    return updatedUser;
  }
}