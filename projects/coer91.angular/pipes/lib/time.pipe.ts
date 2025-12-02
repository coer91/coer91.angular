import { Pipe, PipeTransform } from '@angular/core';
import { Dates } from 'coer91.tools';

@Pipe({ name: 'time', standalone: false })
export class TimePipe implements PipeTransform {

    transform(value: string | Date, ampm: boolean = false): string {
        return Dates.ToFormatTime(value, ampm);
    }
}