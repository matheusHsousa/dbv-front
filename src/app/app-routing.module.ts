import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guardian/auth.guard';
import { AuthRedirectGuard } from './shared/guardian/auth-redirect.guard';
import { CustomRoute } from './shared/types/custom-route.service';

const routes: Routes = [
  {
    path: 'courses',
    canActivate: [AuthGuard],
    data: {
      expectedRoles: ['ADMIN', 'USER', 'CUSTOMER'],
      name: 'Desafios',
    },
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: {
      expectedRoles: ['ADMIN'],
      name: 'Administrador',
    } as CustomRoute,
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'MyUnit',
    canActivate: [AuthGuard],
    data: {
      expectedRoles: ['CUSTOMER', 'ADMIN', 'USER'],
      name: 'Minha unidade',
    } as CustomRoute,
    loadChildren: () => import('./my-unit/my-unit.module').then((m) => m.MyUnitModule),
  },
  {
    path: 'MyProfile',
    canActivate: [AuthGuard],
    data: {
      expectedRoles: ['CUSTOMER', 'ADMIN', 'USER'],
      name: 'Meu perfil',
    } as CustomRoute,
    loadChildren: () => import('./my-profile/my-profile.module').then((m) => m.MyProfileModule),
  },
  {
    path: 'login',
    canActivate: [AuthRedirectGuard],
    data: {
      expectedRoles: ['ADMIN'],
      name: 'Login',
    },
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
