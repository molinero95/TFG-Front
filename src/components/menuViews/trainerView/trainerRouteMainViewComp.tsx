import React = require("react");
import { TrainerLeftMenuComp } from "./trainerLeftMenuComp";
import { ItemSelect } from "../../../common/itemSelect";
import { ClassItem } from "../../../entities/classItem";
import { TrainerImageSelectorComp } from "./trainerImageSelectorComp";
import { ImageItem } from "../../../entities/ImageItem";
import { TrainParameters } from "../../../entities/trainParameters";
import { ApplicationState } from "../../../applicationState";


interface ITrainerRouteMainViewCompProps {

}

interface ITrainerRouteMainViewCompState {
    testClasses: Array<ItemSelect<ClassItem>>;
    images: Array<ItemSelect<ImageItem>>;
    trainParameters: TrainParameters;
}

export class TrainerRouteMainViewComp extends React.Component<ITrainerRouteMainViewCompProps, ITrainerRouteMainViewCompState>{
    constructor(props: ITrainerRouteMainViewCompProps) {
        super(props);
        this.state = {
            testClasses: [
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

    public componentDidMount() {
        if (ApplicationState.model == null)
            alert("No hay modelo seleccionado");
        else if (ApplicationState.model.activeVersion == null)
            alert("No hay version seleccionada");
        else {
            let classes = ApplicationState.model.activeVersion.classes.map(item => {
                let val: ItemSelect<ClassItem> = {
                    item: item,
                    isSelected: false,
                    textToShow: item.name
                }
                return val;
            })
            this.setState({
                testClasses: classes,
                trainParameters: {
                    learningRateDec: 1/ApplicationState.model.activeVersion.learningRate,
                    learningRate: ApplicationState.model.activeVersion.learningRate,
                    batchSizeFraction: 0.4,
                    batchSizeFractionDec: 4,
                    denseUnits: ApplicationState.model.activeVersion.denseUnits,
                    epochs: 10
                }
            })
        }
    }


    private onEpochsValueChange(event: React.ChangeEvent<HTMLInputElement>): void {
        let epochs: number = Number(event.target.value);
        let trainParams = this.state.trainParameters;
        trainParams.epochs = epochs;
        this.setState({
            trainParameters: trainParams
        });
    }

    private onDenseUnitsValueChange(event: React.ChangeEvent<HTMLInputElement>): void {
        let denseUnits: number = Number(event.target.value);
        let trainParams = this.state.trainParameters;
        trainParams.denseUnits = denseUnits;
        this.setState({
            trainParameters: trainParams
        });
    }

    private onLearningRateValueChange(event: React.ChangeEvent<HTMLInputElement>): void {
        let learningRate: number = 1 / Number(event.target.value);
        let learningRateDec: number = Number(event.target.value);
        let trainParams = this.state.trainParameters;
        trainParams.learningRate = learningRate;
        trainParams.learningRateDec = learningRateDec;
        this.setState({
            trainParameters: trainParams,
        });
    }

    private onBatchSizeFractionValueChange(event: React.ChangeEvent<HTMLInputElement>): void {
        let batchSize: number = Number(event.target.value) / 10;
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

    private onAddedImages(images: Array<File>) {
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

    private onImageSelected(imageItem: ImageItem) {
        let item = this.state.images.find(image => image.item == imageItem);
        item.isSelected = !item.isSelected;
        this.forceUpdate();
    }

    private onDeselectAllImagesClick(): void {
        let diselectedImages: Array<ItemSelect<ImageItem>> = this.state.images.map(image => {
            image.isSelected = false;
            return image;
        });
        this.setState({
            images: diselectedImages
        });
    }

    private onSelectAllImagesClick(): void {
        let selectedImages: Array<ItemSelect<ImageItem>> = this.state.images.map(image => {
            image.isSelected = true;
            return image;
        });
        this.setState({
            images: selectedImages
        });
    }

    private onRemoveImagesClick(): void {
        let images = this.state.images;
        let i = 0;
        while (i < images.length) {
            if (images[i].isSelected)
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
                    <TrainerLeftMenuComp
                        classesWithSelection={this.state.testClasses}
                        onConfirmedClass={this.onConfirmedClass.bind(this)}
                        onBatchSizeFractionValueChange={this.onBatchSizeFractionValueChange.bind(this)}
                        onDenseUnitsValueChange={this.onDenseUnitsValueChange.bind(this)}
                        onEpochsValueChange={this.onEpochsValueChange.bind(this)}
                        onLearningRateValueChange={this.onLearningRateValueChange.bind(this)}
                        trainParameters={this.state.trainParameters}
                    ></TrainerLeftMenuComp>
                </div>
                <TrainerImageSelectorComp
                    images={this.state.images}
                    onAddedImages={this.onAddedImages.bind(this)}
                    onImageSelected={this.onImageSelected.bind(this)}
                    onDeselectAllImagesClick={this.onDeselectAllImagesClick.bind(this)}
                    onSelectAllImagesClick={this.onSelectAllImagesClick.bind(this)}
                    onRemoveImagesClick={this.onRemoveImagesClick.bind(this)}
                ></TrainerImageSelectorComp>
            </div>
        );
    }
}