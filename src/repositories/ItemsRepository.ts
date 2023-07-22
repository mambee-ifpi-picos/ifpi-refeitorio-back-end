import { Prisma } from '@prisma/client';
import { NewItem, Item, ItemToUpdate } from '../models/Item';
import  BaseRepository  from './base/BaseRepository';
import IItemsRepositoryInterface from './interfaces/ItemsRepositoryInterface';

export default class ItemsRepository extends BaseRepository implements IItemsRepositoryInterface {

  public async add(infosNewItem: NewItem): Promise<Item> {
    return super.getPrisma().item.create({
      data: infosNewItem
    });
  }

  public async getAll (): Promise<Item[]> {
    return super.getPrisma().item.findMany({
      where: {
        active: true,
      },
    });
  }

  public async selectOne (where: Prisma.ItemWhereInput): Promise<Item> {
    return super.getPrisma().item.findFirst({ where });
  }

  public async deleteById (id: number): Promise<Item> {
    return super.getPrisma().item.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });
  }

  public async update (data: ItemToUpdate): Promise<Item> {
    return super.getPrisma().item.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        active: data.active,
      },
    });
  }
}
