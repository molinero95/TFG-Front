import { Component, OnInit } from '@angular/core';
import { Model } from 'src/app/entities/model';

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
  models: Array<Model>;
  ready: boolean;
  images: Array<ImageControl>;
  constructor() { }

  beforePart(): void {
    this.part--;
    this.ready = true;
  }

  nextPart(): void {
    this.part++;
    if(this.part == 1)
      this.images = new Array<ImageControl>();
    this.ready = false;
  }

  onModelClicked(): void {
    this.ready = true;
  }

  onFilesSelected(event): void {
    let files: Array<File> = event.target.files;
    let fr: FileReader = new FileReader();
    fr.onloadend = () => {
      this.images.push({
        src: <string>fr.result,
        selected: false,
        class: ""
      });
    }
    
    for(let i = 0; i < files.length; i++){
      fr.readAsDataURL(files[i]);
      //problema aqui al leer multiples
      
    }
  }

  onImageSelected(image: ImageControl): void {
    image.selected = !image.selected;
  }

  getSelectedImages(): Array<ImageControl>{
    return this.images.filter(image => image.selected);;
  }

  allImagesClassifield():boolean {
    return this.images.every(image => image.class !== "");
  }

  ngOnInit() {
    this.part = 0;
    this.ready = false;
    this.images = []
    this.models = [
      {
        name: "hey",
        alfa: 0.1,
        inputs: 2,
        layers: 2,
        numClasses: 2
      }
    ];
  }

}
