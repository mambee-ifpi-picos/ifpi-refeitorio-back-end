import { Item, MsgAndItem } from '../../repositories/base/models/ItemModel';


interface IItemsServiceInterface {
    addItem({ creationDate, name }: Item ): Promise<MsgAndItem>;
}

export default IItemsServiceInterface;
