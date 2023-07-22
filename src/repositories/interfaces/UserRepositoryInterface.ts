import { User } from '@prisma/client';

interface IUserRepository {
  add(infosUser): Promise<User>;
  getUser(registration: string): Promise<User>;
  getAll(): Promise<User[]>;
  changeStatusByRegistration(registration: string, actualStatus: boolean): Promise<User>;
}

export default  IUserRepository;