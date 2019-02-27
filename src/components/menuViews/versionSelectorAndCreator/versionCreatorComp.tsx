import React = require("react");
import { ModelVersion } from "../../../entities/models/modelVersion";


interface IVersionCreatorCompProps {
    onVersionCreated: (newVersion: ModelVersion) => void;
}

interface IVersionCreatorCompState {
    newVersion: ModelVersion;
    learningRateDec: number;
    batchSizeFractionDec: number;
}

export class VersionCreatorComp extends React.Component<IVersionCreatorCompProps, IVersionCreatorCompState>{
    constructor(props: IVersionCreatorCompProps) {
        super(props);
        this.state = {
            newVersion: {
                id: -1,
                name: null,
                batchSizeFraction: 0.4,
                denseUnits:100,
                epochs: 10,
                learningRate: 0.00001
            },
            learningRateDec: 1000,
            batchSizeFractionDec: 4,
        }
    }

    private onVersionNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
        let name: string = event.target.value;
        let version = this.state.newVersion;
        version.name = name;
        this.setState({
            newVersion: version
        });
    }

    private onEpochsValueChange(event: React.ChangeEvent<HTMLInputElement>): void{
        let epochs: number = Number(event.target.value);
        let version = this.state.newVersion;
        version.epochs = epochs;
        this.setState({
            newVersion: version
        });
    }

    private onDenseUnitsValueChange(event: React.ChangeEvent<HTMLInputElement>): void{
        let denseUnits: number = Number(event.target.value);
        let version = this.state.newVersion;
        version.denseUnits = denseUnits;
        this.setState({
            newVersion: version
        });
    }

    private onLearningRateValueChange(event: React.ChangeEvent<HTMLInputElement>): void{
        let learningRate: number = 1/Number(event.target.value);
        let learningRateDec: number = Number(event.target.value);
        let version = this.state.newVersion;
        version.learningRate = learningRate;
        this.setState({
            newVersion: version,
            learningRateDec: learningRateDec
        });
    }

    private onBatchSizeFractionValueChange(event: React.ChangeEvent<HTMLInputElement>): void{
        let batchSize: number = Number(event.target.value)/10;
        let batchSizeDec: number = Number(event.target.value);
        let version = this.state.newVersion;
        version.batchSizeFraction = batchSize;
        this.setState({
            newVersion: version,
            batchSizeFractionDec: batchSizeDec
        });
    }





    public render() {
        return (
            <div className="middleOfTheScreen row align-items-center ">
                <div className="col-md-8 offset-md-2 border borderRounded">
                    <div className="row bg-success topBordersRounded">
                        <h4 className="prettyMargin text-white">Creacion de versión:</h4>
                    </div>
                    <form className="smallMarginTop">
                        <div className="form-group row">
                            <label className="col-md-3">Nombre de la versión:</label>
                            <input type="text" className="form-control col-md-4"  onChange={this.onVersionNameChange.bind(this)}></input>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-3">Número de épocas: {this.state.newVersion.epochs}</label>
                            <input type="range"  className="form-control-range col-md-3" value={this.state.newVersion.epochs} min="10" max="40" onChange={this.onEpochsValueChange.bind(this)}></input>
                            <label className="col-md-3">Unidades de densidad: {this.state.newVersion.denseUnits}</label>
                            <input type="range" className="form-control-range col-md-3" value={this.state.newVersion.denseUnits} min="10" max="200" onChange={this.onDenseUnitsValueChange.bind(this)}></input>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-3">Ratio de aprendizaje: 1/{this.state.learningRateDec}</label>
                            <input type="range"  className="form-control-range col-md-3" value={this.state.learningRateDec} min="10" max="10000" onChange={this.onLearningRateValueChange.bind(this)}></input>
                            <label className="col-md-3">Unidades de densidad: {this.state.batchSizeFractionDec}/10</label>
                            <input type="range" className="form-control-range col-md-3" value={this.state.batchSizeFractionDec} min="1" max="10" onChange={this.onBatchSizeFractionValueChange.bind(this)}></input>
                        </div>
                        <div className="row">
                            <button onClick={() => { this.props.onVersionCreated(this.state.newVersion) }} className="btn prettyMargin btn-success offset-md-9 col-md-2">Crear versión</button>
                        </div>
                    </form>
                </div>
            </div >
        );
    }
}