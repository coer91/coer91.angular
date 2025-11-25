export interface IGridInputEnter<T> {
    id: string;
    input: 'coer-search' | 'coer-textbox' | 'coer-numberbox' | 'coer-selectbox';
    row?: T;
    value: any;
}