import { Menu } from '@prisma/client';
import { IMenu, MenuFilter, MsgAndMenu, newMenu } from '../repositories/base/models/MenuModel';
import IMenuRepository from '../repositories/interfaces/MenuRepositoryInterface';
import IMenuServiceInterface from './interfaces/MenuServiceInterface';
// import { TypeMenu } from 'src/models/enumerators';

export default class MenuService implements IMenuServiceInterface {
  private menuRepository : IMenuRepository;

  constructor( iMenuRepository: IMenuRepository){
    this.menuRepository = iMenuRepository;
  }

  async addMenu({ items, date, meal }: IMenu): Promise<MsgAndMenu> {
    if (meal !== 'almoço' && meal !== 'janta') throw new Error ('Preencha a refeição com "almoço" ou "janta".');
    const existMealToSameDate: IMenu = await this.menuRepository.selectOne({ date, meal });
    if(existMealToSameDate) throw new Error (`Já existe um cardápio cadastrado para o(a) ${meal} da data informada.`);
    const listObjectIdItems: {id: number}[] = items?.map((item) => ({ id: item }));
    const createdMenuAndMessage: MsgAndMenu = await this.menuRepository.add({
      items: listObjectIdItems,
      date,
      meal,
    } as newMenu);
    return createdMenuAndMessage;
  }

  async getMany(data: MenuFilter): Promise<IMenu[]> {
    const menus: Menu[] = await this.menuRepository.getMany(data);
    return menus;
  }

  async getMenuById(menuId): Promise<Menu> {
    const menu: Menu = await this.menuRepository.selectOne({ id: menuId });
    return menu;
  }

  async updateMenu(items: number[], id: number): Promise<MsgAndMenu> {
    const menuExist: Menu = await this.menuRepository.selectOne({ id });
    if(!menuExist) throw new Error ('Menu não encontrado');
    const listObjectIdItems: {id: number}[] = items?.map((item) => ({ id: item }));
    const changedMenuAndMessage: MsgAndMenu = await this.menuRepository.update(listObjectIdItems, id);
    return changedMenuAndMessage;
  }

  async deleteMenu( id: number ): Promise<MsgAndMenu> {
    const menu: Menu = await this.menuRepository.selectOne({ id });
    if(!menu) throw new Error('Menu não encontrado');
    const deletedMenuAndMessage: MsgAndMenu = await this.menuRepository.delete(id);
    return deletedMenuAndMessage;
  }

  async getCurrentMenu() {
    const actualMoment = new Date();
    const minMomentToLunch = new Date(actualMoment.getFullYear(), actualMoment.getMonth(), actualMoment.getDate());
    const minMomentToDinner = new Date(minMomentToLunch);
    minMomentToDinner.setHours(15);
    return this.menuRepository.selectOne({
      date: minMomentToLunch,
      meal: actualMoment > minMomentToDinner ? 'janta' : 'almoço'
    });
  }
}
