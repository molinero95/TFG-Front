import React = require("react");
import { ModelVersion } from "../../../entities/models/modelVersion";
import { Model } from "../../../entities/models/model";

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
                activeVersion: null
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

    private onModelInitialVersionNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        let name: string = event.target.value;
        let model = this.state.newModel;
        model.versions = new Array<ModelVersion>();
        model.versions.push({ id: -1, name: name });
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
                    <div>
                        <div className="topBottomPadding smallMarginTop row smallMarginBottom">
                            <div className="offset-md-1 col-md-5">
                                <label className="smallMarginRight">Nombre:</label>
                                <input type="text" onChange={this.onModelNameChange.bind(this)}></input>
                            </div>
                            <div className="col-md-6">
                                <label className="smallMarginRight">Nombre version inicial:</label>
                                <input type="text" onChange={this.onModelInitialVersionNameChange.bind(this)}></input>
                            </div>
                        </div>
                        <div className="row">
                            <button onClick={() => { this.props.onModelCreated(this.state.newModel) }} className="btn prettyMargin btn-success offset-md-9 col-md-2">Crear modelo</button>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}