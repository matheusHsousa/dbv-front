import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from '../shared/guardian/auth.guard';
import { ChallangeRegisterComponent } from './challange-register/challange-register.component';
import { ChallengeListComponent } from './challenge-list/challenge-list.component';
import { RegisterMemberComponent } from './register-member/register-member.component';
import { MembersComponent } from './members/members.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { UnitComponent } from './unit/unit.component';
import { ToolsComponent } from './tools/tools.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
  },
  {
    path: 'challenges',
    canActivate: [AuthGuard],
    component: ChallangeRegisterComponent,
    data: {
      name: 'Desafios',
      expectedRoles: ['ADMIN'],
    },
  },
  {
    path: 'challenges-list',
    canActivate: [AuthGuard],
    component: ChallengeListComponent,
    data: {
      name: 'Lista de Desafios',
      expectedRoles: ['ADMIN'],
    },
  },
  {
    path: 'register-member',
    canActivate: [AuthGuard],
    component: RegisterMemberComponent,
    data: {
      name: 'Registro de membro',
      expectedRoles: ['ADMIN'],
    },
  },
  {
    path: 'members',
    canActivate: [AuthGuard],
    component: MembersComponent,
    data: {
      name: 'Membros',
      expectedRoles: ['ADMIN'],
    },
  },
  {
    path: 'registration-form',
    canActivate: [AuthGuard],
    component: RegistrationFormComponent,
    data: {
      name: 'Registro',
      expectedRoles: ['ADMIN'],
    },
  },
  {
    path: 'edit-member/:id',
    canActivate: [AuthGuard],
    component: EditMemberComponent,
    data: {
      name: 'Registro',
      expectedRoles: ['ADMIN'],
    },
  },
  {
    path: 'unit',
    canActivate: [AuthGuard],
    component: UnitComponent,
    data: {
      name: 'Unidades',
      expectedRoles: ['ADMIN'],
    },
  },
  {
    path: 'tools',
    canActivate: [AuthGuard],
    component: ToolsComponent,
    data: {
      name: 'Ferramentas',
      expectedRoles: ['ADMIN'],
    },
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
