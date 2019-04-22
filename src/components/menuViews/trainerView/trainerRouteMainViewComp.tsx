import React = require("react");
import { TrainerLeftMenuComp } from "./trainerLeftMenuComp";
import { ItemSelect } from "../../../common/itemSelect";
import { ClassItem } from "../../../entities/classItem";
import { TrainerImageSelectorComp } from "./trainerImageSelectorComp";
import { ImageItem } from "../../../entities/ImageItem";
import { TrainParameters } from "../../../entities/trainParameters";
import { ApplicationState } from "../../../applicationState";
import { TrainRequests } from "../../../requests/trainRequests";


interface ITrainerRouteMainViewCompProps {

}

interface ITrainerRouteMainViewCompState {
    testClasses: Array<ItemSelect<ClassItem>>;
    images: Array<ItemSelect<ImageItem>>;
    trainParameters: TrainParameters;
    loading: boolean;
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
            },
            loading: false
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
                    learningRateDec: 1 / ApplicationState.model.activeVersion.learningRate,
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
        this.setState({
            images: this.state.images.map(item => {
                if (item.isSelected) {
                    item.item.class = modelClass;
                    item.isSelected = false;
                }
                return item;
            })
        })
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
        this.setState({
            images: this.state.images.map(item => {
                if (item.item.class == null)
                    item.isSelected = false;
                return item;
            })
        });
    }

    private onSelectAllImagesClick(): void {
        this.setState({
            images: this.state.images.map(item => {
                if (item.item.class == null)
                    item.isSelected = true;
                return item;
            })
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

    private onTrainBtnClicked(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if(this.state.images == null || this.state.images.length == 0 || this.state.images.some(item => item.item.class == null)){
            alert("Error, check images");
        }else{
            this.setState({loading: true});
            TrainRequests.trainModel(ApplicationState.model.id, ApplicationState.model.activeVersion.id, this.state.trainParameters, this.state.images.map(imagesSel=> imagesSel.item)).then(() => {
                this.setState({loading: false});
                alert("Modelo entrenado");
                this.setState({images: new Array<ItemSelect<ImageItem>>()})
            });
        }
    }

    private hideTrainBtn(): boolean{
        return this.state.images == null || this.state.images.length == 0 || this.state.images.some(item => item.item.class == null)
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
                        onTrainBtnClicked={this.onTrainBtnClicked.bind(this)}
                        hideTrainBtn={this.hideTrainBtn()}
                        loading={this.state.loading}
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