import React = require("react");
import { ModelVersion } from "../../../entities/models/modelVersion";
import { DynamicModelClassInputsGeneratorComp } from "../modelSelectorAndCreatorView/dynamicModelClassInputsGeneratorComp";
import { ModelClass } from "../../../entities/models/modelClass";


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
                learningRate: 0.00001,
                classes: []
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

    private onClassNameChange(newName: string, classItem: ModelClass): void {
        let version = this.state.newVersion;
        version.classes.find(versionClass => versionClass.name == classItem.name).name = newName;
        this.setState({
            newVersion: version
        });
    }

    private onAddNewClassBtnClick(){
        let version = this.state.newVersion;
        version.classes.push({ id: version.classes.length, name: "" })  //Lo del ID es temporal
        this.setState({
            newVersion: version
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
                            <label className="col-md-3 text-right">Nombre de la versión:</label>
                            <input type="text" className="form-control col-md-4"  onChange={this.onVersionNameChange.bind(this)}></input>
                        </div>
                        <div className="form-group row">
                            <label className="offset-md-1 col-md-3 text-right">Número de épocas: {this.state.newVersion.epochs}</label>
                            <input type="range"  className="form-control-range col-md-2" value={this.state.newVersion.epochs} min="10" max="40" onChange={this.onEpochsValueChange.bind(this)}></input>
                            <label className="col-md-3 text-right">Unidades de densidad: {this.state.newVersion.denseUnits}</label>
                            <input type="range" className="form-control-range col-md-2" value={this.state.newVersion.denseUnits} min="10" max="200" onChange={this.onDenseUnitsValueChange.bind(this)}></input>
                        </div>
                        <div className="form-group row">
                            <label className="offset-md-1 col-md-3 text-right">Ratio de aprendizaje: 1/{this.state.learningRateDec}</label>
                            <input type="range"  className="form-control-range col-md-2" value={this.state.learningRateDec} min="10" max="10000" onChange={this.onLearningRateValueChange.bind(this)}></input>
                            <label className="col-md-3 text-right">Unidades de densidad: {this.state.batchSizeFractionDec}/10</label>
                            <input type="range" className="form-control-range col-md-2" value={this.state.batchSizeFractionDec} min="1" max="10" onChange={this.onBatchSizeFractionValueChange.bind(this)}></input>
                        </div>
                        <DynamicModelClassInputsGeneratorComp
                            classes={this.state.newVersion.classes}
                            onClassNameChange={this.onClassNameChange.bind(this)}
                        ></DynamicModelClassInputsGeneratorComp>
                        <div className="spaceBetweenContent" >
                            <span className=" noLeftMargin  btn pointerCursor btn-light" onClick={this.onAddNewClassBtnClick.bind(this)}>
                                <img id="addBtn"></img>
                                <span>Añadir clase</span>
                            </span>
                            <button hidden={this.state.newVersion.classes.length < 2} onClick={() => { this.props.onVersionCreated(this.state.newVersion) }} className="btn btn-success">Crear versión</button>
                        </div>
                    </form>
                </div>
            </div >
        );
    }
}