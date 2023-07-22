import { MenuFilter, NewMenuRepository, NewMenu, Menu } from '../models/Menu';
import IMenuRepository from '../repositories/interfaces/MenuRepositoryInterface';
import IMenuServiceInterface from './interfaces/MenuServiceInterface';
// import { TypeMenu } from 'src/models/enumerators';

export default class MenuService implements IMenuServiceInterface {
  private menuRepository : IMenuRepository;

  constructor(iMenuRepository: IMenuRepository){
    this.menuRepository = iMenuRepository;
  }

  async addMenu({ items, date, meal }: NewMenu): Promise<Menu> {
    if (meal !== 'almoço' && meal !== 'janta') throw new Error ('Preencha a refeição com "almoço" ou "janta".');
    const existMealToSameDate: Menu = await this.menuRepository.selectOne({ date, meal });
    if(existMealToSameDate) throw new Error (`Já existe um cardápio cadastrado para o(a) ${meal} da data informada.`);
    const listObjectIdItems: {id: number}[] = items?.map((item) => ({ id: item }));
    const createdMenu = await this.menuRepository.add({
      items: listObjectIdItems,
      date,
      meal,
    } as NewMenuRepository);
    return createdMenu;
  }

  async getMany(data: MenuFilter): Promise<Menu[]> {
    const menus: Menu[] = await this.menuRepository.getMany(data);
    return menus;
  }

  async getMenuById(menuId): Promise<Menu> {
    const menu: Menu = await this.menuRepository.selectOne({ id: menuId });
    return menu;
  }

  async updateMenu(items: number[], id: number): Promise<Menu> {
    const menuExist: Menu = await this.menuRepository.selectOne({ id });
    if(!menuExist) throw new Error ('Menu não encontrado');
    const listObjectIdItems: {id: number}[] = items?.map((item) => ({ id: item }));
    const changedMenu = await this.menuRepository.update(listObjectIdItems, id);
    return changedMenu;
  }

  async deleteMenu( id: number ): Promise<Menu> {
    const menu: Menu = await this.menuRepository.selectOne({ id });
    if(!menu) throw new Error('Menu não encontrado');
    const deletedMenu = await this.menuRepository.delete(id);
    return deletedMenu;
  }

  async getCurrentMenu(): Promise<Menu> {
    const actualMoment = new Date();
    const minMomentToLunch = new Date(actualMoment.getFullYear(), actualMoment.getMonth(), actualMoment.getDate());
    const minMomentToDinner = new Date(minMomentToLunch);
    minMomentToDinner.setHours(15);
    const currentMenu: Menu = await this.menuRepository.selectOne({
      date: minMomentToLunch,
      meal: actualMoment > minMomentToDinner ? 'janta' : 'almoço'
    });
    return currentMenu;
  }
}
