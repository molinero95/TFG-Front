import React = require("react");
import { ClassItem } from "../../../entities/classItem";
import { ItemSelect } from "../../../common/itemSelect";
import { TrainParameters } from "../../../entities/trainParameters";

interface ITrainerLeftMenuCompProps {
    classesWithSelection: Array<ItemSelect<ClassItem>>;
    onConfirmedClass: (modelClass: ClassItem) => void;
    trainParameters: TrainParameters;
    onEpochsValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onDenseUnitsValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onLearningRateValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBatchSizeFractionValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
interface ITrainerLeftMenuCompState {
    selectedClass: ClassItem;

}


export class TrainerLeftMenuComp extends React.Component<ITrainerLeftMenuCompProps, ITrainerLeftMenuCompState> {
    public constructor(props: ITrainerLeftMenuCompProps) {
        super(props);
        this.state = {
            selectedClass: null
        }
    }

    private printClassButtons(): Array<JSX.Element> {
        let res: Array<JSX.Element> = new Array<JSX.Element>();
        this.props.classesWithSelection.forEach((modelClass, index) => {
            res.push(
                <button key={"b" + index.toString()} className="btn btn-light prettyMargin" disabled={false} >{modelClass.textToShow}</button>
            );
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
            </div>
        );
    }
}