import  BaseRepository  from './base/BaseRepository';
import { Item, MsgAndItem } from './base/models/ItemModel';
import IItemsRepositoryInterface from './interfaces/ItemsRepositoryInterface';

export default class ItemsRepository extends BaseRepository implements IItemsRepositoryInterface {

  public async add(newItems: Item): Promise<MsgAndItem> {
    const createdItem = await super.getPrisma().items.create({
      data: newItems,
    });
    const msg = 'Cadastro salvo com Sucesso.';
    return { msg, item: createdItem };
  }
}
