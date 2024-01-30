import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoursesService } from '../../services/courses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent {
  challengerId: any;
  userId: any;
  form: FormGroup
  initialGrade: any;

  constructor(
    public dialogRef: MatDialogRef<GradesComponent>,
    private courseService: CoursesService,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder, 
  ) {
    this.challengerId = data.challengerId;
    this.form = this.setInitialForm();
    this.userId = data.userId
    this.courseService.getChallengePoints( this.userId, this.challengerId).subscribe((data) =>{
      if(data.points > 0){
        this.initialGrade = data.points
      }else{
        this.initialGrade = 0;
      }
      this.form.patchValue({
        grade: this.initialGrade
      })
    })
  }

  setInitialForm(){
    return this.formBuilder.group({
      grade: ['', Validators.required]
    })
  }

  grade(){
    let currentDate = new Date()
    let formateDate = this.datePipe.transform(currentDate, 'yyyy-MM-dd')

    let obj = {
      points: this.form.value.grade,
      challengerId: this.challengerId,
      userId: this.userId,
      date: formateDate
    }

    this.courseService.chellengePoints(obj).subscribe(
      (response) => {
        this.openSnackBar('Nota foi dada com sucesso', 'Fechar');
        this.dialogRef.close()
      },
      (error) => {
        this.openSnackBar(
          error.error.error,
          'Fechar'
        );
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
