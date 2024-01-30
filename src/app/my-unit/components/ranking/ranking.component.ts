import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnChanges {

  @Input() data: { name: string, value: number }[] = [];

  constructor() { }

  ngOnChanges(): void {
  }
  
  sortedData(): any[] {
    return this.data ? this.data.slice().sort((a, b) => b.value - a.value).slice(0, 3) : [];
  }  
}
