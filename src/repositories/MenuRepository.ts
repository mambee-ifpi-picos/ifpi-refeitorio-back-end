import { Prisma } from '@prisma/client';
import  BaseRepository  from './base/BaseRepository';
import { Menu, MsgAndMenu } from './base/models/MenuModel';
import IMenuRepository from './interfaces/MenuRepositoryInterface';

export default class MenuRepository extends BaseRepository implements IMenuRepository {

  public async add(newMenu: Menu): Promise<MsgAndMenu> {
    const createdMenu = await super.getPrisma().menu.create({
      data: newMenu,
    });
    const msg = 'Cadastro salvo com Sucesso.';
    return { msg, menu: createdMenu };
  }

  public async getAll(): Promise<Menu[]> {
    return super.getPrisma().menu.findMany({});
  }

  public async update({ items }: {items: string}, id: number): Promise<MsgAndMenu> {
    const changedMenu = await super.getPrisma().menu.update({
      where: {
        id
      },
      data: {
        items
      } as Menu,
    });
    const msg = 'Alteração salva com Sucesso';
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
    const msg = 'Cardápio removido com Sucesso';
    return { msg, menu: deletedMenu };
  }
}
