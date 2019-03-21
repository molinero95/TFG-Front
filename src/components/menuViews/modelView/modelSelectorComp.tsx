import React = require("react");
import { ItemSelectorComp } from "../../common/itemSelectorComp";
import { Model } from "../../../entities/model";
import { ItemSelect } from "../../../common/itemSelect";
import { ApplicationState } from "../../../applicationState";

interface ModelSelectorCompProps {
    onModelSelected: (model: Model) => void;
    modelSelectList: Array<ItemSelect<Model>>;
    appStateModel: Model;
}

interface ModelSelectorCompState {

}

export class ModelSelectorComp extends React.Component<ModelSelectorCompProps, ModelSelectorCompState> {

    constructor(props: ModelSelectorCompProps) {
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
                    <ItemSelectorComp
                        itemSelectionList={this.props.modelSelectList}
                        onItemSelected={this.props.onModelSelected}
                        itemSelectConfirmed={this.getItemSelectConfirmed()}
                    ></ItemSelectorComp>
                </div>
            </div>
        )
    }
}