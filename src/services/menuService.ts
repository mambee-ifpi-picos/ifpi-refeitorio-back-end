import { Menu } from "../repositories/base/models/MenuModel";
import MenuRepository from '../repositories/MenuRepository';


const menuRepository = new MenuRepository();

export class MenuService {
    async addMenu({items, date, snack}: Menu): Promise<string> {
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
