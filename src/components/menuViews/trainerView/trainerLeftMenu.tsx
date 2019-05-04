import React = require("react");
import { ClassItem } from "../../../entities/classItem";
import { SelectableItem } from "../../../common/selectableItem";
import { TrainParameters } from "../../../entities/trainParameters";
import { DotLoader } from 'react-spinners';


interface ITrainerLeftMenuProps {
    classesWithSelection: Array<SelectableItem<ClassItem>>;
    onConfirmedClass: (modelClass: ClassItem) => void;
    trainParameters: TrainParameters;
    onEpochsValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onDenseUnitsValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onLearningRateValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBatchSizeFractionValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onTrainBtnClicked: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    hideTrainBtn: boolean;
    loading: boolean;
}
interface ITrainerLeftMenuState {
    selectedClass: ClassItem;
}


export class TrainerLeftMenu extends React.Component<ITrainerLeftMenuProps, ITrainerLeftMenuState> {
    public constructor(props: ITrainerLeftMenuProps) {
        super(props);
        this.state = {
            selectedClass: null,
        }
    }

    private printClassButtons(): Array<JSX.Element> {
        let res: Array<JSX.Element> = new Array<JSX.Element>();
        this.props.classesWithSelection.forEach((modelClass, index) => {
            let btn = <button key={"b" + index.toString()} className="btn btn-light prettyMargin" onClick={() => this.setState({ selectedClass: modelClass.item })} disabled={false} >{modelClass.textToShow}</button>;
            if (this.state.selectedClass == modelClass.item)
                btn = <button key={"b" + index.toString()} className="btn btn-light prettyMargin primaryColorBg" onClick={() => this.setState({ selectedClass: modelClass.item })} disabled={false} >{modelClass.textToShow}</button>;
            res.push(btn);
        });
        return res;
    }

    public render(): JSX.Element {
        return (
            <div className="verticalLayout container whiteBg">
                <span>Seleccione clase:</span>
                <div className="centerContent halfHeigth scrollAuto">
                    {this.printClassButtons()}
                </div>
                <button className="btn secondaryColorBg topMargin" onClick={() => this.props.onConfirmedClass(this.state.selectedClass)}>Confirmar</button>
                <div className="prettyMargin">
                    <div className="form-group row">
                        <label className="col-md-4 text-right">Número de épocas: {this.props.trainParameters.epochs}</label>
                        <input type="range" className="form-control-range col-md-2" value={this.props.trainParameters.epochs} min="10" max="40" onChange={this.props.onEpochsValueChange}></input>
                        <label className="col-md-4 text-right">Unidades de densidad: {this.props.trainParameters.denseUnits}</label>
                        <input type="range" className="form-control-range col-md-2" value={this.props.trainParameters.denseUnits} min="10" max="200" onChange={this.props.onDenseUnitsValueChange}></input>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-4 text-right">Ratio de aprendizaje: 1/{this.props.trainParameters.learningRateDec}</label>
                        <input type="range" className="form-control-range col-md-2" value={this.props.trainParameters.learningRateDec} min="10" max="10000" onChange={this.props.onLearningRateValueChange.bind(this)}></input>
                        <label className="col-md-4 text-right">Fracción de tamaño de lote: {this.props.trainParameters.batchSizeFractionDec}/10</label>
                        <input type="range" className="form-control-range col-md-2" value={this.props.trainParameters.batchSizeFractionDec} min="1" max="10" onChange={this.props.onBatchSizeFractionValueChange.bind(this)}></input>
                    </div>
                </div>
                <button className="btn secondaryColorBg topMargin" disabled={this.props.loading} hidden={this.props.hideTrainBtn} onClick={this.props.onTrainBtnClicked}>Entrenar</button>
                <div className="centerContent topMargin">
                    <DotLoader
                        size={100}
                        color={"#D78193"}
                        loading={this.props.loading}
                    ></DotLoader>
                </div>
            </div>
        );
    }
}