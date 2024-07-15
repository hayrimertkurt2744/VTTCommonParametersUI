import { Routes } from '@angular/router';
import { PageListComponent } from './pages/list/page-list.component';
//import { AddingDialogComponent } from './pages/dialog/adding-dialog.component';

export const routes: Routes = [
    {path: 'pages/list/page-list', component: PageListComponent},
    // {path: '/pages/dialog/adding-dialog', component: AddingDialogComponent},
];
