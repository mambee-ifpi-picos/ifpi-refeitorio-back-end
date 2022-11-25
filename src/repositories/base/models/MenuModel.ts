export type Menu = {
    items: string;
    date: Date;
    meal: string;
};

export type MsgAndMenu = {
    menu: Menu;
    msg: string;
}