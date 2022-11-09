import { Prisma } from '@prisma/client';
import  BaseRepository  from './base/BaseRepository';
import { Menu } from './base/models/MenuModel';
import IMenuRepository from './interfaces/MenuRepositoryInterface';

export default class MenuRepository extends BaseRepository implements IMenuRepository {

  public async add(newMenu: Menu): Promise<string> {
    await super.getPrisma().menu.create({
      data: newMenu,
    });

    const msg = 'Cadastro Salvo com Sucesso.';

    return msg;
  }

  public async getAll(): Promise<Menu[]> {
    return super.getPrisma().menu.findMany({});
  }

  public async update({ snack, date, items }: Menu, id: number): Promise<string> {
    await super.getPrisma().menu.update({
      where: {
        id,
      },
      data: {
        snack,
        date,
        items,
      } as Menu,
    });

    const msg = 'Alteração Sava com Sucesso';

    return msg;
  }

  async selectOne( where: Prisma.MenuWhereUniqueInput): Promise<Menu> {
    const result = await super.getPrisma().menu.findUnique({ where });

    return result;
  }

  async delete( id: number ): Promise<string> {
    const result = await super.getPrisma().menu.delete({
      where: {
        id
      }
    });
    const msg = 'Cardápio Removido com Sucesso';
    return msg;
  }
}
