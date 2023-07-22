import { User } from '@prisma/client';
import BaseRepository from './base/BaseRepository';
import IUserRepository from './interfaces/UserRepositoryInterface';

export default class UserRepository extends BaseRepository implements IUserRepository {

  public async add(infosUser): Promise<User> {
    const userCreated = await super.getPrisma().user.create({
      data: {
        name: infosUser.name,
        registration: infosUser.registration,
        course: infosUser.course,
        email: infosUser.email,
        status: true,
        type: infosUser.type
      }
    });
    return userCreated;
  }

  public async getUser(registration: string): Promise<User> {
    return super.getPrisma().user.findUnique({
      where: {
        registration
      },
      include: {
        appointment: true
      }
    });
  }

  public async getAll(): Promise<User[]> {
    return super.getPrisma().user.findMany();
  }

  public async changeStatusByRegistration(registration: string, actualStatus: boolean): Promise<User> {
    const updatedUser = super.getPrisma().user.update({
      where: {
        registration
      },
      data: {
        status: !actualStatus
      }
    });
    return updatedUser;
  }
}