import { Item, MsgAndItem } from '../repositories/base/models/ItemModel';
import IItemsRepositoryInterface from '../repositories/interfaces/ItemsRepositoryInterface';
import IItemsServiceInterface from './interfaces/ItemsServiceInterface';

export default class ItemsService implements IItemsServiceInterface {
  private  itemRepository : IItemsRepositoryInterface;

  constructor( iItemsRepository: IItemsRepositoryInterface){
    this.itemRepository = iItemsRepository;
  }

  async addItem({ name }: Item): Promise<MsgAndItem> {
    const createdtemAndMessage = await this.itemRepository.add({
      name
    } as Item);
    return createdtemAndMessage;
  }

  async getAll(): Promise<Item[]> {
    const items = await this.itemRepository.getAll();
    return items;
  }

  async deleteItem( id: number ): Promise<MsgAndItem> {
    const item = await this.itemRepository.selectOne({ id });
    if (!item) throw new Error('Item não encontrado.');
    const deletedItemAndMessage = await this.itemRepository.delete(id);
    return deletedItemAndMessage;
  }

  async updateItem( id: number, name: string ): Promise<MsgAndItem> {
    const updatedItemAndMessage = await this.itemRepository.update( id, name );
    if (!updatedItemAndMessage) throw new Error('Item não encontrado.');
    if (updatedItemAndMessage.item.active === false) throw new Error('Item não encontrado.');
    return updatedItemAndMessage;
  }
}
