import { Item, MsgAndItem } from '../../repositories/base/models/ItemModel';


interface IItemsServiceInterface {
    addItem({ name }: Item ): Promise<MsgAndItem>;
    getAll(): Promise<Item[]>;
    deleteItem( id: number ): Promise<MsgAndItem>;
    updateItem( id: number, name: string ): Promise<MsgAndItem>;
}

export default IItemsServiceInterface;
