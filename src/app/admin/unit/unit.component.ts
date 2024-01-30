import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Base64Service } from 'src/app/shared/services/base64.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent {
  panelAberto: any; 
  cardsData: any;
  FormUnit: FormGroup
  dataSelectedImage: any;
  dataSelectedImageCreate: any;
  newImage: File | null = null;
  FormUnitCreate: FormGroup

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar,
    private base64String: Base64Service,

    ) {
    this.getUnit();
    this.FormUnit = this.setInitialForm();
    this.FormUnitCreate = this.setInitialFormCreate();

  }

  getUnit(){
    this.adminService.getUnits().subscribe((data)=>{
      this.cardsData = data;
    })
  }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  setInitialForm() { 
    return this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
  })}

  setInitialFormCreate() { 
    return this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
  })}


  action(value: any) {
    this.adminService.getUnitbyId(value).subscribe((data) => {
      this.adminService.challengeData = data;
      this.dataSelectedImage = data.image
      this.FormUnit.patchValue({
        name: data.name
      });
    });  }

  onPanelOpened(cardData: any): void {
    this.panelAberto = cardData;
  }

  onPanelClosed(): void {
    this.panelAberto = null;
  }

  create(){
    const formData = this.FormUnitCreate.value;
    formData.image = this.dataSelectedImageCreate;

    this.adminService.createUnit(formData).subscribe(
      (response) => {
        this.openSnackBar('Unidade criada com sucesso', 'Fechar');
        this.getUnit();
      },
      (error) => {
        this.openSnackBar(
          'Erro ao criar desafio',
          'Fechar'
        );
      }
    )
  }

  save(id: any){
    const formData = this.FormUnit.value;
    formData.image = this.dataSelectedImage;
    formData.id = id;


    this.adminService.updateUnit(formData).subscribe(
      (response) => {
        this.openSnackBar('unidade editada com sucesso', 'Fechar');
        this.getUnit();

      },
      (error) => {
        this.openSnackBar(
          'Erro ao criar desafio',
          'Fechar'
        );
      }
    )
  }

  onFileSelected(event: any) {
    this.newImage = event.target.files[0];

    if (this.newImage) {
      this.base64String.fileToBase64(this.newImage).then((base64String) => {
        this.dataSelectedImage = base64String;
      });
    }
  }

  onFileSelectedCreate(event: any) {
    this.newImage = event.target.files[0];

    if (this.newImage) {
      this.base64String.fileToBase64(this.newImage).then((base64String) => {
        this.dataSelectedImageCreate = base64String;
      });
    }
  }
}
