import React = require("react");
import { ModelTrainerLeftMenuComp } from "./modelTrainerLeftMenuComp";
import { ItemSelect } from "../../../entities/itemSelect";
import { ClassItem } from "../../../entities/models/modelClass";
import { ImageSelectorComp } from "./imageSelectorComp";
import { ImageItem } from "../../../entities/images/ImageItem";
import { RouterUtils } from "../../../utils/routerUtils";
import { TrainParameters } from "../../../entities/models/trainParameters";
import { ApplicationState } from "../../../applicationState";
import { VersionRequests } from "../../../requests/versionRequests";


interface IModelTrainViewCompProps {

}

interface IModelTrainViewCompState {
    testClasses: Array<ItemSelect<ClassItem>>;
    images: Array<ItemSelect<ImageItem>>;
    trainParameters: TrainParameters;
}

export class ModelTrainerViewComp extends React.Component<IModelTrainViewCompProps, IModelTrainViewCompState>{
    constructor(props: IModelTrainViewCompProps) {
        super(props);
        this.state = {
            testClasses: [
                {isSelected: false, item: {id: 0, name: "Clase 1"}, textToShow: "Clase 1"},
                {isSelected: false, item: {id: 0, name: "Clase 2"}, textToShow: "Clase 2"},
                {isSelected: false, item: {id: 0, name: "Clase 3"}, textToShow: "Clase 3"},
                {isSelected: false, item: {id: 0, name: "Clase 4"}, textToShow: "Clase 4"},
                {isSelected: false, item: {id: 0, name: "Clase 5"}, textToShow: "Clase 5"},
                {isSelected: false, item: {id: 0, name: "Clase 6"}, textToShow: "Clase 6"},
                {isSelected: false, item: {id: 0, name: "Clase 7"}, textToShow: "Clase 7"},
                {isSelected: false, item: {id: 0, name: "Clase 8"}, textToShow: "Clase 8"},
            ],
            images: [],
            trainParameters: {
                batchSizeFraction: 0.4,
                denseUnits: 100,
                epochs: 10,
                learningRate: 0.00001,
                learningRateDec: 1000,
                batchSizeFractionDec: 4,
            }
        }
    }

    public componentDidMount(){
        if(ApplicationState.model == null)
            alert("No hay modelo seleccionado");
        else if(ApplicationState.model.activeVersion == null)
            alert("No hay version seleccionada");
        else{
            
        }
    }


    private onEpochsValueChange(event: React.ChangeEvent<HTMLInputElement>): void{
        let epochs: number = Number(event.target.value);
        let trainParams = this.state.trainParameters;
        trainParams.epochs = epochs;
        this.setState({
            trainParameters: trainParams
        });
    }

    private onDenseUnitsValueChange(event: React.ChangeEvent<HTMLInputElement>): void{
        let denseUnits: number = Number(event.target.value);
        let trainParams = this.state.trainParameters;
        trainParams.denseUnits = denseUnits;
        this.setState({
            trainParameters: trainParams
        });
    }

    private onLearningRateValueChange(event: React.ChangeEvent<HTMLInputElement>): void{
        let learningRate: number = 1/Number(event.target.value);
        let learningRateDec: number = Number(event.target.value);
        let trainParams = this.state.trainParameters;
        trainParams.learningRate = learningRate;
        trainParams.learningRateDec = learningRateDec;
        this.setState({
            trainParameters: trainParams,
        });
    }

    private onBatchSizeFractionValueChange(event: React.ChangeEvent<HTMLInputElement>): void{
        let batchSize: number = Number(event.target.value)/10;
        let batchSizeDec: number = Number(event.target.value);
        let trainParams = this.state.trainParameters;
        trainParams.batchSizeFraction = batchSize;
        trainParams.batchSizeFractionDec = batchSizeDec;
        this.setState({
            trainParameters: trainParams,
        });
    }



    private onConfirmedClass(modelClass: ClassItem): void {
        //TODO coger imagenes seleccionadas y añadiles las clase
    }

    private onAddedImages(images: Array<File>){
        let newImagesSelect: Array<ItemSelect<ImageItem>> = [];
        images.forEach(imageFile => {
            let imageUrl = URL.createObjectURL(imageFile);
            newImagesSelect.push({
                isSelected: false,
                item: {
                    file: imageFile,
                    imageUrl: imageUrl,
                    class: null
                },
                textToShow: null,
            });
        })
        this.setState({
            images: this.state.images.concat(newImagesSelect)
        })
    }

    private onImageSelected(imageItem: ImageItem){
        let item = this.state.images.find(image => image.item == imageItem);
        item.isSelected = !item.isSelected;
        this.forceUpdate();
    }

    private onDeselectAllImagesClick():void{
        let diselectedImages: Array<ItemSelect<ImageItem>> = this.state.images.map(image => {
            image.isSelected = false;
            return image;
        });
        this.setState({
            images: diselectedImages
        });
    }

    private onSelectAllImagesClick(): void{
        let selectedImages: Array<ItemSelect<ImageItem>> = this.state.images.map(image => {
            image.isSelected = true;
            return image;
        });
        this.setState({
            images: selectedImages
        });
    }

    private onRemoveImagesClick(): void{
        let images = this.state.images;
        let i = 0;
        while(i < images.length){
            if(images[i].isSelected)
                images.splice(i, 1);
            else
                i++;
        }
        this.setState({
            images: images
        });
    }

    public render() {
        return (
            <div className="horizontalLayout maxHeigth">
                <div id="menuWidth" className="borderRigth">
                    <ModelTrainerLeftMenuComp
                        classesWithSelection={this.state.testClasses}
                        onConfirmedClass={this.onConfirmedClass.bind(this)}
                        onBatchSizeFractionValueChange={this.onBatchSizeFractionValueChange.bind(this)}
                        onDenseUnitsValueChange={this.onDenseUnitsValueChange.bind(this)}
                        onEpochsValueChange={this.onEpochsValueChange.bind(this)}
                        onLearningRateValueChange={this.onLearningRateValueChange.bind(this)}
                        trainParameters={this.state.trainParameters}
                    ></ModelTrainerLeftMenuComp>
                </div>
                <ImageSelectorComp
                    images={this.state.images}
                    onAddedImages={this.onAddedImages.bind(this)}
                    onImageSelected={this.onImageSelected.bind(this)}
                    onDeselectAllImagesClick={this.onDeselectAllImagesClick.bind(this)}
                    onSelectAllImagesClick={this.onSelectAllImagesClick.bind(this)}
                    onRemoveImagesClick={this.onRemoveImagesClick.bind(this)}
                ></ImageSelectorComp>
            </div>
        );
    }
}