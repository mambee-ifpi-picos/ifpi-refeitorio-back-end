import { Prisma } from '@prisma/client';
import { Menu } from '../base/models/MenuModel';

interface IMenuRepository {
    add(newMenu: Menu): Promise<string>;
    getAll(): Promise<Menu[]>;
    selectOne( where: Prisma.MenuWhereUniqueInput): Promise<Menu>;
    update({ meal, items, date }: Menu, id: number): Promise<string>;
    delete(id: number): Promise<string>;
}

export default  IMenuRepository;