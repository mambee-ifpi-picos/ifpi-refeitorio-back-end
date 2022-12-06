import { Prisma } from '@prisma/client';
import { Menu, MsgAndMenu } from '../base/models/MenuModel';

interface IMenuRepository {
    add(newMenu: Menu): Promise<MsgAndMenu>;
    getAll(): Promise<Menu[]>;
    selectOne( where: Prisma.MenuWhereInput): Promise<Menu>;
    update({ items }: { items: string }, id: number): Promise<MsgAndMenu>;
    delete(id: number): Promise<MsgAndMenu>;
}

export default  IMenuRepository;