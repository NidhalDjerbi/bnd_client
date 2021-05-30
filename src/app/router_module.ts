import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AuthComponent } from './auth/auth.component';
import { TokenGuard } from './helpers/guards/token.guard';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './helpers/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
      },
      {
        path: 'main',
        component: MainComponent,
        canActivate:[TokenGuard]
      },
      {
        path: 'auth',
        component:AuthComponent,
        canActivate: [AuthGuard]
      },
    //   { path: '**', redirectTo: '404' },
    //   {
    //     path: '404',
    //     component: PageNotFoundComponent,
    //   },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }