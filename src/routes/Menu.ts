/* eslint-disable consistent-return */
import { Router, Request, Response } from 'express';
import MenuRepository from '../repositories/MenuRepository';
import { Menu } from '../repositories/base/models/MenuModel';
import MenuService from '../services/MenuService';
import IMenuServiceInterface from '../services/interfaces/MenuServiceInterface';

const routes = Router();
const menuService: IMenuServiceInterface = new MenuService(new MenuRepository());

routes.get('/', async (req: Request, res: Response) => {
    try {

      const menus = await menuService.getAll();

      return res.status(200).json(menus);
    
    } catch (error) {
      return res.status(404).send(error);
    }
});

routes.post('/', async (req: Request, res: Response) => {
    try {
      const { items, date, meal } = req.body;
      
      if( !items || !date || !meal ) throw new Error('Preencha todos os campos obrigatórios!');
      const smashDate = date.split('/');
      
      const day = smashDate[0];
      const month = smashDate[1];
      const year = smashDate[2];
      const dateConvertido = new Date( `${year}/${month}/${day}`);
  
      const msg = await menuService.addMenu({
        items,
        date: dateConvertido,
        meal,
      } as Menu);

      return res.status(201).send(msg);
    } catch (error) {
      res.status(400).json(error.message);
    }
  });

  routes.put('/:id', async (req: Request, res: Response) => {
    try {
      const { meal, items, date } = req.body;
      const { id } = req.params;
  
      let convertedDate: Date | null;
      if(date){
        const smashDate = date.split('/');

        const day = smashDate[0];
        const month = smashDate[1];
        const year = smashDate[2];

        convertedDate = new Date( `${year}/${month}/${day}`);
      }
  
      const msg = await menuService.updateMenu({ meal, items, date: convertedDate }, Number(id));


      return res.status(200).json(msg);
  
    } catch (error) {
      res.status(400).json(error.message);
    }
  });
  
  routes.delete('/:id', async ( req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { msg } = await menuService.deleteMenu( Number(id));

      return res.status(200).json(msg);
    } catch (error) {
      res.status(400).end(error.message);
    }
  });

export default routes;
