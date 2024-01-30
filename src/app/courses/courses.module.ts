import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses/courses.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DialogAppointmentsComponent } from './components/dialog-appointments/dialog-appointments.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ChallengeDetailsComponent } from './components/challenge-details/challenge-details.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { DialogPubComponent } from './components/dialog-pub/dialog-pub.component';
import { GradesComponent } from './components/grades/grades.component';
import { RakingComponent } from '../shared/components/raking/raking.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [CoursesComponent, 
    DialogAppointmentsComponent, 
    ChallengeDetailsComponent, 
    PublicationsComponent, 
    DialogPubComponent, 
    GradesComponent,
    RakingComponent
],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AppMaterialModule,
    MatCardModule,
    SharedModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    QRCodeModule,
  ],
})
export class CoursesModule {}
