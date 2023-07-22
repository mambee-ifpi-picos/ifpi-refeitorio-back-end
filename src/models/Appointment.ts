import Prisma from '@prisma/client';

export type Appointment = Prisma.Appointment;

export type MessageAndAppointment = {
  message?: string;
  data: Appointment
}

export type MessageAndAppointments = {
  message?: string;
  data: Appointment[]
}