import { Appointment } from './Appointment';

export type User = {
  name: string;
  registration: string;
  course: string;
  email: string;
  status: boolean;
  type: number;
  appointment?: Appointment[]
};

export type UserToCreate = {
  name: string,
  registration: string,
  course: string,
  email: string
};

export type UserAndToken = {
  user: User,
  token: string
}

export type MessageAndUser = {
  message?: string,
  data: User
}

export type MessageAndUsers = {
  message?: string,
  data: User[]
}