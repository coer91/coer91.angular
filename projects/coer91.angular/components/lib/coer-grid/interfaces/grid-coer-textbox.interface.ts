export interface IGridTextBox {
    showInput: boolean;
    isReadonly?: boolean;
    isValid?: boolean;
    isInvalid?: boolean;
    selectOnFocus?: boolean;
    placeholder?: string;
    textPosition?: 'left' | 'center' | 'right';
    minLength?: number;
    maxLength?: number;
}