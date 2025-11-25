import { NgModule } from '@angular/core';

//Pipes
import { HtmlPipe } from './html.pipe';
import { NoImagePipe } from './no-image.pipe';
import { NumericFormatPipe } from './numeric-format.pipe';

@NgModule({
    declarations: [
        HtmlPipe,
        NoImagePipe,
        NumericFormatPipe
    ],
    exports: [
        HtmlPipe,
        NoImagePipe,
        NumericFormatPipe
    ]
})
export class PipesModule { }