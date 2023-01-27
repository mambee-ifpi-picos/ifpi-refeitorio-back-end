import { Prisma } from '@prisma/client';
import { Item, MsgAndItem } from '../base/models/ItemModel';

interface IItemsRepository {
    add(newItem: Item): Promise<MsgAndItem>;
    getAll(): Promise<Item[]>;
    selectOne( where: Prisma.ItemsWhereInput ): Promise<Item>;
    delete( id: number): Promise<MsgAndItem>;
    update( data: Item ): Promise<MsgAndItem>;
}

export default IItemsRepository;
