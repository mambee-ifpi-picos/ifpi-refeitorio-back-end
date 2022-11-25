import { Prisma } from '@prisma/client';
import  BaseRepository  from './base/BaseRepository';
import { Menu, MsgAndMenu } from './base/models/MenuModel';
import IMenuRepository from './interfaces/MenuRepositoryInterface';

export default class MenuRepository extends BaseRepository implements IMenuRepository {

  public async add(newMenu: Menu): Promise<MsgAndMenu> {
    const createdMenu = await super.getPrisma().menu.create({
      data: newMenu,
    });

    const msg = 'Cadastro Salvo com Sucesso.';

    return { msg, menu: createdMenu };
  }

  public async getAll(): Promise<Menu[]> {
    return super.getPrisma().menu.findMany({});
  }

  public async update({ meal, date, items }: Menu, id: number): Promise<MsgAndMenu> {
    const changedMenu = await super.getPrisma().menu.update({
      where: {
        id,
      },
      data: {
        meal,
        date,
        items,
      } as Menu,
    });

    const msg = 'Alteração Salva com Sucesso';

    return { msg, menu: changedMenu };
  }

  async selectOne( where: Prisma.MenuWhereInput): Promise<Menu> {
    const result = await super.getPrisma().menu.findFirst({ where });

    return result;
  }

  async delete( id: number ): Promise<MsgAndMenu> {
    const deletedMenu = await super.getPrisma().menu.delete({
      where: {
        id
      }
    });
    const msg = 'Cardápio Removido com Sucesso';
    return { msg, menu: deletedMenu };
  }
}
