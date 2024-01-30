import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyUnitComponent } from './my-unit/my-unit.component';
import { AuthGuard } from '../shared/guardian/auth.guard';
import { AppointmentsComponent } from './appointments/appointments.component';


const routes: Routes = [
  {
    path: '',
    component: MyUnitComponent ,
  },
  {
    path: 'Appointments',
    canActivate: [AuthGuard],
    component: AppointmentsComponent,
    data: {
      name: 'Apontamentos',
      expectedRoles: ['ADMIN', 'CUSTOMER', 'USER'],
    },
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyUnitRoutingModule { }
