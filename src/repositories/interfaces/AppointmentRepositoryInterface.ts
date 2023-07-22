import { Prisma } from '@prisma/client';
import { Appointment } from '../../models/Appointment';

interface IAppointmentRepository {
  create(registration: string, menuId: number): Promise<Appointment>;
  getMany(where: Prisma.AppointmentWhereInput): Promise<Appointment[]>;
  selectOne(where: Prisma.AppointmentWhereInput): Promise<Appointment>;
  deleteById(where: Prisma.AppointmentWhereInput): Promise<Appointment>;
  changePresenceToTrue(appointmentId: number): Promise<Appointment>;
}

export default IAppointmentRepository;