import { IMenu, MsgAndMenu } from '../../repositories/base/models/MenuModel';

interface IMenuServiceInterface {
    addMenu({ items, date, meal }: IMenu): Promise<MsgAndMenu>;
    getAll(): Promise<IMenu[]>;
    updateMenu(items: number[], id: number): Promise<MsgAndMenu>;
    deleteMenu(id: number): Promise<MsgAndMenu>;
}

export default IMenuServiceInterface;