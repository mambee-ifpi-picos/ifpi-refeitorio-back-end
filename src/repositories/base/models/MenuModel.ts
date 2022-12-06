import { Days } from '@prisma/client';

export type Menu = {
    items: string;
    day: Days;
    meal: string;
};

export type MsgAndMenu = {
    menu: Menu;
    msg: string;
}