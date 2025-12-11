import { Directive, input, TemplateRef, WritableSignal } from "@angular/core";

export interface ICoerRef {
    template: TemplateRef<any>;
    coerRef: WritableSignal<string>;
    title: WritableSignal<string>;
    icon: WritableSignal<string>;
    isReadonly: WritableSignal<boolean>;
    show: WritableSignal<boolean>;
    tooltip: WritableSignal<string>;
}

@Directive({
    selector: '[templateRef]',
    standalone: false
})
export class ElementRefDirective {

    //Inputs
    public templateRef = input<string>('');
    public title       = input<string>('');
    public icon        = input<string>('');
    public isReadonly  = input<boolean>(false);
    public show        = input<boolean>(true);
    public tooltip     = input<string>('');

    constructor(public template: TemplateRef<any>) { }
}  