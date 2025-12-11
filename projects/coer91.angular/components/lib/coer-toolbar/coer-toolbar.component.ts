import { Component, output, input, computed, viewChild, effect, EffectRef, OnDestroy } from '@angular/core';
import { IAppSettings, ILoginResponse, IMenuToolbar, IOption } from 'coer91.tools/interfaces';
import { CoerModal } from '../coer-modal/coer-modal.component';
import { isLoadingSIGNAL, breakpointSIGNAL } from 'coer91.angular/signals';
import {  Tools, User }from 'coer91.tools'; 
declare const appSettings: IAppSettings;

@Component({
    selector: 'coer-toolbar',
    templateUrl: './coer-toolbar.component.html', 
    styleUrl: './coer-toolbar.component.scss', 
    standalone: false
})
export class CoerToolbar implements OnDestroy {   
    
    //Elements
    protected readonly _modalUser = viewChild<CoerModal>('modalUser');
    protected readonly _modalPassword = viewChild<CoerModal>('modalPassword');

    //Variables
    protected readonly _effect!: EffectRef;
    protected readonly _id = Tools.GetGuid("coer-toolbar"); 
    protected readonly _appSettings = appSettings; 
    protected readonly _isLoading = isLoadingSIGNAL;
    protected _isOpenMenu: boolean = false; 
    protected _role: IOption | null = null;
    protected _password: string = ''; 
    protected _confirm: string = '';  

    //input  
    public readonly user                = input<ILoginResponse | null>(null);
    public readonly menu                = input<IMenuToolbar[]>([]); 
    public readonly showProfileMenu     = input<boolean>(true); 
    public readonly preventProfileMenu  = input<boolean>(false); 
    public readonly showPasswordMenu    = input<boolean>(true); 
    public readonly preventPasswordMenu = input<boolean>(false);  
    public readonly showLogOutMenu      = input<boolean>(true);  
    public readonly preventLogOutMenu   = input<boolean>(false); 

    //output 
    protected readonly onClickToogle     = output<void>();
    protected readonly onUpdateRole      = output<string>();
    protected readonly onUpdatePassword  = output<string>();
    protected readonly onClickOptionMenu = output<IMenuToolbar>();

    constructor() {
        this._effect = effect(() => {              
            this._ResetUser(this.user());
        });
    }
    
    //OnDestroy
    ngOnDestroy() {
        this._effect?.destroy();
    }

    //computed
    protected _menu = computed<IMenuToolbar[]>(() => {
        return this.menu()
            .concat(this.showProfileMenu()  ? [{ label: 'Profile'        , preventDefault: this.preventProfileMenu() , icon: 'i91-user-fill'      }] : [])
            .concat(this.showPasswordMenu() ? [{ label: 'Change Password', preventDefault: this.preventPasswordMenu(), icon: 'i91-lock-fill'      }] : [])
            .concat(this.showLogOutMenu()   ? [{ label: 'Log Out'        , preventDefault: this.preventLogOutMenu()  , icon: 'i91-door-open-fill' }] : [])
    }); 


    //computed
    protected _showIdentity = computed(() => {
        return ['sm', 'md', 'lg', 'xl', 'xxl'].includes(breakpointSIGNAL());
    });


    //computed
    protected _roleList = computed<IOption[]>(() => {
        return (this.user()?.roles || []).map<IOption>((item, index) => ({ 
            id: index, 
            name: item,
            description: item,
            isActive: true 
        }))
    }); 


    //getter
    protected get _enableUpdatePassword(): boolean {
        return this._password.equals(this._confirm, false)
            && this._password.length > 5;
    }
 

    /** */
    protected _SelectMenu(menu: IMenuToolbar | null) {
        if(menu) {
            if(!Tools.IsBooleanTrue(menu.preventDefault)) {
                switch(menu.label) {
                    case 'Profile': {
                        this._modalUser()?.Open();
                        break;
                    }
    
                    case 'Change Password': {
                        this._modalPassword()?.Open();
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


    /** */
    protected _ResetUser(user: ILoginResponse | null) {
        if(user) {
            Tools.Sleep().then(() => {
                this._role = this._roleList().find(x => x.name.equals(user?.role)) || null; 
            });
        }            
    } 


    /** */
    protected _ResetPassword() {     
        this._password = '';
        this._confirm  = '';        
    } 


    /** */
    public CloseModal() {
        this._modalUser()?.Close();  
        this._modalPassword()?.Close();          
    } 
}