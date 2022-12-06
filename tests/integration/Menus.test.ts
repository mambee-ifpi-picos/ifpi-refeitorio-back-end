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

jest.setTimeout(1000 * 60 * 2);

describe('POST menu', () => {
  test('Create menus sucessfully', async () => {
    const days = [ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday' ];
    // eslint-disable-next-line no-restricted-syntax
    for(const day of days){
      const meals = [ 'almoço', 'janta' ];
      // eslint-disable-next-line no-restricted-syntax
      for (const meal of meals) {
        const newMenu = {
          day,
          meal,
          items: 'arroz - carne - feijão - manga' 
        };
        // eslint-disable-next-line no-await-in-loop
        const response = await request(app).post(API_MENU).send(newMenu);
        // eslint-disable-next-line no-await-in-loop
        expect(response.statusCode).toBe(201); 
      } 
    }
  });
});

let menuId: number;
describe('GET menu', () => {
  test('Request menus (200)', async () => {
    const response = await request(app).get(API_MENU);
    const menus = await prisma.menu.findMany();
    menuId = menus[menus.length - 1].id;
    expect(response.statusCode).toBe(200);
    expect(menus.length === 14);
  });
});

describe('PUT menu', () => {
  test('Alter menu nonexistent', async () => {
    const response = await request(app).put(`${API_MENU}/${menuId + 11}`);
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.text)).toBe('Menu não encontrado');
  });

  test('Alteration in items of menu to void', async () => {
    const alterationInMenu = {
      items: ''
    };
    const response = await request(app).put(`${API_MENU}/${menuId}`).send(alterationInMenu);
    const menu = await prisma.menu.findFirst({
      where: {
        items: alterationInMenu.items
      }
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.text).msg).toBe('Alteração salva com Sucesso');
    expect(menu.items === alterationInMenu.items).toBeTruthy();
  });

  test('Alteration in menu', async () => {
    const alterationInMenu = {
      items: 'feijão, arroz, carne desfiada'
    };
    const response = await request(app).put(`${API_MENU}/${menuId}`).send(alterationInMenu);
    const menu = await prisma.menu.findFirst({
      where: {
        items: alterationInMenu.items
      }
    });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.text).msg).toBe('Alteração salva com Sucesso');
    expect(menu.items === alterationInMenu.items).toBeTruthy();
  });
});

describe('DELETE menu', () => {
  test('Delete menu nonexistent', async () => {
    const response = await request(app).delete(`${API_MENU}/${menuId + 11}`);
    const menus = await prisma.menu.findMany();
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.text)).toBe('Menu não encontrado');
    expect(menus.length === 14).toBeTruthy();
  });  

  test('Delete menu successfully', async () => {
    const response = await request(app).delete(`${API_MENU}/${menuId}`);
    const menus = await prisma.menu.findMany();
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.text).msg).toBe('Cardápio removido com Sucesso');
    expect(menus.length === 13).toBeTruthy();
  });
});