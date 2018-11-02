import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-train-model',
  templateUrl: './train-model.component.html',
  styleUrls: ['./train-model.component.css']
})
export class TrainModelComponent implements OnInit {
  part: number;
  constructor() { }

  beforePart(): void {
    this.part--;
  }

  nextPart(): void {
    this.part++;
  }

  ngOnInit() {
    this.part = 0;
  }

}
