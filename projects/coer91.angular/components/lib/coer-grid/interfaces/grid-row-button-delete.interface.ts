import { IGridRowButton } from "./grid-row-button.interface";

export interface IGridRowButtonDelete<T> extends IGridRowButton<T> {
    showAlert?: boolean;
}