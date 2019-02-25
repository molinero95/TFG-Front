import React = require("react");
import { ModelRequest } from "../../requests/modelRequests";
import { SelectableModel } from "./selection/selectableModel";
import { ModelSelect } from "../../entities/models/modelSelect";
import { ModelSelector } from "./selection/modelSelector";

interface IModelSelectorAndCreatorProps {
    onModelConfirmed: (modelName: string) => void;
    onCreateModel: () => void;
}

interface IModelSelectorAndCreatorState {
    models: Array<ModelSelect>;
}


export class ModelSelectorAndCreator extends React.Component<IModelSelectorAndCreatorProps, IModelSelectorAndCreatorState>{
    constructor(props: IModelSelectorAndCreatorProps) {
        super(props);
        this.state = {
            models: [
                { isSelected: false, modelName: "Modelo1" },
                { isSelected: false, modelName: "Modelo2" },
                { isSelected: false, modelName: "Modelo3" },
                { isSelected: false, modelName: "Modelo4" },
            ]
        }
    }

    public componentDidMount() {
        this.requestModelsNames();
    }

    private requestModelsNames(): void {
        ModelRequest.getModelsNames().then((names: Array<string>) => {
            this.setState({
                models: names.map((item, index) => {
                    return {
                        modelName: item,
                        isSelected: false,
                        localId: index
                    };
                })
            });
        });
    }


    private onModelSelected(modelSelected: ModelSelect): void {
        this.state.models.map((model) => {
            if (model == modelSelected)
                model.isSelected = !model.isSelected;
            else
                model.isSelected = false;
        });
        this.forceUpdate();
    }

    public render(): JSX.Element {
        return (
            <div className="middleOfTheScreen row align-items-center ">
                <div className="col-md-8 offset-md-2 border borderRounded">
                    <div className="row bg-success topBordersRounded">
                        <h4 className="prettyMargin">Seleccione modelo:</h4>
                    </div>
                    <div>
                        <ModelSelector
                            modelList={this.state.models}
                            onModelSelected={this.onModelSelected.bind(this)}
                        ></ModelSelector>
                    </div>
                    <div className="spaceBetweenContent" >
                        <span className=" noRigthMargin  btn pointerCursor btn-light" onClick={() => { this.props.onCreateModel() }}>
                            <img id="addBtn"></img>
                            <span>Crear modelo</span>
                        </span>
                        <button hidden={this.state.models.every(model => !model.isSelected)} className="btn noLeftMargin btn-success">Confirmar selección</button>
                    </div>
                </div>
            </div>
        );
    }
}