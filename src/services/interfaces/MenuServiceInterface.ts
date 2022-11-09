import { Menu, MsgEMenu } from '../../repositories/base/models/MenuModel';


interface IMenuServiceInterface {
    addMenu({ items, date, snack }: Menu): Promise<string>;
    getAll(): Promise<Menu[]>;
    updateMenu(menu: Menu, id: number): Promise<string>;
    deleteMenu(id: number): Promise<MsgEMenu>;
}

export default IMenuServiceInterface;