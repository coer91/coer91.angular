import { IMenu } from "coer91.tools/interfaces";

export const NAVIGATION: IMenu[] = [    
    { id: 1, label: 'Components',  icon: 'i91-bars', show: 'GRID', items: [
        { id: 1, label: 'coer-accordion', icon: '', path: '/components/coer-accordion' }, 
        { id: 2, label: 'coer-button'   , icon: '', path: '/components/coer-button'    }, 
        { id: 3, label: 'coer-grid'     , icon: '', path: '/components/coer-grid'      }, 
        { id: 4, label: 'coer-selectbox', icon: '', path: '/components/coer-selectbox' }, 
        { id: 5, label: 'coer-textbox'  , icon: '', path: '/components/coer-textbox'   },  
        { id: 6, label: 'coer-switch'   , icon: '', path: '/components/coer-switch'    },  
    ]}, 
];