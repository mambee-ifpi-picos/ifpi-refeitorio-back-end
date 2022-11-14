/* global beforeAll afterAll describe test expect */
import request from 'supertest';
import app from '../../src/App';
import prisma from '../helpers/Index';

const API_MENU = '/menu';

beforeAll(async () => {
  const removeMenus = prisma.menu.deleteMany();
  await prisma.$transaction([removeMenus]);
});

afterAll(async () => {
  const removeMenus = prisma.menu.deleteMany();
  await prisma.$transaction([removeMenus]);
  await prisma.$disconnect();
});

describe('POST menu', () => {
  test('Create menu sucessfully', async () => {
    const newMenu = {
      date: '11/11/2011',
      meal: 'janta',
      items: 'arroz - carne - feijão - manga' 
    };
    const response = await request(app).post(API_MENU).send(newMenu);
    const menu = await prisma.menu.findFirst({
      where: {
        meal: newMenu.meal
      }
    });
    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.text)).toBe('Cadastro Salvo com Sucesso.');
    expect(menu.meal === newMenu.meal && menu.items === newMenu.items).toBeTruthy();
  });

  test('Create menu without all required fields', async () => {
    const newMenu = {
      date: '11/11/2011',
      meal: 'janta'
    };
    const response = await request(app).post(API_MENU).send(newMenu);
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.text)).toBe('Preencha todos os campos obrigatórios!');
  });
  
  test('Create menu for the same day and meal', async () => {
    const newMenu = {
      date: '11/11/2011',
      meal: 'janta',
      items: 'arroz - carne - feijão - manga' 
    };
    const response = await request(app).post(API_MENU).send(newMenu);
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.text)).toBe('Não é possível adicionar duas refeições para o mesmo horário no mesmo dia.');
  });
});

let menuId: string;
describe('GET menu', () => {
  test('Request menus (200)', async () => {
    const response = await request(app).get(API_MENU);
    const menus = await prisma.menu.findMany();
    menuId = String(menus[0].id);
    expect(response.statusCode).toBe(200);
    expect(menus.length === 1);
  });
});

describe('PUT menu', () => {
  test('Alter menu nonexistent', async () => {
    const response = await request(app).put(`${API_MENU}/${menuId + 1}`);
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.text)).toBe('Menu não encontrado');
  });

  test('Alteration in menu', async () => {
    const alterationInMenu = {
      date: '22/11/2011',
      meal: 'almoço'
    };
    const response = await request(app).put(`${API_MENU}/${menuId}`).send(alterationInMenu);
    const menu = await prisma.menu.findFirst({
      where: {
        meal: alterationInMenu.meal
      }
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.text)).toBe('Alteração Salva com Sucesso');
    expect(menu.meal === alterationInMenu.meal).toBeTruthy();
  });
});

describe('DELETE menu', () => {
  test('Delete menu nonexistent', async () => {
    const response = await request(app).delete(`${API_MENU}/${menuId + 1}`);
    const menus = await prisma.menu.findMany();
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.text)).toBe('Menu não encontrado');
    expect(menus.length === 1).toBeTruthy();
  });  

  test('Delete menu successfully', async () => {
    const response = await request(app).delete(`${API_MENU}/${menuId}`);
    const menus = await prisma.menu.findMany();
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.text)).toBe('Cardápio Removido com Sucesso');
    expect(menus.length === 0).toBeTruthy();
  });
});