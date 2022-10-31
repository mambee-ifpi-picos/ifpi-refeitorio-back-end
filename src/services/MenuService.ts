import MenuRepository from '../repositories/MenuRepository';
import { Menu } from '../repositories/base/models/MenuModel';
import IMenuServiceInterface from './interfaces/MenuServiceInterface';



const menuRepository = new MenuRepository();

export default class MenuService implements IMenuServiceInterface {
    async addMenu({ items, date, snack }: Menu): Promise<string> {
      const menuAdd = await menuRepository.add({
        items,
        date,
        snack,
      } as Menu);

    return menuAdd;
    }

    async getAll(): Promise<Menu[]> {
      const menus = await menuRepository.getAll();

      return menus;
    }
}
