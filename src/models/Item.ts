import Prisma from '@prisma/client';

export type Item = Prisma.Item;

export type NewItem = {
  name: string;
}

export type ItemToUpdate = {
  id: number,
  name?: string,
  active?: boolean
}

export type MessageAndItem = {
  message?: string;
  data: Item
}

export type MessageAndItems = {
  message?: string;
  data: Item[]
}