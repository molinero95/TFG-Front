import React = require("react");
import { ModelSelect } from "../../../entities/UI/models/modelSelect";
import { SelectableModel } from "./selectableModel";

interface IModelSelectorProps {
    modelList: Array<ModelSelect>;
    onModelSelected: (model: ModelSelect) => void;
}

interface IModelSelectorState {
}


export class ModelSelector extends React.Component<IModelSelectorProps, IModelSelectorState>{

    public constructor(props: IModelSelectorProps){
        super(props);
    }


    public render():JSX.Element {
        let res: Array<JSX.Element> = new Array<JSX.Element>();
        if (this.props.modelList.length > 0) {
            this.props.modelList.forEach((model, index) => {
                res.push(
                    <SelectableModel
                        key={index}
                        model={model}
                        onModelSelected={() => {this.props.onModelSelected(model)}}
                    ></SelectableModel>
                );
            });
        }
        else {
            res.push(<div key="0">No existen modelos</div>)
        }
      return (
        <div>
            {res}
        </div>
      )
    }

}