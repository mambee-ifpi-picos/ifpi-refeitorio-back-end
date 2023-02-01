import { Menu, Prisma } from '@prisma/client';
import { newMenu, MsgAndMenu } from '../base/models/MenuModel';

interface IMenuRepository {
    add(infosNewMenu: newMenu): Promise<MsgAndMenu>;
    getAll(): Promise<Menu[]>;
    selectOne(where: Prisma.MenuWhereInput): Promise<Menu>;
    update(items: {id: number}[], id: number): Promise<MsgAndMenu>;
    delete(id: number): Promise<MsgAndMenu>;
}

export default  IMenuRepository;