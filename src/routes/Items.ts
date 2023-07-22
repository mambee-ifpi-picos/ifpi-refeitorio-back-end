import { Router, Request, Response } from 'express';
import pino from 'pino';
import auth from '../middleware/auth';
import isAdmin from '../middleware/isAdmin';
import ItemsRepository from '../repositories/ItemsRepository';
import ItemsService from '../services/ItemsService';
import IItemsServiceInterface from '../services/interfaces/ItemsServiceInterface';

const routes = Router();
const logger = pino();
const itemService: IItemsServiceInterface = new ItemsService(new ItemsRepository());   

routes.post('/', auth, isAdmin,  async (req: Request, res: Response) => {
  try {
    const { name }: { name: string } = req.body;
    if( !name ) throw new Error('Preencha todos os campos obrigatórios!');

    const createdItem = await itemService.addItem({
      name
    });     
    return res.status(201).json({
      data: createdItem,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

routes.get('/', auth, isAdmin, async (req: Request, res: Response) => {
  try {
    const items = await itemService.getAll();
    logger.info('Operacao com sucesso: O usuario [email do usuario logado] consultou os itens.');
    return res.status(200).json({
      data: items
    });
  } catch (error) {
    logger.info('Operacao sem sucesso: O usuario [email do usuario logado] tentou consultar os itens.');
    return res.status(404).json({
      error: error.message
    });
  }
});

routes.delete('/:id', auth, isAdmin, async (req: Request, res: Response) => {
  try{
    const { id } = req.params;
    const deletedItem = await itemService.deleteItem( Number(id) );
    logger.info(`Operacao com sucesso: O usuario [email do usuario logado] excluiu o item [${deletedItem}].`);
    return res.status(200).json({
      data: deletedItem
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

routes.put('/:id', auth, isAdmin, async (req: Request, res: Response ) => {
  try{
    const { id } = req.params;
    const { name } = req.body;
    const updatedItem = await itemService.updateItem( Number(id), String(name) );
    logger.info(`Operacao com sucesso: O usuario [email do usuario logado] atualizou o nome do item [${updatedItem}].`);
    return res.status(200).json({
      data: updatedItem
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

export default routes;
