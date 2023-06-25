import { Prisma, User } from '@prisma/client';
import BaseRepository from './base/BaseRepository';


// export default class UserRepository extends BaseRepository implements IUserRepository {
export default class UserRepository extends BaseRepository {

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

  public async getByRegistration(registration): Promise<User> {
    return super.getPrisma().user.findUnique({
      where: {
        registration
      }
    });
  }

  public async getAll(): Promise<User[]> {
    return super.getPrisma().user.findMany({
      where: {
        status: true
      }
    });
  }

  public async changeStatusByRegistration(registration, actualStatus): Promise<User> {
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