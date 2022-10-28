import { Menu } from "../repositories/base/models/MenuModel";
import MenuRepository from '../repositories/MenuRepository';


const menuRepository = new MenuRepository();

export class MenuService {
    async addMenu({items, date, snack,}: Menu): Promise<Menu> {
    const menuAdd = await menuRepository.add({
        items,
        date,
        snack,
      } as Menu);

    return menuAdd;
    }
}
