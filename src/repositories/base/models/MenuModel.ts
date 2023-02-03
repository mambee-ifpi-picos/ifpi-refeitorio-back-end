import { Menu } from '@prisma/client';

export type IMenu = {
    items?: number[];
    date: string;
    meal: string;
};

export type MenuFilter = {
    id?: number;
    meal?: 'janta' | 'almoço'
    convertedInitialDate?: Date;
    convertedFinalDate?: Date;
    description?: string;
    state?: boolean;
}

export type MsgAndMenu = {
    menu: Menu;
    msg: string;
}

export type newMenu = {
    items: {id: number}[],
    date: string,
    meal: string
}
