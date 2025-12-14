//Modules
import { NgModule } from '@angular/core';     
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'coer91.angular/components';
import { CoerAlert } from 'coer91.angular/tools';
import 'coer91.tools/extensions'; 

//Pages  
import { Coer91       } from './coer91/coer91.component';
import { CoerMenuPage } from './coer-menu/coer-menu.component';
import { HomePage     } from './home/home.component'; 

//Routes
export const ROUTES: any = [  
    { path: 'home', component: HomePage,     data: { activeKey: '' }},
    { path: 'menu', component: CoerMenuPage, data: { activeKey: '' }},
    { path: '**'  , redirectTo: 'home' }     
]; 

@NgModule({    
    imports: [
        RouterModule,
        ComponentsModule,
        CoerAlert
    ],
    declarations: [ 
        Coer91,
        CoerMenuPage,
        HomePage 
    ], 
    exports: [  
        Coer91
    ]
})
export class PagesModule { }