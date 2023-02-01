import { Menu } from '@prisma/client';
import { IMenu, MsgAndMenu, newMenu } from '../repositories/base/models/MenuModel';
import IMenuRepository from '../repositories/interfaces/MenuRepositoryInterface';
import IMenuServiceInterface from './interfaces/MenuServiceInterface';

export default class MenuService implements IMenuServiceInterface {
  private menuRepository : IMenuRepository;

  constructor( iMenuRepository: IMenuRepository){
    this.menuRepository = iMenuRepository;
  }

  async addMenu({ items, date, meal }: IMenu): Promise<MsgAndMenu> {
    if (meal !== 'almoço' && meal !== 'janta') throw new Error ('Preencha a refeição com "almoço" ou "janta".');
    const existMealToSameDate: IMenu = await this.menuRepository.selectOne({ date, meal });
    if(existMealToSameDate) throw new Error ('Não é possível adicionar duas refeições para o mesmo horário no mesmo dia.');
    const listObjectIdItems: {id: number}[] = items?.map((item) => ({ id: item }));
    const createdMenuAndMessage: MsgAndMenu = await this.menuRepository.add({
      items: listObjectIdItems,
      date,
      meal,
    } as newMenu);
    return createdMenuAndMessage;
  }

  async getAll(): Promise<IMenu[]> {
    const menus: Menu[] = await this.menuRepository.getAll();
    return menus;
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
}
