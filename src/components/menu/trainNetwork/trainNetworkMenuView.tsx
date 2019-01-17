import React = require("react");
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TrainNetworkData } from "../../../entities/trainer/trainNetworkData";
import { ClassData } from "../../../entities/trainer/classData";
import { NetworkImageData } from "../../../entities/images/NetworkImageData";
import { TrainNetworkPredictionMenuView } from "./trainNetworkPredictionMenuView";


interface TrainNetworkMenuViewProps {
    trainNetworkData: TrainNetworkData;
    imagesData: Array<NetworkImageData>;
    handleTrain: () => void;
    handleAddImageClass: (image: NetworkImageData, newClass: ClassData) => void;
    handleMakePrediction: (imageForPrediction: NetworkImageData) => void;
    onEpochsChange: (newValue: number) => void;
    onDenseUnitsChange: (newValue: number) => void;
    onLearningRateChange: (newValue: number) => void;
    onBatchSizeChange: (newValue: number) => void;
    addClassToTrainer: (newClass: ClassData) => void;
}

interface TrainNetworkMenuViewState {
    newClassName: string;
}


export class TrainNetworkMenuView extends React.Component<TrainNetworkMenuViewProps, TrainNetworkMenuViewState> {
    private imageForPrediction: NetworkImageData;
    constructor(props: TrainNetworkMenuViewProps) {
        super(props);
        this.state = {
            newClassName: "",
        }
    }



    private labelExists() {
        return this.props.trainNetworkData.classes.find(item => item.labelName == this.state.newClassName);
    }

    private addClassName(): void {
        if (this.state.newClassName !== "" && !this.labelExists()) {
            let classesLength = this.props.trainNetworkData.classes.length;
            this.props.addClassToTrainer({
                labelName: this.state.newClassName,
                value: classesLength,
                selected: false
            });
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
                        this.props.handleAddImageClass(image, selectedClass);
                    }
                });
                alert('Deberia ser: ' + selectedClass.value);
            }
        }
    }

    private getSelectedImages(): Array<NetworkImageData> {
        return this.props.imagesData.filter(item => item.selected);
    }



    private showClassSelector(): Array<JSX.Element> {
        let res: Array<JSX.Element> = new Array<JSX.Element>();
        let disabled = true;
        if (this.props.imagesData.find(item => item.selected))
            disabled = false;
        this.props.trainNetworkData.classes.forEach(classValue => {
            res.push(<button onClick={(event) => this.selectClass(event, classValue)} className="btn btn-primary smallMarginTop" key={classValue.value} disabled={disabled}>{classValue.labelName}</button>);
        });
        return res;
    }

    //#region Handle methods


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

    private handleNewClassNameChange(data: React.ChangeEvent<HTMLInputElement>): void {
        let text = data.target.value;
        this.setState({
            newClassName: text
        });
    }

    //#endregion

    public render() {
        return (
            <div>
                <div className="horizontalLayoutSpaceEvenly">
                    {this.showClassSelector()}
                </div>
                <div className="horizontalLayoutSpaceEvenly smallMarginTop">
                    <input placeholder="nombre" type="text" value={this.state.newClassName} onChange={this.handleNewClassNameChange.bind(this)}></input>
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
                <TrainNetworkPredictionMenuView 
                    handleMakePrediction={this.props.handleMakePrediction}>
                </TrainNetworkPredictionMenuView>
            </div>
        )
    }
}