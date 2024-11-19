import { Routes } from '@angular/router';
import { NotfoundComponent } from './Authentication/components/notfound/notfound.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./Authentication/auth.routes').then(m => m.authRoutes)
    },
    {
        path: '**',
        component: NotfoundComponent
    }
];
