import { Menu } from '../base/models/MenuModel';

export interface IMenuRepository {
    add(newMenu: Menu): Promise<string>;
    getAll(): Promise<Menu[]>;

}