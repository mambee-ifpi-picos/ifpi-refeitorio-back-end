import { Menu } from '@prisma/client';

export type IMenu = {
    items?: number[];
    date: string;
    meal: string;
};

export type MsgAndMenu = {
    menu: Menu;
    msg: string;
}

export type newMenu = {
    items: {id: number}[],
    date: string,
    meal: string
}

