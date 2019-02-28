import React = require("react");
import { Model } from "../../../entities/models/model";
import { DynamicModelClassInputsGeneratorComp } from "./dynamicModelClassInputsGeneratorComp";
import { ModelClass } from "../../../entities/models/modelClass";

interface IModelCreatorCompProps {
    onModelCreated: (newModel: Model) => void;
}

interface IModelCreatorCompState {
    newModel: Model;
}

export class ModelCreatorComp extends React.Component<IModelCreatorCompProps, IModelCreatorCompState>{
    constructor(props: IModelCreatorCompProps) {
        super(props);
        this.state = {
            newModel: {
                id: 0,
                name: "",
                versions: [],
                activeVersion: null,
                clases: []
            }
        }
    }

    private onModelNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
        let name: string = event.target.value;
        let model = this.state.newModel;
        model.name = name;
        this.setState({
            newModel: model
        });
    }


    private onModelClassNameChange(newName: string, modelClass: ModelClass): void {
        let model = this.state.newModel;
        model.clases.find(modClass => modClass == modelClass).name = newName;
        this.setState({
            newModel: model
        });
    }

    private onAddNewModelBtnClick(): void {
        let model = this.state.newModel;
        model.clases.push({ id: model.clases.length, name: "" })  //Lo del ID es temporal
        this.setState({
            newModel: model
        });
    }


    public render() {
        return (
            <div className="middleOfTheScreen row align-items-center ">
                <div className="col-md-8 offset-md-2 border borderRounded">
                    <div className="row bg-success topBordersRounded">
                        <h4 className="prettyMargin text-white">Creacion de modelo:</h4>
                    </div>
                    <form className="smallMarginTop">
                        <div className="form-group row">
                                <label className="col-md-3 text-right">Nombre modelo:</label>
                                <input type="text" className="form-control col-md-4" onChange={this.onModelNameChange.bind(this)}></input>
                        </div>
                        <DynamicModelClassInputsGeneratorComp
                            classes={this.state.newModel.clases}
                            onModelClassChange={this.onModelClassNameChange.bind(this)}
                        ></DynamicModelClassInputsGeneratorComp>
                        <div className="spaceBetweenContent" >
                            <span className=" noRigthMargin  btn pointerCursor btn-light" onClick={this.onAddNewModelBtnClick.bind(this)}>
                                <img id="addBtn"></img>
                                <span>Añadir clase</span>
                            </span>
                            <button
                                hidden={this.state.newModel.clases.length < 2}
                                onClick={() => { this.props.onModelCreated(this.state.newModel) }}
                                className="btn noLeftMargin btn-success">Crear modelo
                        </button>
                        </div>
                    </form>
                </div>
            </div >
        );
    }
}