import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Base64Service } from 'src/app/shared/services/base64.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent {
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
    this.getTools();
    this.FormUnit = this.setInitialForm();
    this.FormUnitCreate = this.setInitialFormCreate();

  }

  getTools(){
    this.adminService.getTools().subscribe((data)=>{
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
      quantity: ['', Validators.required],
  })}

  setInitialFormCreate() { 
    return this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      status: [true],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
  })}


  action(value: any) {
    this.adminService.getToolsById(value).subscribe((data) => {
      this.dataSelectedImage = data.image
      this.FormUnit.patchValue({
        name: data.name,
        quantity: data.quantity,
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
    formData.image = this.dataSelectedImageCreate || '';
    formData.status = formData.status || true;

    this.adminService.createTool(formData).subscribe(
      (response) => {
        this.openSnackBar('Material criado com sucesso', 'Fechar');
        this.getTools();
        this.setInitialFormCreate();
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


    this.adminService.updateTools(formData).subscribe(
      (response) => {
        this.openSnackBar('Material editado com sucesso', 'Fechar');
        this.getTools();

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

  delete(id: any){
    let data ={
      status: false,
      id: id
    }
    this.adminService.updateStatusTools(data).subscribe(
    )
    this.getTools();
  }
}
