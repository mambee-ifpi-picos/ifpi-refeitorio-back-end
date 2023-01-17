import { Item, MsgAndItem } from '../base/models/ItemModel';

interface IItemsRepository {
    add(newItem: Item): Promise<MsgAndItem>;
    getAll(): Promise<Item[]>;
}

export default IItemsRepository;
