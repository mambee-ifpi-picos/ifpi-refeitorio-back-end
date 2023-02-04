import { Prisma, Menu } from '@prisma/client';
import  BaseRepository  from './base/BaseRepository';
import { MenuFilter, MsgAndMenu, newMenu } from './base/models/MenuModel';
import IMenuRepository from './interfaces/MenuRepositoryInterface';

export default class MenuRepository extends BaseRepository implements IMenuRepository {

  public async add(infosNewMenu: newMenu): Promise<MsgAndMenu> {
    const createdMenu: Menu = await super.getPrisma().menu.create({
      data: {
        meal: infosNewMenu.meal,
        date: infosNewMenu.date,
        items: {
          connect: infosNewMenu.items
        }
      },
    });
    const msg = 'Cadastro salvo com sucesso.';
    return { msg, menu: createdMenu };
  }

  public async getMany(data: MenuFilter): Promise<Menu[]> {
    return super.getPrisma().menu.findMany({
      where: {
        state: true,
        date: {
          lte: data.convertedFinalDate,
          gte: data.convertedInitialDate,
        },
      },
      include: {
        items: true
      }
    });
  }

  public async update(items: { id: number }[], id: number): Promise<MsgAndMenu> {
    const changedMenu: Menu = await super.getPrisma().menu.update({
      where: {
        id
      },
      data: {
        items: {
          set: items,
        }
      },
    });
    const msg = 'Alteração salva com sucesso';
    return { msg, menu: changedMenu };
  }

  async selectOne( where: Prisma.MenuWhereInput): Promise<Menu> {
    const result: Menu = await super.getPrisma().menu.findFirst({ where });
    return result;
  }

  async delete( id: number ): Promise<MsgAndMenu> {
    const deletedMenu: Menu = await super.getPrisma().menu.update({
      where: {
        id
      },
      data: {
        state: false
      }
    });
    const msg = 'Cardápio removido com sucesso';
    return { msg, menu: deletedMenu };
  }
}
