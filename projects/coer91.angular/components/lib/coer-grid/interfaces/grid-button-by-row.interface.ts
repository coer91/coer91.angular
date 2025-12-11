import { IGridItem } from "./grid-item.interface";

export interface IGridButtonByRow<T> {
    showDeleteButton?:   boolean | ((item: IGridItem<T>) => boolean);
    showEditButton?:     boolean | ((item: IGridItem<T>) => boolean);
    showModalButton?:    boolean | ((item: IGridItem<T>) => boolean);
    showGoButton?:       boolean | ((item: IGridItem<T>) => boolean);
    deleteButtonColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark';
    editButtonColor?:   'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark';
    modalButtonColor?:  'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark';
    goButtonColor?:     'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark'; 
}