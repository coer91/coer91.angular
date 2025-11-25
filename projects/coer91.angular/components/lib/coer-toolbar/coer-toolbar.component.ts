import { Component, output, input, computed } from '@angular/core';
import {  Tools, User }from 'coer91.tools';
import { IAppSettings, IMenuToolbar } from 'coer91.tools/interfaces';
declare const appSettings: IAppSettings;

@Component({
    selector: 'coer-toolbar',
    templateUrl: './coer-toolbar.component.html', 
    styleUrl: './coer-toolbar.component.scss', 
    standalone: false
})
export class CoerToolbar {       

    //Variables
    protected readonly _id = Tools.GetGuid("coer-toolbar"); 
    protected readonly _appSettings = appSettings;
    protected _isOpenMenu = false;
     
    //output 
    protected onClickToogle     = output<void>();
    protected onClickOptionMenu = output<IMenuToolbar>();

    //input 
    public userName            = input<string>(''); 
    public userTitle           = input<string>(''); 
    public menu                = input<IMenuToolbar[]>([]); 
    public showProfileMenu     = input<boolean>(true); 
    public preventProfileMenu  = input<boolean>(false); 
    public showPasswordMenu    = input<boolean>(true); 
    public preventPasswordMenu = input<boolean>(false);  
    public showLogOutMenu      = input<boolean>(true);  
    public preventLogOutMenu   = input<boolean>(false); 


    //
    protected _menu = computed<IMenuToolbar[]>(() => {
        return this.menu()
            .concat(this.showProfileMenu()  ? [{ label: 'Profile'        , preventDefault: this.preventProfileMenu() , icon: 'i91-user-fill'      }] : [])
            .concat(this.showPasswordMenu() ? [{ label: 'Change Password', preventDefault: this.preventPasswordMenu(), icon: 'i91-lock-fill'      }] : [])
            .concat(this.showLogOutMenu()   ? [{ label: 'Log Out'        , preventDefault: this.preventLogOutMenu()  , icon: 'i91-door-open-fill' }] : [])
    });
 
    /** */
    protected _SelectMenu(menu: IMenuToolbar | null) {
        if(menu) {
            if(Tools.IsNull(menu.preventDefault) || Tools.IsBooleanFalse(menu.preventDefault)) {
                switch(menu.label) {
                    case 'Profile': {
                        
                        break;
                    }
    
                    case 'Change Password': {

                        break;
                    }
    
                    case 'Log Out': {
                        User.LogOut();
                        break;
                    }
                }                        
            }

            this.onClickOptionMenu.emit(menu);
        }
    }
}