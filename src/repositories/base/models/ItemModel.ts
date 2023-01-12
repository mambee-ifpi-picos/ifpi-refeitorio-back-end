export type Item = {
    name: string;
    creationDate: Date;
    active?: boolean;
    id?: number;
}

export type MsgAndItem = {
    item: Item;
    msg: string;
}