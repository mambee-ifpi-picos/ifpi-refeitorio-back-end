import { Item, MsgAndItem } from '../repositories/base/models/ItemModel';
import IItemsRepositoryInterface from '../repositories/interfaces/ItemsRepositoryInterface';
import IItemsServiceInterface from './interfaces/ItemsServiceInterface';

export default class ItemsService implements IItemsServiceInterface {
  private  itemRepository : IItemsRepositoryInterface;

  constructor( iItemsRepository: IItemsRepositoryInterface){
    this.itemRepository = iItemsRepository;
  }

  async addItem({ name }: Item): Promise<MsgAndItem> {

    const itemExist = await this.itemRepository.selectOne({ name });

    let createdItemAndMessage: MsgAndItem | null;
    if(itemExist) {
      if(itemExist.active === true) throw new Error('Já existe um item com esse nome.');

      const { item } = await this.itemRepository.update({ id: itemExist.id, name, active: true });

      const msg = 'Cadastro salvo com Sucesso.';

      createdItemAndMessage = { msg, item };

    } else {
      createdItemAndMessage = await this.itemRepository.add({
        name
      } as Item);

    }

    return createdItemAndMessage;
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
    const updatedItemAndMessage = await this.itemRepository.update({ id, name });
    if (!updatedItemAndMessage || updatedItemAndMessage.item.active === false) throw new Error('Item não encontrado.');
    return updatedItemAndMessage;
  }
}
