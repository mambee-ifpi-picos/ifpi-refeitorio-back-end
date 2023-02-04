import { Menu, Prisma } from '@prisma/client';
import { newMenu, MsgAndMenu, MenuFilter } from '../base/models/MenuModel';

interface IMenuRepository {
    add(infosNewMenu: newMenu): Promise<MsgAndMenu>;
    getMany(data: MenuFilter): Promise<Menu[]>;
    selectOne(where: Prisma.MenuWhereInput): Promise<Menu>;
    update(items: {id: number}[], id: number): Promise<MsgAndMenu>;
    delete(id: number): Promise<MsgAndMenu>;
}

export default  IMenuRepository;