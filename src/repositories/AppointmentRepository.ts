import { Prisma } from '@prisma/client';
import { Appointment } from '../models/Appointment';
import BaseRepository from './base/BaseRepository';
import IAppointmentRepository from './interfaces/AppointmentRepositoryInterface';

export default class AppointmentRepository extends BaseRepository implements IAppointmentRepository {

  public async create (registration: string, menuId: number): Promise<Appointment> {
    return super.getPrisma().appointment.create({
      data: {
        userId: registration,
        menuId
      }
    });
  }

  public async getMany (where: Prisma.AppointmentWhereInput): Promise<Appointment[]> {
    return super.getPrisma().appointment.findMany({ where });
  }

  public async selectOne (where: Prisma.AppointmentWhereInput): Promise<Appointment> {
    return super.getPrisma().appointment.findFirst({ where });
  }

  public async deleteById (where: Prisma.AppointmentWhereUniqueInput): Promise<Appointment> {
    return super.getPrisma().appointment.delete({ where });
  }

  public async changePresenceToTrue (appointmentId: number): Promise<Appointment> {
    return super.getPrisma().appointment.update({
      data: {
        presence: true
      },
      where: {
        id: appointmentId
      }
    });
  }
}