import { Menu } from '../../repositories/base/models/MenuModel';


export default interface IMenuServiceInterface {
    addMenu({ items, date, snack }: Menu): Promise<string>;
    getAll(): Promise<Menu[]>;
    updateMenu(menu: Menu, id: number): Promise<Menu>;
    deleteMenu(id: number): Promise<string>;
// eslint-disable-next-line semi
};
