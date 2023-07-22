import { Router, Request, Response } from 'express';
import pino from 'pino';
import auth from '../middleware/auth';
import isAdmin from '../middleware/isAdmin';
import { NewMenu, Menu } from '../models/Menu';
import MenuRepository from '../repositories/MenuRepository';
import MenuService from '../services/MenuService';
import IMenuServiceInterface from '../services/interfaces/MenuServiceInterface';
import verifyIfNotANumber from '../utils/verifyIfNotANumber';

const routes = Router();
const logger = pino();

const menuService: IMenuServiceInterface = new MenuService(new MenuRepository());

routes.get('/', auth, async (req: Request, res: Response) => {
  try {

    const { initialDate, finalDate } = req.query;

    let convertedInitialDate: Date | null;
    let convertedFinalDate: Date | null;
    if (initialDate && finalDate) {
      const stringInitialDate = String(initialDate);
      const stringFinalDate = String(finalDate);
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

    const menus: Menu[] = await menuService.getMany({
      ...(convertedInitialDate && { convertedInitialDate }),
      ...(convertedFinalDate && { convertedFinalDate }),
    });
    
    logger.info('Operacao com sucesso: O usuario [email do usuario logado] consultou os cardapios.');
    return res.status(200).json({
      data: menus
    });
  } catch (error) {
    // logger.info('Operacao sem sucesso: O usuario [email do usuario logado] tentou consultar os cardapios.');
    return res.status(404).json({
      error: error.message
    });
  }
});

routes.post('/', auth, isAdmin, async (req: Request, res: Response) => {
  try {
    const { items, date, meal }: NewMenu = req.body;
    if( !date || !meal ) throw new Error('Preencha todos os campos obrigatórios!');

    const stringDate = String(date);
    const smashDate = stringDate.split('-');

    const day = verifyIfNotANumber(smashDate[2]);
    const month = verifyIfNotANumber(smashDate[1]);
    const year = verifyIfNotANumber(smashDate[0]);

    if (day > 31 || month > 12) throw new Error('Informe uma data válida.');

    const convertedDate = new Date(`${year}/${month}/${day}`);
    
    const createdMenu = await menuService.addMenu({
      items,
      date: convertedDate,
      meal
    } as NewMenu);
    // const menu = [createdMenu.menu.items, createdMenu.menu.date, createdMenu.menu.meal];
    // logger.info(`Operacao com sucesso: O usuario [email do usuario logado] registrou o cardapio [${menu[0]} | ${menu[1]} | ${menu[2]}].`);
    logger.info(`Operacao com sucesso: O usuario [email do usuario logado] registrou o cardapio: ${createdMenu}`);
    return res.status(201).json({
      data: createdMenu
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

routes.put('/:id', auth, isAdmin,  async (req: Request, res: Response) => {
  try {
    const { items }: { items: number[] } = req.body;
    const { id } = req.params;
    const changedMenu = await menuService.updateMenu(items, Number(id));
    /* const menu = [changedMenu.menu.items, changedMenu.menu.date, changedMenu.menu.meal];
    logger.info(`Operacao com sucesso: O usuario [email do usuario logado] alterou dados do cardapio [${menu[0]} | ${menu[1]} | ${menu[2]}].`); */
    logger.info(`Operacao com sucesso: O usuario [email do usuario logado] alterou os dados do cardapio: ${changedMenu}`);
    return res.status(200).json({
      data: changedMenu
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

routes.delete('/:id', auth, isAdmin,  async ( req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedMenu = await menuService.deleteMenu(Number(id));
    /* const menu = [deletedMenu.menu.items, deletedMenu.menu.date, deletedMenu.menu.meal];
    logger.info(`Operacao com sucesso: O usuario [email do usuario logado] excluiu o cardapio [${menu[0]} | ${menu[1]} | ${menu[2]}].`); */
    logger.info(`Operacao com sucesso: O usuario [email do usuario logado] excluiu o cardapio: ${deletedMenu}`);
    return res.status(200).json({
      data: deletedMenu
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

export default routes;