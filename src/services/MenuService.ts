import { Menu } from '../repositories/base/models/MenuModel';
import IMenuRepository from '../repositories/interfaces/MenuRepositoryInterface';
import IMenuServiceInterface from './interfaces/MenuServiceInterface';


export default class MenuService implements IMenuServiceInterface {
  private  menuRepository : IMenuRepository;


  constructor( iMenuRepository: IMenuRepository){
    this.menuRepository = iMenuRepository;
  }


    async addMenu({ items, date, snack }: Menu): Promise<string> {
      const menuAdd = await this.menuRepository.add({
        items,
        date,
        snack,
      } as Menu);

      return menuAdd;
    }

    async getAll(): Promise<Menu[]> {
      const menus = await this.menuRepository.getAll();

      return menus;
    }

    async updateMenu(menu: Menu, id: number): Promise<Menu> {
      const userExist = await this.menuRepository.selectOne({ id });

      if(!userExist) throw new Error ('Menu não encontrado');

      const menuUpdate = await this.menuRepository.update(menu, id);

      return menuUpdate;
    }

    async deleteMenu( id: number ): Promise<string> {
      const menuExist = await this.menuRepository.selectOne({ id });
      if(!menuExist) throw new Error( 'Menu não encontrado' );
      const menuDelete = await this.menuRepository.delete(id);
      return menuDelete;
    }
}
