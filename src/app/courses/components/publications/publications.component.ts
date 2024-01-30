import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogPubComponent } from '../dialog-pub/dialog-pub.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/auth.service';
import { GradesComponent } from '../grades/grades.component';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent {
  jsonString: any;
  getId: any;
  data: any;
  image: any;
  challengeId: any;
  publications: any;



  constructor(
    private coursesService: CoursesService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private authService: AuthService,

  ){
    this.challengeId = this.coursesService.getChallengeId()
    this.jsonString = localStorage.getItem('userId');
    this.getId = JSON.parse(this.jsonString);

    this.coursesService.getMembersbyId(this.getId.id).subscribe((data)=>{
      this.data = data;
      this.image = data.image;
    })

    this.coursesService.getublicationsbyId(this.challengeId).subscribe((data) =>{
      this.publications = data;
   });

  }

  ngOnInit() {
  }
  

  openSnackBar(message: string, action: string, color: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: color
    });
  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogPubComponent, {
      data: this.data,
    });

    dialogRef.afterClosed().subscribe(result => {
      let obj = {
        publicationImage: result.image,
        text_field: result.text_fields,
        userId: this.getId.id,
        challengeId: this.challengeId
      }
      this.coursesService.createPublications(obj).subscribe(
        (response) => {
          this.openSnackBar('Criado com sucesso', 'Fechar', 'green');
        },
        (error) => {
          if (error.error && error.error.error) {
            this.openSnackBar(error.error.error, 'Fechar', 'red');
          } else {
            this.openSnackBar('Erro ao publicar', 'Fechar', 'red');
          }
        }
      )
    });
  }

  isRoleAllowed(...expectedRoles: string[]): boolean {
    const userRole = this.authService.getUserRole();
    return expectedRoles.includes(userRole);
  }

  shouldShowIcon(expectedRoles: string[]): boolean {
    return this.isRoleAllowed(...expectedRoles);
  }

  openGrade(publication: any){
    const dialogRef = this.dialog.open(GradesComponent, {
      data: {
        challengerId: publication.challengeId,
        userId: publication.userId
      } 
    });
  }
}

