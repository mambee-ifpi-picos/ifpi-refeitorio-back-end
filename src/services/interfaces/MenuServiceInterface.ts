import { Menu, MsgAndMenu } from '../../repositories/base/models/MenuModel';

interface IMenuServiceInterface {
    addMenu({ items, day, meal }: Menu): Promise<MsgAndMenu>;
    getAll(): Promise<Menu[]>;
    updateMenu({ items }: { items: string }, id: number): Promise<MsgAndMenu>;
    deleteMenu(id: number): Promise<MsgAndMenu>;
}

export default IMenuServiceInterface;