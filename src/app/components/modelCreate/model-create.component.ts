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

  public createModel() {
    console.log(this.network);
    if (this.checkIfDataIsCorrect()) {
      this.enableButton = false;
      this._networkService.createNetwork(this.network).then(response => {
        alert("Modelo creado correctamente");
        this.enableButton = true;
      }).catch(error => {
        alert("Ha ocurrido un error");
        this.enableButton = true;
      });
    }
  }

  public toNumberArray() {
    return Array(this.numClassInputs);
  }

  private checkIfDataIsCorrect(): boolean {
    if (this.network.alfa < 0.1 || this.network.alfa > 1)
      return false;
    if (this.network.classes.length == 0)
      return false;
    if (this.network.inputs == 0)
      return false;
    if (this.network.layers == 0)
      return false;
    if (this.network.name.length < 2)
      return false;
    return this.checkAllClasesFilled();
  }

  private checkAllClasesFilled(): boolean {
    let correct: boolean = true;
    let i = 0;
    while (i < this.network.classes.length && correct) {
      if (this.network.classes[i] === null || this.network.classes[i].length === 0)
        correct = false;
      i++;
    }
    return correct;
  }

  public ngOnInit() {
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
