import { Component, viewChild, computed } from '@angular/core'; 
import { CoerSelectBox } from 'coer91.angular/components';
import { page } from 'coer91.angular/tools';

@Component({
    selector: 'coer-selectbox-page',
    templateUrl: './coer-selectbox.page.html', 
    standalone: false
})
export class CoerSelectboxPage extends page {       

    //Elements
    protected readonly selectboxRef = viewChild.required<CoerSelectBox<any>>('selectboxRef'); 
     
    //Variables
    protected value1 = null;

    constructor() {
        super('coer-selectbox');
    }

    protected dataSource1 = computed(() => [ 
        { id: 1,  name: 'Hola1', icon: 'i91-alarm'  },
        { id: 2,  name: 'Hola2', icon: 'i91-alarm'  },
        { id: 3,  name: 'Hola3', icon: 'i91-alarm'  },
        { id: 4,  name: 'Hola4', icon: 'i91-alarm-fill'  },
        { id: 5,  name: 'Hola5', icon: 'i91-alarm'  },
        { id: 6,  name: 'Hola6', icon: 'i91-alarm'  },
        { id: 7,  name: 'Hola7', icon: 'i91-alarm'  },
        { id: 8,  name: 'Hola8', icon: 'i91-alarm'  },
        { id: 9,  name: 'Hola9', icon: 'i91-alarm'  },
        { id: 10, name: 'Hola10' } 
    ]);   
}