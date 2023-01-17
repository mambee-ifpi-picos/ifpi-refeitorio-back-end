import { Router, Request, Response } from 'express';
import pino from 'pino';
import verifyIfNotANumber from '../middleware/verifyIfNotANumber';
import ItemsRepository from '../repositories/ItemsRepository';
import { Item } from '../repositories/base/models/ItemModel';
import ItemsService from '../services/ItemsService';
import IItemsServiceInterface from '../services/interfaces/ItemsServiceInterface';

const routes = Router();
const logger = pino();
const itemService: IItemsServiceInterface = new ItemsService(new ItemsRepository());   

routes.post('/', async (req: Request, res: Response) => {
    try {
      const { name, date } = req.body;
      if( !date || !name ) throw new Error('Preencha todos os campos obrigatórios!');

      // changing the data structure
      const smashDate = date.split('-');

      const day = verifyIfNotANumber(smashDate[2]);
      const month = verifyIfNotANumber(smashDate[1]);
      const year = verifyIfNotANumber(smashDate[0]);

      if (day > 31 || month > 12) throw new Error('Informe uma data válida.');

      const creationDate = new Date(`${year}/${month}/${day}`);
      // changing the data structure - fim

      const createdItemAndMessage = await itemService.addItem({
        name,
        creationDate,
      } as Item); 

      const item = [createdItemAndMessage.item.name, createdItemAndMessage.item.creationDate];

      logger.info(`Operacao com sucesso: O usuario [email do usuario logado] registrou o item ${item[0]} criado na data ${item[1]}.`);
      
      return res.status(201).json(createdItemAndMessage);
    } catch (error) {
      return res.status(400).json(error.message);
    }
});

routes.get('/', async (req: Request, res: Response) => {
  try {
    const items = await itemService.getAll();
    logger.info('Operacao com sucesso: O usuario [email do usuario logado] consultou os itens.');
    return res.status(200).json(items);
  } catch (error) {
    logger.info('Operacao sem sucesso: O usuario [email do usuario logado] tentou consultar os itens.');
    return res.status(404).json(error.message);
  }
});

export default routes;
