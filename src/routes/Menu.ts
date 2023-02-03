/* eslint-disable consistent-return */
import { Router, Request, Response } from 'express';
import pino from 'pino';
import verifyIfNotANumber from '../middleware/verifyIfNotANumber';
import MenuRepository from '../repositories/MenuRepository';
import { IMenu, MsgAndMenu } from '../repositories/base/models/MenuModel';
import MenuService from '../services/MenuService';
import IMenuServiceInterface from '../services/interfaces/MenuServiceInterface';

const routes = Router();
const logger = pino();
const menuService: IMenuServiceInterface = new MenuService(new MenuRepository());

routes.get('/', async (req: Request, res: Response) => {
    try {

      const { initialDate, finalDate } = req.query;

      let convertedInitialDate: Date | null;
      let convertedFinalDate: Date | null;
      if (initialDate && finalDate) {
        const stringInitialDate = String(initialDate);
        const stringFinalDate = String(initialDate);
        const smashInitialDate = stringInitialDate.split('-');
        const smashFinalDate = stringFinalDate.split('-');

        const initialDay = verifyIfNotANumber(smashInitialDate[2]);
        const initialMonth = verifyIfNotANumber(smashInitialDate[1]);
        const initialYear = verifyIfNotANumber(smashInitialDate[0]);
        const finalDay = verifyIfNotANumber(smashFinalDate[2]);
        const finalMonth = verifyIfNotANumber(smashFinalDate[1]);
        const finalYear = verifyIfNotANumber(smashFinalDate[0]);

        if (initialDay > 31 || initialMonth > 12 || finalDay > 31 || finalMonth > 12) throw new Error('Informe uma data válida.');

        convertedInitialDate = new Date(`${initialYear}/${initialMonth}/${initialDay}`);
        convertedFinalDate = new Date(`${finalYear}/${finalMonth}/${finalDay}`);
      }
      // mudar nome do metodo
      const menus: IMenu[] = await menuService.getAll({
        ...(convertedInitialDate && { convertedInitialDate }),
        ...(convertedFinalDate && { convertedFinalDate }),
      });
      
      logger.info('Operacao com sucesso: O usuario [email do usuario logado] consultou os cardapios.');
      return res.status(200).json(menus);
    } catch (error) {
      logger.info('Operacao sem sucesso: O usuario [email do usuario logado] tentou consultar os cardapios.');
      return res.status(404).json(error.message);
    }
});

routes.post('/', async (req: Request, res: Response) => {
    try {
      const { items, date, meal }: IMenu = req.body;
      if( !date || !meal ) throw new Error('Preencha todos os campos obrigatórios!');
      const createdMenuAndMessage = await menuService.addMenu({
        items,
        date,
        meal
      } as IMenu); 
      // const menu = [createdMenuAndMessage.menu.items, createdMenuAndMessage.menu.date, createdMenuAndMessage.menu.meal];
      // logger.info(`Operacao com sucesso: O usuario [email do usuario logado] registrou o cardapio [${menu[0]} | ${menu[1]} | ${menu[2]}].`);
      logger.info(`Operacao com sucesso: O usuario [email do usuario logado] registrou o cardapio: ${createdMenuAndMessage.menu}`);
      return res.status(201).json(createdMenuAndMessage);
    } catch (error) {
      res.status(400).json(error.message);
    }
});

routes.put('/:id', async (req: Request, res: Response) => {
  try {
    const { items } = req.body;
    const { id } = req.params;
    const changedMenuAndMessage = await menuService.updateMenu(items, Number(id));
    /* const menu = [changedMenuAndMessage.menu.items, changedMenuAndMessage.menu.date, changedMenuAndMessage.menu.meal];
    logger.info(`Operacao com sucesso: O usuario [email do usuario logado] alterou dados do cardapio [${menu[0]} | ${menu[1]} | ${menu[2]}].`); */
    logger.info(`Operacao com sucesso: O usuario [email do usuario logado] alterou os dados do cardapio: ${changedMenuAndMessage.menu}`);
    return res.status(200).json(changedMenuAndMessage);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

routes.delete('/:id', async ( req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedMenuAndMessage: MsgAndMenu = await menuService.deleteMenu(Number(id));
    /* const menu = [deletedMenuAndMessage.menu.items, deletedMenuAndMessage.menu.date, deletedMenuAndMessage.menu.meal];
    logger.info(`Operacao com sucesso: O usuario [email do usuario logado] excluiu o cardapio [${menu[0]} | ${menu[1]} | ${menu[2]}].`); */
    logger.info(`Operacao com sucesso: O usuario [email do usuario logado] excluiu o cardapio: ${deletedMenuAndMessage.menu}`);
    return res.status(200).json(deletedMenuAndMessage);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

export default routes;