import { Appointment } from '../../models/Appointment';

interface IAppointmentService {
  createAppointment (registration: string, menuId: number): Promise<Appointment>;
  cancelAppointment (appointmentId: number): Promise<Appointment>;
  getAllAppointments (menuId: number, userRegistration: string): Promise<Appointment[]>;
  markPresence (appointmentId: number): Promise<Appointment>;
  getAllUserAppointments (userRegistration: string): Promise<Appointment[]>;
  getAllMenuAppointments (menuId: number): Promise<Appointment[]>;
}

export default IAppointmentService;