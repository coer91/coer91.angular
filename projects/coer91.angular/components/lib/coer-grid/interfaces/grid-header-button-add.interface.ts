import { IGridHeaderButton } from "./grid-header-button.interface";

export interface IGridHeaderButtonAdd extends IGridHeaderButton {  
    addTo?: 'START' | 'END';
    preventDefault?: boolean;
}