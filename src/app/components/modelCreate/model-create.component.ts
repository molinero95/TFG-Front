import { Component, OnInit } from '@angular/core';
import { Network } from 'src/app/entities/network';
import { NetworkService } from 'src/app/services/network/network.service';

@Component({
  selector: 'app-model-create',
  templateUrl: './model-create.component.html',
  styleUrls: ['./model-create.component.css']
})
export class ModelCreateComponent implements OnInit {
  enableButton: boolean;
  constructor(private _networkService: NetworkService) {
  }

  createModel(modelName: string, alfa: number, inputs: number, layers: number, numClasses: number) {
    this.enableButton = false;
    let model: Network = {
      name: modelName,
      alfa: alfa,
      inputs: inputs,
      layers: layers,
      numClasses: numClasses
    }
    this._networkService.createNetwork(model).then(response => { 
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
