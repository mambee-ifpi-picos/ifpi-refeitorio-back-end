import { Appointment } from '@prisma/client';
import BaseRepository from './base/BaseRepository';


// export default class UserRepository extends BaseRepository implements IUserRepository {
export default class AppointmentRepository extends BaseRepository {

  public async create (registration, menuId): Promise<Appointment> {
    const appointmentCreated = await super.getPrisma().appointment.create({
      data: {
        userId: registration,
        menuId
      }
    });
    return appointmentCreated;
  }

  public async getAll (menuId, userId): Promise<Appointment[]> {
    const appointments = await super.getPrisma().appointment.findMany({
      where: {
        ...(menuId && { menuId }),
        ...(userId && { userId })
      }
    });
    return appointments;
  }

  public async getById (appointmentId): Promise<Appointment> {
    const appointment = await super.getPrisma().appointment.findUnique({
      where: {
        id: appointmentId
      }
    });
    return appointment;
  }

  public async deleteById (appointmentId): Promise<Appointment> {
    const appointmentDeleted = await super.getPrisma().appointment.delete({
      where: {
        id: appointmentId
      }
    });
    return appointmentDeleted;
  }

  public async changePresenceToTrue (appointmentId): Promise<Appointment> {
    const appointmentUpdated = await super.getPrisma().appointment.update({
      data: {
        presence: true
      },
      where: {
        id: appointmentId
      }
    });
    return appointmentUpdated;
  }
}