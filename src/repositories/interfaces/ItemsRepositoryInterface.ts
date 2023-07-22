import { Prisma } from '@prisma/client';
import { NewItem, Item, ItemToUpdate } from '../../models/Item';

interface IItemsRepository {
  add(infosNewItem: NewItem): Promise<Item>;
  getAll(): Promise<Item[]>;
  selectOne(where: Prisma.ItemWhereInput): Promise<Item>;
  deleteById(id: number): Promise<Item>;
  update(data: ItemToUpdate): Promise<Item>;
}

export default IItemsRepository;
