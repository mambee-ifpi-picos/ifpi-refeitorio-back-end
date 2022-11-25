import { Menu, MsgAndMenu } from '../../repositories/base/models/MenuModel';

interface IMenuServiceInterface {
    addMenu({ items, date, meal }: Menu): Promise<MsgAndMenu>;
    getAll(): Promise<Menu[]>;
    updateMenu(menu: Menu, id: number): Promise<MsgAndMenu>;
    deleteMenu(id: number): Promise<MsgAndMenu>;
}

export default IMenuServiceInterface;