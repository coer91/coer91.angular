import { ROUTES as COER91_ROUTES } from '@library/pages';

//Pages  
export const ROUTES = [
    {
        path: 'components',
        loadChildren: () => import('./modules/components/components.module').then(module => module.ComponentsModule)
    },
].concat(COER91_ROUTES);