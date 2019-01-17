import React = require("react");
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TrainNetworkData } from "../../../entities/trainer/trainNetworkData";
import { ClassData } from "../../../entities/trainer/classData";
import { ImageTrainer } from "../../trainer/imageTrainer";
import { ImageToTrainData } from "../../../entities/images/imagesForTrainData";
import Dropzone from "react-dropzone";
import { ImageTrainerConstants } from "../../trainer/constants";
import { CanvasHelper } from "../../../helpers/canvasHelper";


interface TrainNetworkMenuProps {
    trainNetworkData: TrainNetworkData;
    trainer: ImageTrainer;
    imagesData: Array<ImageToTrainData>;
    handleTrain: () => void;
    onEpochsChange: (newValue: number) => void;
    onDenseUnitsChange: (newValue: number) => void;
    onLearningRateChange: (newValue: number) => void;
    onBatchSizeChange: (newValue: number) => void;
}

interface TrainNetworkMenuState {
    newClassName: string;
}


export class TrainNetworkMenu extends React.Component<TrainNetworkMenuProps, TrainNetworkMenuState> {
    private imageForPrediction: ImageToTrainData;
    constructor(props: TrainNetworkMenuProps) {
        super(props);
        this.state = {
            newClassName: "",
        }
    }

    private updateNewClassName(data: React.ChangeEvent<HTMLInputElement>): void {
        let text = data.target.value;
        this.setState({
            newClassName: text
        });
    }


    private labelExists() {
        return this.props.trainNetworkData.classes.find(item => item.labelName == this.state.newClassName);
    }

    private addClassName(): void {
        if (this.state.newClassName !== "" && !this.labelExists()) {
            let classesLength = this.props.trainNetworkData.classes.length;
            this.props.trainNetworkData.classes.push({
                labelName: this.state.newClassName,
                value: classesLength,
                selected: false
            });
            this.props.trainer.setNumClasses(this.props.trainNetworkData.classes.length);
            this.setState({
                newClassName: ""
            })
        }
    }


    private selectClass(event: React.MouseEvent<HTMLButtonElement>, selectedClass: ClassData): void {
        console.log(this.props.imagesData);
        console.log(this.props.trainNetworkData);
        selectedClass.selected = !selectedClass.selected;
        let selectedImages = this.getSelectedImages();
        if (this.props.trainNetworkData.classes.length < 2)
            alert("Introduzca al menos 2 clases");
        else {
            if (selectedClass.selected && selectedImages.length > 0) {
                this.props.trainNetworkData.classes.forEach(item => {   //Desmarcamos el resto por si acaso
                    if (item !== selectedClass)
                        item.selected = false;
                });
                this.props.imagesData.forEach(image => {
                    if (image.selected) {
                        image.labelData = selectedClass;
                        this.props.trainer.setExample(image.imageData, image.labelData.value);

                        //Esto no puede ir aqui, porque si no no actualiza el estado
                        //image.classified = true;
                        //image.selected = false;
                    }
                });
                alert('Deberia ser: ' + selectedClass.value);
            }
        }
    }

    private getSelectedImages(): Array<ImageToTrainData> {
        return this.props.imagesData.filter(item => item.selected);
    }



    private showClassSelector(): Array<JSX.Element> {
        let res: Array<JSX.Element> = new Array<JSX.Element>();
        this.props.trainNetworkData.classes.forEach(classValue => {
            res.push(<button onClick={(event) => this.selectClass(event, classValue)} className="brn smallMarginTop" key={classValue.value}>{classValue.labelName}</button>);
        });
        return res;
    }


    private async predictHandle (acceptedFiles: any, rejectedFiles: any) {
        let url = URL.createObjectURL(acceptedFiles[0]);
        this.imageForPrediction = {
            imageUrl: url,
            labelData: null,
            imageData: await CanvasHelper.getResizedImage(url, ImageTrainerConstants.IMAGEHEIGTH, ImageTrainerConstants.IMAGEWIDTH),
            selected: false,
            classified: false
        };
    }

    private handlePrediction(): void {
        this.props.trainer.predict(this.imageForPrediction.imageData).then((data) => {
            alert("Predicted: " + data);
        });
    }

    private handleEpochs(newValue: React.ChangeEvent<HTMLInputElement>) {
        this.props.onEpochsChange(Number(newValue.target.value))
    }

    private handleDenseUnits(newValue: React.ChangeEvent<HTMLInputElement>) {
        this.props.onDenseUnitsChange(Number(newValue.target.value))
    }

    private handleLearningRate(newValue: React.ChangeEvent<HTMLInputElement>) {
        this.props.onLearningRateChange(Number(newValue.target.value))
    }

    private handleBatchSizeFraction(newValue: React.ChangeEvent<HTMLInputElement>) {
        this.props.onBatchSizeChange(Number(newValue.target.value))
    }

    public render() {
        return (
            <div>
                <div className="horizontalLayoutSpaceEvenly">
                    {this.showClassSelector()}
                </div>
                <div className="horizontalLayoutSpaceEvenly smallMarginTop">
                    <input placeholder="nombre" type="text" value={this.state.newClassName} onChange={this.updateNewClassName.bind(this)}></input>
                    <button className="btn btn-success" onClick={this.addClassName.bind(this)}>
                        <Icon iconName="AddTo" className="ms-IconExample" /> Add class
				    </button>
                </div>
                <hr></hr>
                <div className="spaceBetweenContent sideMirgen">
                    <label htmlFor="">Epochs:</label>
                    <input type="range" className="textRight" name="points" min="10" max="40" onChange={this.handleEpochs.bind(this)} value={this.props.trainNetworkData.epochs}></input>
                    <label >{this.props.trainNetworkData.epochs}</label>
                </div>
                <div className="spaceBetweenContent sideMirgen">
                    <label htmlFor="">Dense units:</label>
                    <input type="range" className="textRight" name="points" min="10" max="200" onChange={this.handleDenseUnits.bind(this)} value={this.props.trainNetworkData.denseUnits}></input>
                    <label >{this.props.trainNetworkData.denseUnits}</label>
                </div>
                <div className="spaceBetweenContent sideMirgen">
                    <label htmlFor="">Learning rate</label>
                    <input type="text" className="textRight" name="points" min="0.00004" max="0.1" onChange={this.handleLearningRate.bind(this)} value={this.props.trainNetworkData.learningRate}></input>
                </div>
                <div className="spaceBetweenContent sideMirgen">
                    <label htmlFor="">Batch size fraction</label>
                    <input type="text" className="textRight" name="points" min="0.1" max="1" onChange={this.handleBatchSizeFraction.bind(this)} value={this.props.trainNetworkData.batchSizeFraction}></input>
                </div>
                <hr></hr>
                <div className="centerContent smallMarginTop">
                    <button onClick={this.props.handleTrain} className="btn btn-primary maxWidth">Train</button>
                </div>
                <hr></hr>
                <Dropzone className="dropzone" accept="image/jpeg, image/png" onDrop={this.predictHandle.bind(this)} >
                    <p className="dropzoneWidthHeith" style={{ textAlign: "center" }}> Drop images for make predictions!</p>
                </Dropzone>
                <div className="centerContent smallMarginTop">
                    <button onClick={this.handlePrediction.bind(this)} className="btn btn-primary maxWidth">Predict</button>
                </div>
            </div>
        )
    }
}