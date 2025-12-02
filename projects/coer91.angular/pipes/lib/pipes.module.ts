import { NgModule } from '@angular/core';

//Pipes 
import { CurrencyPipe      } from './currency.pipe';
import { DateTimePipe      } from './datetime.pipe';
import { DatePipe          } from './date.pipe';
import { HtmlPipe          } from './html.pipe';
import { NoImagePipe       } from './no-image.pipe';
import { NumericFormatPipe } from './numeric-format.pipe';
import { TimePipe          } from './time.pipe';

@NgModule({
    declarations: [
        CurrencyPipe,
        DateTimePipe,
        DatePipe,
        HtmlPipe,
        NoImagePipe,
        NumericFormatPipe,
        TimePipe
    ],
    exports: [
        CurrencyPipe,
        DateTimePipe,
        DatePipe,
        HtmlPipe,
        NoImagePipe,
        NumericFormatPipe,
        TimePipe
    ]
})
export class PipesModule { }