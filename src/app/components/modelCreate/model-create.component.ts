import { Component, OnInit } from '@angular/core';
import { ModelService } from 'src/app/services/model/model.service';
import { Model } from 'src/app/entities/model';

@Component({
  selector: 'app-model-create',
  templateUrl: './model-create.component.html',
  styleUrls: ['./model-create.component.css']
})
export class ModelCreateComponent implements OnInit {
  enableButton: boolean;
  constructor(private _modelService: ModelService) {
  }

  createModel(modelName: string, alfa: number, inputs: number, layers: number, numClasses: number) {
    this.enableButton = false;
    let model: Model = {
      name: modelName,
      alfa: alfa,
      inputs: inputs,
      layers: layers,
      numClasses: numClasses
    }
    this._modelService.createModel(model).then(response => { 
      alert("Modelo creado correctamente");
      this.enableButton = true;
    }).catch(error => {
      alert("Ha ocurrido un error");
      this.enableButton = true;
    })
  }

  ngOnInit() {
    this.enableButton = true;
  }

}
