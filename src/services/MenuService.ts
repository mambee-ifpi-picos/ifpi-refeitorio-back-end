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

    async updateMenu(menu: Menu, id: number): Promise<Menu> {
      const userExist = await menuRepository.selectOne({ id });

      if(!userExist) throw new Error ('Menu não encontrado');

      const menuUpdate = await menuRepository.update(menu, id);

      return menuUpdate;
    }

    async deleteMenu( id: number ): Promise<string> {
      const menuExist = await menuRepository.selectOne({ id });
      if(!menuExist) throw new Error( 'Menu não encontrado' );
      const menuDelete = await menuRepository.delete(id);
      return menuDelete;
    }
}
