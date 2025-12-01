import { Pipe, PipeTransform } from '@angular/core';
import { Numbers } from 'coer91.tools';

@Pipe({ name: 'numericFormat', standalone: false })
export class NumericFormatPipe implements PipeTransform {

    transform(value: string | number | null | undefined, decimals: number = 0): string {
        return Numbers.ToNumericFormat(value, decimals);
    }
}