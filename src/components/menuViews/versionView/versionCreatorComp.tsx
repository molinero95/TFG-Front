import React = require("react");
import { ModelVersion } from "../../../entities/modelVersion";
import { DynamicClassInputsComp } from "./dynamicClassInputsComp";
import { ClassItem } from "../../../entities/classItem";


interface IVersionCreatorCompProps {
    onVersionCreated: (newVersion: ModelVersion) => void;
}

interface IVersionCreatorCompState {
    newVersion: ModelVersion;
    learningRateDec: number;

}

export class VersionCreatorComp extends React.Component<IVersionCreatorCompProps, IVersionCreatorCompState>{
    constructor(props: IVersionCreatorCompProps) {
        super(props);
        this.state = {
            newVersion: {
                id: -1,
                name: null,
                classes: [],
                denseUnits: 100,
                learningRate: 0.0001,
            },
            learningRateDec: 10000
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


    private onClassNameChange(newName: string, classItem: ClassItem): void {
        let version = this.state.newVersion;
        version.classes.find(versionClass => versionClass.name == classItem.name).name = newName;
        this.setState({
            newVersion: version
        });
    }

    private onAddNewClassBtnClick() {
        let version = this.state.newVersion;
        version.classes.push({ id: version.classes.length, name: "" })  //Lo del ID es temporal
        this.setState({
            newVersion: version
        });
    }

    private onDenseUnitsChange(event: React.ChangeEvent<HTMLInputElement>): void {
        let val = Number(event.target.value);
        let version = this.state.newVersion;
        version.denseUnits = val;
        this.setState({
            newVersion: version
        });
    }

    private onLearningRateValueChange(event: React.ChangeEvent<HTMLInputElement>): void{
        let val = Number(event.target.value);
        let version = this.state.newVersion;
        version.learningRate = 1/val;
        this.setState({
            newVersion: version,
            learningRateDec: val
        });

    }


    public render() {
        return (
            <div className="middleOfTheScreen row align-items-center ">
                <div className="col-md-8 offset-md-2 border borderRounded whiteBg">
                    <div className="row primaryColorBg topBordersRounded">
                        <h4 className="prettyMargin text-white">Creacion de versión:</h4>
                    </div>
                    <form className="smallMarginTop">
                        <div className="form-group row">
                            <label className="col-md-3 text-right">Nombre de la versión:</label>
                            <input type="text" className="form-control col-md-4" onChange={this.onVersionNameChange.bind(this)}></input>
                        </div>
                        <div className="form-group row">
                            <label className="offset-md-1 col-md-2 text-right">Unidades de densidad: {this.state.newVersion.denseUnits}</label>
                            <input type="range" className="form-control-range col-md-3" value={this.state.newVersion.denseUnits} min="10" max="200" onChange={this.onDenseUnitsChange.bind(this)}></input>
                            <label className=" col-md-2 text-right">Ratio de aprendizaje: 1/{this.state.learningRateDec}</label>
                            <input type="range" className="form-control-range col-md-3" value={this.state.learningRateDec} min="10" max="10000" onChange={this.onLearningRateValueChange.bind(this)}></input>
                        </div>
                        <DynamicClassInputsComp
                            classes={this.state.newVersion.classes}
                            onClassNameChange={this.onClassNameChange.bind(this)}
                        ></DynamicClassInputsComp>
                        <div className="spaceBetweenContent" >
                            <span className=" noLeftMargin  btn pointerCursor btn-light" onClick={this.onAddNewClassBtnClick.bind(this)}>
                                <img id="addBtn"></img>
                                <span>Añadir clase</span>
                            </span>
                            <div>
                                <button hidden={this.state.newVersion.classes.length < 2 || this.state.newVersion.classes.some(item => item.name == null || item.name.length == 0)} onClick={() => { this.props.onVersionCreated(this.state.newVersion) }} className="btn secondaryColorBg">Crear versión</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        );
    }
}