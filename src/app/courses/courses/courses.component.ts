import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  cardDataList: any[] = [];
  filter: FormGroup;
  categorys: any;
  id: any;
  fotos: any;
  rankingData: any;
  members: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public coursesService: CoursesService,
  ) {
    this.filter = this.setInitialForm();
  }

  ngOnInit(): void {

    this.coursesService.getCategorias().subscribe((data) => {
      this.categorys = data;
    });

    this.coursesService.getChallenges().subscribe((data) =>{
      this.cardDataList = data
    })

    this.coursesService.getAllMembersWithPoints().subscribe((data) => {
      if (data && Array.isArray(data.members)) {
        this.members = data.members;
        this.rankingData = this.members.map((item: any) => ({
          name: item.memberName,
          value: item.totalPoints
        }));
        console.log(this.rankingData);
      }
    });    
  }

  setInitialForm() {
    return this.formBuilder.group({
      name: [''],
      type: [''],
    });
  }

  openDetails(cardData?: any): void {
    this.id = cardData.id;
    this.coursesService.setChallengeId(this.id)
    this.router.navigate(['courses/challenges-details']);
  }

  openAppointmentes(cardData?: any){
    this.id = cardData.id;
    this.router.navigate(['courses/challenges-details']);
  }

  getAll() {
    this.coursesService.list().subscribe((data) => {
      this.cardDataList = data;
    });
  }

  submite() {
    const values = this.filter.value;

    this.coursesService.filterByCategory(values).subscribe((data) => {
      this.cardDataList = data;
    });
  }

  clean() {
    this.filter = this.setInitialForm();
    this.getAll();
  }
}
