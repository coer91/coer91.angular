import { IGridItem } from "./grid-item.interface";

export interface IGridRowButton<T> {
    show?:   boolean | ((item: IGridItem<T>) => boolean); 
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark' | 'light'; 
    preventDefault?: boolean;
}