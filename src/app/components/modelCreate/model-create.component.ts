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
  network: Network;
  numClassInputs: number;
  constructor(private _networkService: NetworkService) {
  }

  createModel() {
    console.log(this.network);
    this.enableButton = false;
    this._networkService.createNetwork(this.network).then(response => { 
      alert("Modelo creado correctamente");
      this.enableButton = true;
    }).catch(error => {
      alert("Ha ocurrido un error");
      this.enableButton = true;
    });
  }

  
  toNumberArray(){
    return Array(this.numClassInputs);
  }
  

  ngOnInit() {
    this.enableButton = true;
    this.numClassInputs = 2;
    this.network = {
      alfa: 0.1,
      classes: [],
      inputs: 2,
      layers: 2,
      name: ""
    }
  }

}
