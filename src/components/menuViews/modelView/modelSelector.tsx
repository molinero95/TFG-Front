import React = require("react");
import { ItemSelector } from "../../common/itemSelector";
import { Model } from "../../../entities/model";
import { SelectableItem } from "../../../common/selectableItem";
import { ApplicationState } from "../../../applicationState";

interface ModelSelectorProps {
    onModelSelected: (model: Model) => void;
    modelSelectList: Array<SelectableItem<Model>>;
    appStateModel: Model;
}

interface ModelSelectorState {

}
//TODO: Intentar combinar con modelSelector
export class ModelSelector extends React.Component<ModelSelectorProps, ModelSelectorState> {

    constructor(props: ModelSelectorProps) {
        super(props);
    }
    private getItemSelectConfirmed():Model{
        if(this.props.appStateModel)
            return this.props.appStateModel
        return null;
    }

    public render() {
        return (
            <div>
                <div className="row topBordersRounded primaryColorBg">
                    <h4 className="prettyMargin text-white">Seleccione modelo:</h4>
                </div>
                <div className="notMaxHeigth scrollAuto">
                    <ItemSelector
                        itemSelectionList={this.props.modelSelectList}
                        onItemSelected={this.props.onModelSelected}
                        itemSelectConfirmed={this.getItemSelectConfirmed()}
                    ></ItemSelector>
                </div>
            </div>
        )
    }
}