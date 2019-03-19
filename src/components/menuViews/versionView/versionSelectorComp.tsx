import React = require("react");
import { ItemSelectorComp } from "../../common/itemSelectorComp";
import { ModelVersion } from "../../../entities/modelVersion";
import { ItemSelect } from "../../../common/itemSelect";

interface VersionSelectorCompProps {
    versionsSelectList: Array<ItemSelect<ModelVersion>>;
    onVersionSelected: (version: ModelVersion) => void;
}

interface VersionSelectorCompState {

}

export class VersionSelectorComp extends React.Component<VersionSelectorCompProps, VersionSelectorCompState>{
    constructor(props: VersionSelectorCompProps) {
        super(props);
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
                    ></ItemSelectorComp>
                </div>
            </div>
        )
    }
}