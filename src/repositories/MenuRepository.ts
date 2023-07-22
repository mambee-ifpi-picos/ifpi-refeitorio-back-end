import { Prisma, Menu } from '@prisma/client';
import { MenuFilter, NewMenuRepository } from '../models/Menu';
import BaseRepository  from './base/BaseRepository';
import IMenuRepository from './interfaces/MenuRepositoryInterface';

export default class MenuRepository extends BaseRepository implements IMenuRepository {

  public async add(infosNewMenu: NewMenuRepository): Promise<Menu> {
    return super.getPrisma().menu.create({
      data: {
        meal: infosNewMenu.meal,
        date: infosNewMenu.date,
        items: {
          connect: infosNewMenu.items
        }
      },
    });
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

  public async update(items: { id: number }[], id: number): Promise<Menu> {
    return super.getPrisma().menu.update({
      where: {
        id
      },
      data: {
        items: {
          set: items,
        }
      },
    });
  }

  async selectOne(where: Prisma.MenuWhereInput): Promise<Menu> {
    return super.getPrisma().menu.findFirst({ where });
  }

  async delete(id: number): Promise<Menu> {
    return super.getPrisma().menu.update({
      where: {
        id
      },
      data: {
        state: false
      }
    });
  }
}
