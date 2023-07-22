import { Item } from '../../models/Item';

interface IItemsServiceInterface {
  addItem({ name }: { name: string } ): Promise<Item>;
  getAll(): Promise<Item[]>;
  deleteItem( id: number ): Promise<Item>;
  updateItem( id: number, name: string ): Promise<Item>;
}

export default IItemsServiceInterface;