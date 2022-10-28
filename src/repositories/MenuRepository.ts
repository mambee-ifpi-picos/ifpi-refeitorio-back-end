import  BaseRepository  from './base/BaseRepository';
import { Menu } from './base/models/MenuModel';
import { IMenuRepository } from './interfaces/MenuRepositoryInterface';

export default class MenuRepository extends BaseRepository implements IMenuRepository {

  public async add(newMenu: Menu): Promise<string> {
    await super.getPrisma().menu.create({
      data: newMenu,
    });

    const msg = 'Cadastro Completo';

    return msg;
  }

  public async getAll(): Promise<Menu[]> {
    return super.getPrisma().menu.findMany({});
  }

}
