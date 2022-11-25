import { Menu, MsgAndMenu } from '../repositories/base/models/MenuModel';
import IMenuRepository from '../repositories/interfaces/MenuRepositoryInterface';
import IMenuServiceInterface from './interfaces/MenuServiceInterface';

export default class MenuService implements IMenuServiceInterface {
  private  menuRepository : IMenuRepository;

  constructor( iMenuRepository: IMenuRepository){
    this.menuRepository = iMenuRepository;
  }

  async addMenu({ items, date, meal }: Menu): Promise<MsgAndMenu> {

    if (meal !== 'almoço' && meal !== 'janta') throw new Error ('Preencha a refeição com "almoço" ou "janta".');
    const existMealToSameDate = await this.menuRepository.selectOne({ date, meal });
    if(existMealToSameDate) throw new Error ('Não é possível adicionar duas refeições para o mesmo horário no mesmo dia.');

    const createdMenuAndMessage = await this.menuRepository.add({
      items,
      date,
      meal,
    } as Menu);

    return createdMenuAndMessage;
  }

  async getAll(): Promise<Menu[]> {
    const menus = await this.menuRepository.getAll();
    return menus;
  }

  async updateMenu(menu: Menu, id: number): Promise<MsgAndMenu> {
    const userExist = await this.menuRepository.selectOne({ id });

    if(!userExist) throw new Error ('Menu não encontrado');

    const changedMenuAndMessage = await this.menuRepository.update(menu, id);

    return changedMenuAndMessage;
  }

  async deleteMenu( id: number ): Promise<MsgAndMenu> {
    const menu = await this.menuRepository.selectOne({ id });

    if(!menu) throw new Error( 'Menu não encontrado' );

    const deletedMenuAndMessage = await this.menuRepository.delete(id);

    return deletedMenuAndMessage;
  }
}
