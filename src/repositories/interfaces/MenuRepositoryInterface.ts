import { Prisma } from '@prisma/client';
import { Menu } from '../base/models/MenuModel';

export interface IMenuRepository {
    add(newMenu: Menu): Promise<string>;
    getAll(): Promise<Menu[]>;
    selectOne( where: Prisma.MenuWhereUniqueInput): Promise<Menu>;
    update({ snack, items, date }: Menu, id: number): Promise<Menu>;
    delete(id: number): Promise<string>;
}