import React = require("react");
import { ModelVersion } from "../../../entities/models/modelVersion";
import { DynamicModelClassInputsGeneratorComp } from "../modelSelectorAndCreatorView/dynamicModelClassInputsGeneratorComp";
import { ClassItem } from "../../../entities/models/modelClass";


interface IVersionCreatorCompProps {
    onVersionCreated: (newVersion: ModelVersion) => void;
}

interface IVersionCreatorCompState {
    newVersion: ModelVersion;

}

export class VersionCreatorComp extends React.Component<IVersionCreatorCompProps, IVersionCreatorCompState>{
    constructor(props: IVersionCreatorCompProps) {
        super(props);
        this.state = {
            newVersion: {
                id: -1,
                name: null,
                classes: []
            },
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
                        <DynamicModelClassInputsGeneratorComp
                            classes={this.state.newVersion.classes}
                            onClassNameChange={this.onClassNameChange.bind(this)}
                        ></DynamicModelClassInputsGeneratorComp>
                        <div className="spaceBetweenContent" >
                            <span className=" noLeftMargin  btn pointerCursor btn-light" onClick={this.onAddNewClassBtnClick.bind(this)}>
                                <img id="addBtn"></img>
                                <span>Añadir clase</span>
                            </span>
                            <div>
                                <button hidden={this.state.newVersion.classes.length < 2} onClick={() => { this.props.onVersionCreated(this.state.newVersion) }} className="btn secondaryColorBg">Crear versión</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        );
    }
}