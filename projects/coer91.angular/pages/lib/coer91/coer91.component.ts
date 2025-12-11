import { Component, input, OnDestroy, output, viewChild } from '@angular/core'; 
import { ILoginResponse, IMenu, IMenuToolbar } from 'coer91.tools/interfaces'; 
import { breakpointSIGNAL } from 'coer91.angular/signals';
import { Screen } from 'coer91.tools';
import { Subscription } from 'rxjs';
import { CoerSidenav, CoerToolbar } from 'coer91.angular/components';

@Component({
    selector: 'coer91',
    templateUrl: './coer91.component.html', 
    styleUrl: './coer91.component.scss', 
    standalone: false
})
export class Coer91 implements OnDestroy {   

    //Elements
    protected readonly _toolbar = viewChild<CoerToolbar>('toolbar');
    protected readonly _sidenav = viewChild<CoerSidenav>('sidenav');

    //Variables
    protected readonly _size$!: Subscription;
    protected readonly _btnBrowser$!: Subscription;    

    //Inputs
    public readonly user        = input<ILoginResponse | null>(null);
    public readonly navigation  = input<IMenu[]>([]);
    
    //Inputs Toolbar
    public readonly toolbarMenu         = input<IMenuToolbar[]>([]);
    public readonly showProfileMenu     = input<boolean>(true); 
    public readonly preventProfileMenu  = input<boolean>(false); 
    public readonly showPasswordMenu    = input<boolean>(true); 
    public readonly preventPasswordMenu = input<boolean>(false);  
    public readonly showLogOutMenu      = input<boolean>(true);  
    public readonly preventLogOutMenu   = input<boolean>(false); 

    //output
    protected readonly onUpdateRole      = output<string>();
    protected readonly onUpdatePassword  = output<string>();
    protected readonly onClickOptionMenu = output<IMenuToolbar>();
 
    constructor() {     
        this._size$ = Screen.Resize.subscribe(size => breakpointSIGNAL.set(size.breakpoint));
        this._btnBrowser$ = Screen.BackButtonBrowser.subscribe(target => console.log(target));
    }


    //OnDestroy
    ngOnDestroy() {
        this._size$.unsubscribe(); 
        this._btnBrowser$.unsubscribe(); 
    } 


    /** */
    protected _ClickOptionMenu(menu: IMenuToolbar) {
        if(menu.label.equals('Log Out')) {
            this._sidenav()?.ResetSelected();
        }

        this.onClickOptionMenu.emit(menu);        
    } 


    /** */
    public CloseModal() {
        this._toolbar()?.CloseModal();            
    } 
}