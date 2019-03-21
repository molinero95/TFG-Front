import React = require("react");
import { ItemSelectorComp } from "../../common/itemSelectorComp";
import { ModelVersion } from "../../../entities/modelVersion";
import { ItemSelect } from "../../../common/itemSelect";
import { ApplicationState } from "../../../applicationState";

interface VersionSelectorCompProps {
    versionsSelectList: Array<ItemSelect<ModelVersion>>;
    onVersionSelected: (version: ModelVersion) => void;
    appStateVersion: ModelVersion;
}

interface VersionSelectorCompState {

}

export class VersionSelectorComp extends React.Component<VersionSelectorCompProps, VersionSelectorCompState>{
    constructor(props: VersionSelectorCompProps) {
        super(props);
    }

    private getItemSelectConfirmed(): ModelVersion{
        if(this.props.appStateVersion)
            return this.props.appStateVersion;
        return null;
    }

    public render() {
        return (
            <div>
                <div className="row primaryColorBg topBordersRounded">
                    <h4 className="prettyMargin text-white">Seleccione version:</h4>
                </div>
                <div className="notMaxHeigth scrollAuto">
                    <ItemSelectorComp<ModelVersion>
                        itemSelectionList={this.props.versionsSelectList}
                        onItemSelected={this.props.onVersionSelected}
                        itemSelectConfirmed={this.getItemSelectConfirmed()}
                    ></ItemSelectorComp>
                </div>
            </div>
        )
    }
}