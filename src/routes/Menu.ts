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

      console.log('O usuário ' + '[email do usuário logado]' + ' consultou os cardápios '+ menus)

      return res.status(200).json(menus);
    
    } catch (error) {
      return res.status(404).send(error);
    }
});

routes.post('/', async (req: Request, res: Response) => {
    try {
      const { items, date, snack } = req.body;
      
      if( !items || !date || !snack ) throw new Error('Preencha todos os campos obrigatórios!');

      const smashDate = date.split('/');
      
      const day = smashDate[0];
      const month = smashDate[1];
      const year = smashDate[2];

      const dateConvertido = new Date( year + '/' + month + '/' + day );
  
      const msg = await menuService.addMenu({
        items,
        date: dateConvertido,
        snack,
      } as Menu);

      console.log('O usuário ' + '[email do usuário logado]' + ' registrou o cardápio '+ [items, date, snack])

      return res.status(201).send(msg);
    } catch (error) {
      res.status(400).json(error.message);
    }
  });

  routes.put('/:id', async (req: Request, res: Response) => {
    try {
      const { snack, items, date } = req.body;
      const { id } = req.params;

      const dateConvertido = new Date(date);
  
      const msg = await menuService.updateMenu({ snack, items, date: dateConvertido }, Number(id));

      console.log('O usuário ' + '[email do usuário logado]' + ' alterou dados do cardápio '+ [items, date, snack])

      return res.status(200).json(msg);
  
    } catch (error) {
      res.status(400).json(error.message);
    }
  });
  
  routes.delete('/:id', async ( req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { msg, menu } = await menuService.deleteMenu( Number(id));

      console.log('O usuário ' + '[email do usuário logado]' + ' excluiu o cardápio '+ menu)

      return res.status(200).json(msg);
    } catch (error) {
      res.status(400).end(error.message);
    }
  });

export default routes;
