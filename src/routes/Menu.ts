import { Router, Request, Response } from 'express';
import { Menu } from '../repositories/base/models/MenuModel'
import MenuRepository from '../repositories/MenuRepository';

const routes = Router();
const menuRepository = new MenuRepository();

//CRIAR TABELA MENU NO BANCO DE DADOS

routes.get('/', async (res: Response, req: Request) => {
    try {
  
        return res.status(200);
    
      } catch (error: any) {
        res.status(400).json(error.message);
      }
});

routes.post("/", async (req: Request, res: Response) => {
    try {
      const { items, date, snack } = req.body;
  
      await menuRepository.add({
        items,
        date,
        snack,
      } as Menu);
      return res.status(201).send("cadastro completo");
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  });

  routes.put("/:id", async (req: Request, res: Response) => {
    try {
  
      return res.status(200);
  
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  });
  
  routes.delete("/:id", async (req: Request, res: Response) => {
    try {
      
      res.status(200);

    } catch (error) {
      res.status(400).end(error);
    }
  
  });
  
  

export default routes;
