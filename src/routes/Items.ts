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
    const { name } = req.body;
    if( !name ) throw new Error('Preencha todos os campos obrigatórios!');

    const createdItemAndMessage = await itemService.addItem({
      name
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

routes.delete('/:id', async ( req: Request, res: Response ) => {
  try{
    const { id } = req.params;
    const deletedItemAndMessage = await itemService.deleteItem( Number(id) );
    logger.info(`Operacao com sucesso: O usuario [email do usuario logado] excluiu o item [${deletedItemAndMessage}].`);
    return res.status(200).json(deletedItemAndMessage);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

routes.put('/:id', async (req: Request, res: Response ) => {
  try{
    const { id } = req.params;
    const { name } = req.body;
    const updatedItemAndMessage = await itemService.updateItem( Number(id), String(name) );
    logger.info(`Operacao com sucesso: O usuario [email do usuario logado] atualizou o nome do item [${updatedItemAndMessage}].`);
    return res.status(200).json(updatedItemAndMessage);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

export default routes;
