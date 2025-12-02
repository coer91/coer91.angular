import { Pipe, PipeTransform } from '@angular/core';
import { Numbers } from 'coer91.tools';

@Pipe({ name: 'currency', standalone: false })
export class CurrencyPipe implements PipeTransform {

    transform(value: string | number | null | undefined, symbol: string = '$', currency: string = ''): string {
        return Numbers.ToCurrency(value, symbol, currency);
    }
}