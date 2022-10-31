import { Menu } from '../../repositories/base/models/MenuModel';


export default interface IMenuServiceInterface {
    addMenu({ items, date, snack }: Menu): Promise<string>;
    getAll(): Promise<Menu[]>;
// eslint-disable-next-line semi
};