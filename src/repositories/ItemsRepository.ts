import { Prisma } from '@prisma/client';
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

  public async getAll(): Promise<Item[]> {
    return super.getPrisma().items.findMany({});
  }

  public async selectOne( where: Prisma.ItemsWhereInput ): Promise<Item> {
    const result = await super.getPrisma().items.findFirst({ where });
    return result;
  }

  public async delete( id: number ): Promise<MsgAndItem> {
    const deletedItem = await super.getPrisma().items.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });

    const msg = 'Item deletado com sucesso.';

    return { msg, item: deletedItem };
  }
}
