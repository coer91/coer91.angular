import { Pipe, PipeTransform } from '@angular/core';
import { Dates } from 'coer91.tools';

@Pipe({ name: 'date', standalone: false })
export class DatePipe implements PipeTransform {

    transform(value: string | Date, format?: 'MDY' | 'DMY'): string {
        return Dates.ToFormatDate(value, format);
    }
}