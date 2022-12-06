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
      logger.info('Operacao sem sucesso: O usuario [email do usuario logado] tentou consultar os cardapios.');
      return res.status(404).json(error.message);
    }
});

routes.post('/', async (req: Request, res: Response) => {
    try {
      const { items, day, meal } = req.body;
      if( !day || !meal ) throw new Error('Preencha todos os campos obrigatórios!');
      const createdMenuAndMessage = await menuService.addMenu({
        items,
        day,
        meal
      } as Menu); 
      const menu = [createdMenuAndMessage.menu.items, createdMenuAndMessage.menu.day, createdMenuAndMessage.menu.meal];
      logger.info(`Operacao com sucesso: O usuario [email do usuario logado] registrou o cardapio [${menu[0]} | ${menu[1]} | ${menu[2]}].`);
      return res.status(201).json(createdMenuAndMessage);
    } catch (error) {
      res.status(400).json(error.message);
    }
});

routes.put('/:id', async (req: Request, res: Response) => {
  try {
    const { items } = req.body;
    // console.log(meal, items, day);
    const { id } = req.params;
    const changedMenuAndMessage = await menuService.updateMenu({ items }, Number(id));
    const menu = [changedMenuAndMessage.menu.items, changedMenuAndMessage.menu.day, changedMenuAndMessage.menu.meal];
    logger.info(`Operacao com sucesso: O usuario [email do usuario logado] alterou dados do cardapio [${menu[0]} | ${menu[1]} | ${menu[2]}].`);
    return res.status(200).json(changedMenuAndMessage);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

routes.delete('/:id', async ( req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedMenuAndMessage = await menuService.deleteMenu( Number(id));
    const menu = [deletedMenuAndMessage.menu.items, deletedMenuAndMessage.menu.day, deletedMenuAndMessage.menu.meal];
    logger.info(`Operacao com sucesso: O usuario [email do usuario logado] excluiu o cardapio [${menu[0]} | ${menu[1]} | ${menu[2]}].`);
    return res.status(200).json(deletedMenuAndMessage);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

export default routes;