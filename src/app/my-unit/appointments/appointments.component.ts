import { Component } from '@angular/core';
import { MyUnityService } from '../service/my-unity.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogAppointmentsComponent } from '../components/dialog-appointments/dialog-appointments.component';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
  providers: [DatePipe]
})
export class AppointmentsComponent {
  image: any;
  id: any;
  name: any;
  position: any;
  values: any[] = [0, 15, 30];
  selectedValue: any;
  appointmentsForm: FormGroup;
  tot: any = 0;

  constructor(
    private myUnitService: MyUnityService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder, 
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    private router: Router,
  ){
    let member = this.myUnitService.getMember()
    this.image = member.image
    this.id = member.id
    this.name = member.memberName
    this.position = member.position
  
    this.appointmentsForm = this.setInitialForm();

    this.appointmentsForm.valueChanges.subscribe(() => {
      this.sum();
      console.log(this.tot)
    });
  }  

  setInitialForm() {
    return this.formBuilder.group({
      date: ['', Validators.required],
      a: [0, Validators.required],
      b: [0, Validators.required],
      c: [0, Validators.required],
      d: [0, Validators.required],
      e: [0, Validators.required],
      f: [0, Validators.required],
      g: [0, Validators.required],
      h: [0, Validators.required],
    });
  }
  
  sum() {
    const formValues = this.appointmentsForm.value;
  
    let sum = 0;
  
    for (const key of Object.keys(formValues)) {
      const value = formValues[key];
      if (typeof value === 'number') {
        sum += value;
      }
    }

    this.tot = sum;
  }
  
  openDialog() {
    this.dialog.open(DialogAppointmentsComponent, {
    });
  }

  openSnackBar(message: string, action: string, color: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: color
    });
  }
  

  send() {
    const formattedDate = this.datePipe.transform(this.appointmentsForm.value.date, 'yyyy-MM-dd');
  
    let obj = {
      date: formattedDate,
      points: this.tot,
      userId: this.id
    };
  
    this.myUnitService.addPoints(obj).subscribe(
      (response) => {
        this.router.navigate(['MyUnit']);
        this.openSnackBar('Criado com sucesso', 'Fechar', 'green');
      },
      (error) => {
        if (error.error && error.error.error) {
          this.openSnackBar(error.error.error, 'Fechar', 'red');
        } else {
          this.openSnackBar('Erro ao adicionar pontos', 'Fechar', 'red');
        }
      }
    );
  }
  
}
