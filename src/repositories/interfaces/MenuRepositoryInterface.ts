import { Menu, Prisma } from '@prisma/client';
import { NewMenuRepository, MenuFilter } from '../../models/Menu';

interface IMenuRepository {
  add(infosNewMenu: NewMenuRepository): Promise<Menu>;
  getMany(data: MenuFilter): Promise<Menu[]>;
  selectOne(where: Prisma.MenuWhereInput): Promise<Menu>;
  update(items: {id: number}[], id: number): Promise<Menu>;
  delete(id: number): Promise<Menu>;
}

export default  IMenuRepository;