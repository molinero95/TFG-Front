import { Component, OnInit } from '@angular/core';
import { Network } from 'src/app/entities/network';
import { NetworkService } from 'src/app/services/network/network.service';

interface ImageControl {
  src: string;
  selected: boolean;
  class: string;
}

@Component({
  selector: 'app-train-model',
  templateUrl: './train-model.component.html',
  styleUrls: ['./train-model.component.css']
})


export class TrainModelComponent implements OnInit {
  part: number;
  models: Array<Network>;
  ready: boolean;
  images: Array<ImageControl>;
  selectedNetwork: Network;
  classInput: string;
  constructor(private _networkService: NetworkService) { }


  //global
  private beforePart(): void {
    this.part--;
    this.ready = true;
  }

  private nextPart(): void {
    this.part++;
    if (this.part == 1){
      this.images = new Array<ImageControl>();
      if(this.selectedNetwork){
        this._networkService.getNetwork(this.selectedNetwork.name).then(data => {
          this.selectedNetwork = data; 
        });
      }
      else
        this.part = 0;
    }
    this.ready = false;
  }

  public ngOnInit() {
    this.part = 0;
    this.ready = false;
    this.images = []
    this.models = [];
    this._networkService.getNetworkNames(0, 20).then(data => {
      let modelNames = data as Array<string>;
      modelNames.forEach(modelName => {
        this.models.push({
          alfa: 1,
          inputs: 1,
          layers: 1,
          name: modelName,
          classes: []
        })
      });
    });
  }

  //END GLOBAL

  //PART 0
  private onModelClicked(model: Network): void {
    this.ready = true;
    if (this.selectedNetwork === model)
      this.selectedNetwork = null;
    else
      this.selectedNetwork = model;
  }

  //END PART 0

  //PART 1
  private onFilesSelected(event): void {
    let files: Array<File> = event.target.files;

    for (let i = 0; i < files.length; i++) {
      let fr: FileReader = new FileReader();
      fr.onloadend = () => {
        this.images.push({
          src: <string>fr.result,
          selected: false,
          class: ""
        });
      }
      fr.readAsDataURL(files[i]);

    }
  }

  private onImageSelected(image: ImageControl): void {
    image.selected = !image.selected;
    this.getCommonImageClass();
  }


  private getCommonImageClass(): void{
    let images = this.getSelectedImages();
    if(images[0]){
      this.classInput = images[0].class;
      let i = 1;
      while(i < this.images.length){
        if(this.images[i].class != this.classInput){
          this.classInput = "";
          i = this.images.length;
        }
        i++;
      }
    }
  }

  private getSelectedImages(): Array<ImageControl> {
    return this.images.filter(image => image.selected);;
  }

  private allImagesClassifield(): boolean {
    return this.images.every(image => image.class !== "");
  }

  private onClassInputChanged(): void{
    let images:Array<ImageControl> = this.getSelectedImages();
    images.map(image => image.class = this.classInput);
  }

  //FIN PART 1

  

}
