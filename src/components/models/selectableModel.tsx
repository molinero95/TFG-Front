import React = require("react");
import { ModelRequest } from "../../requests/modelRequests";
import { ModelSelect } from "../../entities/models/modelSelect";

interface ISelectableModelProps {
    model: ModelSelect
    onModelSelected: (model: ModelSelect) => void;
}

interface ISelectableModelState {

}


export class SelectableModel extends React.Component<ISelectableModelProps, ISelectableModelState>{

    public constructor(props: ISelectableModelProps) {
        super(props);
        this.state = {

        }
    }
    public render() {
        if (this.props.model.isSelected) {
            return (
                <div className="btn btn-light maxWidth topBottomPadding pointerCursor smallMarginTop" onClick={() => this.props.onModelSelected(this.props.model)}>
                    <span className="modelSelected">{this.props.model.modelName}</span>
                </div>
            );
        }
        else {
            return (
                <div className="btn btn-light maxWidth topBottomPadding pointerCursor smallMarginTop " onClick={() => this.props.onModelSelected(this.props.model)}>
                    <span>{this.props.model.modelName}</span>
                </div>
            );
        }
    }

}