import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyUnitComponent } from './my-unit/my-unit.component';
import { MyUnitRoutingModule } from './my-unit-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogAppointmentsComponent } from './components/dialog-appointments/dialog-appointments.component';
import { RankingComponent } from './components/ranking/ranking.component';

@NgModule({
  declarations: [
    MyUnitComponent,
    AppointmentsComponent,
    DialogAppointmentsComponent,
    RankingComponent
  ],
  imports: [
    CommonModule,
    MyUnitRoutingModule,
    SharedModule,
    AppMaterialModule,
    ReactiveFormsModule  
  ],
})
export class MyUnitModule { }
