import { ROUTES as COER91_ROUTES } from 'coer91.angular/pages';

//Pages  
export const ROUTES = [
    {
        path: 'components',
        loadChildren: () => import('./modules/components/components.module').then(module => module.ComponentsModule)
    },
].concat(COER91_ROUTES);