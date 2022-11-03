import { Menu } from '../../repositories/base/models/MenuModel';


interface IMenuServiceInterface {
    addMenu({ items, date, snack }: Menu): Promise<string>;
    getAll(): Promise<Menu[]>;
    updateMenu(menu: Menu, id: number): Promise<Menu>;
    deleteMenu(id: number): Promise<string>;
}

export default IMenuServiceInterface;