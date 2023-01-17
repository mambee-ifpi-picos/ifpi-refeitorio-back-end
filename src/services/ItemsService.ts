import { Item, MsgAndItem } from '../repositories/base/models/ItemModel';
import IItemsRepositoryInterface from '../repositories/interfaces/ItemsRepositoryInterface';
import IItemsServiceInterface from './interfaces/ItemsServiceInterface';

export default class ItemsService implements IItemsServiceInterface {
  private  itemRepository : IItemsRepositoryInterface;

  constructor( iItemsRepository: IItemsRepositoryInterface){
    this.itemRepository = iItemsRepository;
  }

  async addItem({ name, creationDate }: Item): Promise<MsgAndItem> {
    const createdtemAndMessage = await this.itemRepository.add({
      name,
      creationDate,
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
    const deleteditemAndMessage = await this.itemRepository.delete(id);
    return deleteditemAndMessage;
  }
}
