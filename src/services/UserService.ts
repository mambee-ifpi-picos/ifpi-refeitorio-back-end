import { User } from '@prisma/client';
import { TypeUser } from '../models/enumerators';


// export default class UserService implements IUserServiceInterface {
export default class UserService {
  private userRepository;

  constructor(iUserRepository){
    this.userRepository = iUserRepository;
  }

  // async loginUser(user): Promise<User> {
  //   const existThisUser = await this.userRepository.getByRegistration(user.registration);
  //   if(existThisUser){
  //     return existThisUser;
  //   }
  //   // montar lógica para o usuário do RESTAURANTE
  //   const infosUser = {
  //     ...user,
  //     type: user.email.includes('@aluno') ? TypeUser.STUDENT : TypeUser.ADMIN
  //   };
  //   const createdUser = await this.userRepository.add(infosUser);
  //   return createdUser;
  // }

  async createUser(user): Promise<User> {
    const existThisUser = await this.userRepository.getByRegistration(user.registration);
    if(existThisUser){
      throw new Error('Já existe um usuário com estas credenciais.');
    }
    if(user.email.includes('@aluno') && !user.course) {
      throw new Error('Informações divergentes');
    }
    // montar lógica para o usuário do RESTAURANTE
    const infosUser = {
      ...user,
      type: user.email.includes('@aluno') ? TypeUser.STUDENT : TypeUser.ADMIN
    };
    const createdUser = await this.userRepository.add(infosUser);
    return createdUser;
  }

  async getAllUsers(): Promise<User[] | null> {
    const allUsers = await this.userRepository.getAll();
    if(!allUsers){ 
      throw new Error('Não foram encontrados usuários.');
    }; 
    return allUsers;
  }

  async getUser(registration): Promise<User> {
    const user = await this.userRepository.getByRegistration(registration);
    if(!user){ 
      throw new Error('Usuário não encontrado.');
    }; 
    return user;
  }

  async changeUserStatus(registration): Promise<User> {
    const existThisUser = await this.userRepository.getByRegistration(registration);
    if(!existThisUser){
      throw new Error('Usuário não encontrado.');
    }
    const updatedUser = await this.userRepository.changeStatusByRegistration(registration, existThisUser.status);
    return updatedUser;
  }
}