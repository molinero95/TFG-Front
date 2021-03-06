import React = require("react");
import { Model } from "../../../entities/model";

interface IModelCreatorProps {
    onModelCreated: (newModel: Model) => void;
}

interface IModelCreatorState {
    newModel: Model;
}

export class ModelCreator extends React.Component<IModelCreatorProps, IModelCreatorState>{
    constructor(props: IModelCreatorProps) {
        super(props);
        this.state = {
            newModel: {
                id: 0,
                name: "",
                versions: [],
                activeVersion: null,
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

    public render() {
        return (
            <div className="middleOfTheScreen row align-items-center ">
                <div className="col-md-8 offset-md-2 border borderRounded whiteBg">
                    <div className="row primaryColorBg topBordersRounded">
                        <h4 className="prettyMargin text-white">Creacion de categoría:</h4>
                    </div>
                    <form className="smallMarginTop">
                        <div className="form-group row">
                                <label className="col-md-3 text-right">Nombre categoria:</label>
                                <input type="text" className="form-control col-md-4" onChange={this.onModelNameChange.bind(this)}></input>
                        </div>
                        <button
                                onClick={() => { this.props.onModelCreated(this.state.newModel) }}
                                className="btn secondaryColorBg prettyMargin offset-md-9 col-md-2" >Crear categoría
                        </button>
                    </form>
                </div>
            </div >
        );
    }
}