import Prisma from '@prisma/client';

export type Menu = Prisma.Menu;

export type NewMenuRepository = {
  items: {id: number}[],
  date: Date,
  meal: string
}

export type NewMenu = {
  items: number[],
  date: Date,
  meal: string
}

export type MenuFilter = {
  id?: number;
  meal?: 'janta' | 'almoço'
  convertedInitialDate?: Date;
  convertedFinalDate?: Date;
  description?: string;
  state?: boolean;
}

export type MessageAndMenu = {
  message?: string;
  data: Menu
}

export type MessageAndMenus = {
  message?: string;
  data: Menu[]
}