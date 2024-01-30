import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  cardsData = [
    { title: 'Cadastro de desafios', icon: 'military_tech', path: 'admin/challenges', path2: 'admin/challenges-list', button1: 'Criar', button2: 'Visualizar'},
    { title: 'Cadastro de membros', icon: 'person', path: 'admin/register-member', path2: 'admin/members', button1: 'Criar', button2: 'Visualizar'},
    { title: 'Cadastro de unidades', icon: 'groups', path2: 'admin/unit', button2: 'Unidades' },
    { title: 'Cadastro de materiais', icon: 'construction', path2: 'admin/tools', button2: 'Materias' },
  ];
  
  constructor(private router: Router) {}


  action(value: any) {
    this.router.navigate([value]);
  }
  
}
