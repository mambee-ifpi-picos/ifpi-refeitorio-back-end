import { Item } from '../models/Item';
import IItemsRepositoryInterface from '../repositories/interfaces/ItemsRepositoryInterface';
import IItemsServiceInterface from './interfaces/ItemsServiceInterface';

export default class ItemsService implements IItemsServiceInterface {
  private  itemRepository : IItemsRepositoryInterface;

  constructor( iItemsRepository: IItemsRepositoryInterface){
    this.itemRepository = iItemsRepository;
  }

  async addItem({ name }: { name: string }): Promise<Item> {
    const itemExist = await this.itemRepository.selectOne({ name });
    let createdItem: Item | null;
    if(itemExist) {
      if(itemExist.active === true) {
        throw new Error('Já existe um item com esse nome.');
      }
      const item = await this.itemRepository.update({ id: itemExist.id, name, active: true });
      createdItem =item;
    } else {
      createdItem = await this.itemRepository.add({
        name
      } as Item);;
    }
    return createdItem;
  }

  async getAll(): Promise<Item[]> {
    const items = await this.itemRepository.getAll();
    return items;
  }

  async deleteItem(id: number): Promise<Item> {
    const item = await this.itemRepository.selectOne({ id });
    if (!item) throw new Error('Item não encontrado.');
    const deletedItem = await this.itemRepository.deleteById(id);
    return deletedItem;
  }

  async updateItem(id: number, name: string): Promise<Item> {
    const updatedItem = await this.itemRepository.update({ id, name });
    if (!updatedItem || updatedItem.active === false) throw new Error('Item não encontrado.');
    return updatedItem;
  }
}
