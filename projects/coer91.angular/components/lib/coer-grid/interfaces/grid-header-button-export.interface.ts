import { IGridHeaderButton } from "./grid-header-button.interface";

export interface IGridHeaderButtonExport extends IGridHeaderButton { 
    fileName?: string;
    onlyColumnFiltered?: boolean;
    onlyRowFiltered?: boolean;
    onlySelectedItem?: boolean;
    preventDefault?: boolean;
}