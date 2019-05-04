import React = require("react");
import { ItemSelector } from "../../common/itemSelector";
import { ModelVersion } from "../../../entities/modelVersion";
import { SelectableItem } from "../../../common/selectableItem";

interface VersionSelectorProps {
    versionsSelectList: Array<SelectableItem<ModelVersion>>;
    onVersionSelected: (version: ModelVersion) => void;
    appStateVersion: ModelVersion;
}

interface VersionSelectorState {

}

export class VersionSelector extends React.Component<VersionSelectorProps, VersionSelectorState>{
    constructor(props: VersionSelectorProps) {
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
                    <ItemSelector<ModelVersion>
                        itemSelectionList={this.props.versionsSelectList}
                        onItemSelected={this.props.onVersionSelected}
                        itemSelectConfirmed={this.getItemSelectConfirmed()}
                    ></ItemSelector>
                </div>
            </div>
        )
    }
}