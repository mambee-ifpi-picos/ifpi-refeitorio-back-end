import { Menu } from "../../repositories/base/models/MenuModel";


export interface MenuServiceInterface {
    addMenu({items, date, snack}: Menu): Promise<string>;
    getAll(): Promise<Menu[]>;
}