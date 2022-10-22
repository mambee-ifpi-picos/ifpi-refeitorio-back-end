import  BaseRepository  from './base/BaseRepository';
import { Menu } from './base/models/MenuModel';

export default class MenuRepository extends BaseRepository {

  public async add(newMenu: Menu): Promise<Menu> {
    return super.getPrisma().menu.create({
      data: newMenu,
    });
  }

  public async  getAll(): Promise<Menu[]> {
    return super.getPrisma().menu.findMany({});
  }

}
