import { Item, MsgAndItem } from '../base/models/ItemModel';

interface IItemsRepository {
    add(newItem: Item): Promise<MsgAndItem>;
    getAll(): Promise<Item[]>;
    delete( id: number): Promise<MsgAndItem>;
}

export default IItemsRepository;
