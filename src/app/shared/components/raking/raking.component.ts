import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-raking',
  templateUrl: './raking.component.html',
  styleUrls: ['./raking.component.scss']
})
export class RakingComponent implements OnChanges{
  @Input() data: { name: string, value: number }[] = [];

  constructor() { }

  ngOnChanges(): void {
  }
  
  sortedData(): any[] {
    return this.data ? this.data.slice().sort((a, b) => b.value - a.value).slice(0, 3) : [];
  }  
}
