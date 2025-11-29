import { NgModule } from '@angular/core';     
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@library/components';

//Pages  
import { HomePage } from './home/home.component'; 
import { CoerMenuPage } from './coer-menu/coer-menu.component';

export const ROUTES: any = [  
    { path: 'home',         component: HomePage,     data: { activeKey: '' }},
    { path: 'menu', component: CoerMenuPage, data: { activeKey: '' }},
    { path: '**', redirectTo: 'home' }     
];

@NgModule({    
    imports: [
        RouterModule,
        ComponentsModule,        
    ],
    declarations: [ 
        HomePage,
        CoerMenuPage
    ],
    exports: [  
        HomePage 
    ]
})
export class PagesModule { }