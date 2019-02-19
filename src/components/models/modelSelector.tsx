import React = require("react");
import { ModelRequest } from "../../requests/modelRequests";

interface IModelSelectorProps {
    onModelConfirmed: (modelName: string) => void;
    onCreateModel: () => void;
}

interface IModelSelectorState {
    modelsNames: Array<string>;
    selectedModelName: string;
}


export class ModelSelector extends React.Component<IModelSelectorProps, IModelSelectorState>{
    constructor(props: IModelSelectorProps) {
        super(props);
        this.state = {
            modelsNames: new Array<string>(),
            selectedModelName: null
        }
    }

    public componentDidMount() {
        this.RequestModelsNames();
    }

    private RequestModelsNames(): void {
        ModelRequest.GetModelsNames().then((names: Array<string>) => {
            this.setState({ modelsNames: name });
        });
    }

    private ShowModelsNames(): Array<JSX.Element> {
        let res: Array<JSX.Element> = new Array<JSX.Element>();
        if(this.state.modelsNames.length > 0){
            this.state.modelsNames.forEach((name, index) => {
                res.push(
                    <div>
                        <button key={index} onClick={() => this.props.onModelConfirmed(name)}>{name}</button>
                    </div>
                )
            });
        }
        else{
            res.push(<div key="0">No existen modelos</div>)
        }
        return res;
    }

    public render(): JSX.Element {
        let modelNames = this.ShowModelsNames();
        return (
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <div>
                        <h4>Seleccione modelo:</h4>
                    </div>
                    <div>
                        {modelNames}
                    </div>
                    <div className="row " >
                        <div className="col-md-4 offset-md-4 pointerCursor border" onClick={() => { this.props.onCreateModel() }}>
                            <button id="addBtn" ></button>
                            <span>Crear modelo</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}