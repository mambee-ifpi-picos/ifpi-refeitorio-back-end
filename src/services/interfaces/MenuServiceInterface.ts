import { MenuFilter, Menu, NewMenu } from '../../models/Menu';

interface IMenuServiceInterface {
  addMenu({ items, date, meal }: NewMenu): Promise<Menu>;
  getMany(data: MenuFilter): Promise<Menu[]>;
  updateMenu(items: number[], id: number): Promise<Menu>;
  deleteMenu(id: number): Promise<Menu>;
}

export default IMenuServiceInterface;