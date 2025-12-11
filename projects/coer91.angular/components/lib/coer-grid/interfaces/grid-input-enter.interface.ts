export interface IGridInputEnter<T> {
    id: string;
    input: 'coerSearch' | 'coerSwitch' | 'coerTextbox' | 'coerNumberbox' | 'coerSelectbox' | 'coerDatebox';
    row?: T;
    value: any;
}