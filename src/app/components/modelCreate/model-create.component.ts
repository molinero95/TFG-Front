import { Component, OnInit } from '@angular/core';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-model-create',
  templateUrl: './model-create.component.html',
  styleUrls: ['./model-create.component.css']
})
export class ModelCreateComponent implements OnInit {

  constructor(private _modelService: ModelService) { 

  }

  createModel(modelName: string, alfa: string, inputs: string, layers: number, numClasses: number){
    console.log(modelName);
    console.log(alfa);
  }

  ngOnInit() {
  }

}
