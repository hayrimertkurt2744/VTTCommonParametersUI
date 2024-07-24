import { Routes } from '@angular/router';
import { PageListComponent } from './pages/list/page-list.component';
import { LoginPageComponent } from './pages/login/login-page/login-page.component';
import { LayoutComponent } from './layout/layout.component';
//import { AddingDialogComponent } from './pages/dialog/adding-dialog.component';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: './pages/login/login-page', 
        pathMatch: 'full' 

    },
    {
        path:'./pages/login/login-page', 
        component:LoginPageComponent
    
    },
    {
        path:'', 
        component:LayoutComponent,
        children:[
            {
                path:'pages/list/page-list',
                component: PageListComponent
            }
        ]
    }
   
];
