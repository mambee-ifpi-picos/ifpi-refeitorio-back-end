import { User, UserToCreate } from '../../models/User';

interface IUserServiceInterface {
  genToken(user: User): string;
  loginUser(user: UserToCreate): Promise<{ user: User, token: string }>;
  createUser(user: UserToCreate): Promise<{ user: User, token: string }>;
  getAllUsers(id: number): Promise<User[]>;
  getUser(registration: string): Promise<User>;
  changeUserStatus(registration: string): Promise<User>;
}

export default IUserServiceInterface;