import { Appointment } from '@prisma/client';


export default class UserService {
  private appointmentRepository;

  constructor(iAppointmentRepository){
    this.appointmentRepository = iAppointmentRepository;
  }

  async createAppointment (registration, menuId): Promise<Appointment> {
    // verificar se o usuário tem ou não três faltas
    const appointmentCreated = this.appointmentRepository.create(registration, menuId);
    return appointmentCreated;
  }
  
  async cancelAppointment (appointmentId): Promise<Appointment> {
    const appointmentExist = this.appointmentRepository.getById(appointmentId);
    if(!appointmentExist) throw new Error('Este agendamento não existe.');
    const appointmentDeleted = this.appointmentRepository.deleteById(appointmentId);
    return appointmentDeleted;
  }

  async getAllAppointments (menuId, userRegistration): Promise<Appointment> {
    const userId = !menuId ? userRegistration : undefined;
    const appointments = await this.appointmentRepository.getAll(menuId, userId);
    return appointments;
  }

  async markPresence (appointmentId): Promise<Appointment> {
    const appointmentUpdated = this.appointmentRepository.changePresenceToTrue(appointmentId);
    return appointmentUpdated;
  }

}