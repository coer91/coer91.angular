export interface IGridSelectBox {
    showInput: boolean;
    isDisabled?: boolean;
    isValid?: boolean;
    isInvalid?: boolean;
    placeholder?: string;
    displayProperty?: string;
    dataSource?: any[];
    openOnFocus?: boolean;
}