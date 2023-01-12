import { Item, MsgAndItem } from '../base/models/ItemModel';

interface IItemsRepository {
    add(newItem: Item): Promise<MsgAndItem>;
}

export default IItemsRepository;
