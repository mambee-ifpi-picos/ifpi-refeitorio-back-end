import { Appointment } from '../models/Appointment';
import IAppointmentRepository from '../repositories/interfaces/AppointmentRepositoryInterface';
import IAppointmentService from './interfaces/AppointmentServiceInterface';

export default class AppointmentService implements IAppointmentService {
  private appointmentRepository: IAppointmentRepository;

  constructor(AppointmentRepository){
    this.appointmentRepository = AppointmentRepository;
  }

  async createAppointment (registration: string, menuId: number): Promise<Appointment> {
    // verificar se o usuário tem ou não três faltas
    const appointmentCreated = await this.appointmentRepository.create(registration, menuId);
    return appointmentCreated;
  }
  
  async cancelAppointment (appointmentId: number): Promise<Appointment> {
    const appointmentExist = await this.appointmentRepository.selectOne({
      id: appointmentId
    });
    if(!appointmentExist) throw new Error('Este agendamento não existe.');
    const appointmentDeleted = await this.appointmentRepository.deleteById({
      id: appointmentId
    });
    return appointmentDeleted;
  }

  async getAllAppointments (menuId: number, userRegistration: string): Promise<Appointment[]> {
    const userId = !menuId ? userRegistration : undefined;
    const appointments = await this.appointmentRepository.getMany({
      ...(menuId && { menuId }),
      ...(userId && { userId })
    });
    return appointments;
  }

  async getAllUserAppointments (userRegistration: string): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.getMany({
      userId: userRegistration
    });
    return appointments;
  }

  async getAllMenuAppointments (menuId: number): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.getMany({
      menuId
    });
    return appointments;
  }

  async markPresence (appointmentId: number): Promise<Appointment> {
    const appointmentUpdated = await this.appointmentRepository.changePresenceToTrue(appointmentId);
    return appointmentUpdated;
  }
}