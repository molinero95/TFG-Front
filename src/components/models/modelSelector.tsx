import React = require("react");
import { ModelRequest } from "../../requests/modelRequests";
import { SelectableModel } from "./selectableModel";
import { ModelSelect } from "../../entities/models/modelSelect";
import { ModelSelectorListView } from "./modelSelectorListView";

interface IModelSelectorProps {
    onModelConfirmed: (modelName: string) => void;
    onCreateModel: () => void;
}

interface IModelSelectorState {
    models: Array<ModelSelect>;
}


export class ModelSelector extends React.Component<IModelSelectorProps, IModelSelectorState>{
    constructor(props: IModelSelectorProps) {
        super(props);
        this.state = {
            models: [
                {isSelected: false, modelName: "Modelo1"},
                {isSelected: false, modelName: "Modelo2"},
                {isSelected: false, modelName: "Modelo3"},
                {isSelected: false, modelName: "Modelo4"},
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
            if(model == modelSelected)
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
                        <ModelSelectorListView
                            modelList={this.state.models}
                            onModelSelected={this.onModelSelected.bind(this)}
                        ></ModelSelectorListView>
                    </div>
                    <div className="spaceBetweenContent" >
                        <button className="btn noLeftMargin btn-success">Confirmar selección</button>
                        <span className=" noRigthMargin  btn pointerCursor btn-light" onClick={() => { this.props.onCreateModel() }}>
                            <img id="addBtn"></img>
                            <span>Crear modelo</span>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}