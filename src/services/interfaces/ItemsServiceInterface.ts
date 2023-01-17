import { Item, MsgAndItem } from '../../repositories/base/models/ItemModel';


interface IItemsServiceInterface {
    addItem({ creationDate, name }: Item ): Promise<MsgAndItem>;
    getAll(): Promise<Item[]>;
    delete( id: number ): Promise<MsgAndItem>;
}

export default IItemsServiceInterface;
