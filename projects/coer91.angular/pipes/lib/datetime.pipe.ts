import { Pipe, PipeTransform } from '@angular/core';
import { Dates } from 'coer91.tools';

@Pipe({ name: 'datetime', standalone: false })
export class DateTimePipe implements PipeTransform {

    transform(value: string | Date, ampm: boolean = false, format?: 'MDY' | 'DMY'): string {
        return Dates.ToFormatDateTime(value, ampm, format);
    }
}