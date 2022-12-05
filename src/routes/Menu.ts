/* eslint-disable consistent-return */
import { Router, Request, Response } from 'express';
import pino from 'pino';
import MenuRepository from '../repositories/MenuRepository';
import { Menu } from '../repositories/base/models/MenuModel';
import MenuService from '../services/MenuService';
import IMenuServiceInterface from '../services/interfaces/MenuServiceInterface';

const routes = Router();
const logger = pino();
const menuService: IMenuServiceInterface = new MenuService(new MenuRepository());

routes.get('/', async (req: Request, res: Response) => {
    try {
      const menus = await menuService.getAll();
      logger.info('Operacao com sucesso: O usuario [email do usuario logado] consultou os cardapios.');
      return res.status(200).json(menus);
    } catch (error) {
      return res.status(404).json(error);
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
  
      const createdMenuAndMessage = await menuService.addMenu({
        items,
        date: dateConvertido,
        meal,
      } as Menu); 

      const menu = [createdMenuAndMessage.menu.items, createdMenuAndMessage.menu.date, createdMenuAndMessage.menu.meal];
      logger.info(`Operacao com sucesso: O usuario [email do usuario logado] registrou o cardapio [${menu[0]} | ${menu[1]} | ${menu[2]}].`);

      return res.status(201).json(createdMenuAndMessage.msg);
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

    const changedMenuAndMessage = await menuService.updateMenu({ meal, items, date: convertedDate }, Number(id));
    
    const menu = [changedMenuAndMessage.menu.items, changedMenuAndMessage.menu.date, changedMenuAndMessage.menu.meal];
    logger.info(`Operacao com sucesso: O usuario [email do usuario logado] alterou dados do cardapio [${menu[0]} | ${menu[1]} | ${menu[2]}].`);

    return res.status(200).json(changedMenuAndMessage.msg);

  } catch (error) {
    res.status(400).json(error.message);
  }
});

routes.delete('/:id', async ( req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedMenuAndMessage = await menuService.deleteMenu( Number(id));
    
    const menu = [deletedMenuAndMessage.menu.items, deletedMenuAndMessage.menu.date, deletedMenuAndMessage.menu.meal];
    logger.info(`Operacao com sucesso: O usuario [email do usuario logado] excluiu o cardapio [${menu[0]} | ${menu[1]} | ${menu[2]}].`);

    return res.status(200).json(deletedMenuAndMessage.msg);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

export default routes;