import React = require("react");
import { ModelVersion } from "../../../entities/models/modelVersion";
import { ItemSelect } from "../../../entities/itemSelect";
import { VersionCreatorComp } from "./versionCreatorComp";
import { ItemSelectorComp } from "../../common/itemSelectorAndCreator/itemSelectorComp";
import { ApplicationState } from "../../../applicationState";
import { ModelRequests } from "../../../requests/modelRequests";

interface IVersionSelectorAndCreatorCompProps {
    onVersionSelectionConfirmed: (version: ModelVersion) => void;
}

interface IVersionSelectorAndCreatorCompState {
    versionsSelectList: Array<ItemSelect<ModelVersion>>;
    versionCreationActive: boolean
}


export class VersionSelectorAndCreatorComp extends React.Component<IVersionSelectorAndCreatorCompProps, IVersionSelectorAndCreatorCompState>{
    constructor(props: IVersionSelectorAndCreatorCompProps) {
        super(props);
        this.state = {
            versionCreationActive: false,
            versionsSelectList: [
                { isSelected: false, textToShow: "Version1", item: {id: -1, name: "Version1", learningRate: 0.00001, epochs: 10, denseUnits: 100, batchSizeFraction: 0.4} },
                { isSelected: false, textToShow: "Version2", item: {id: -1, name: "Version2", learningRate: 0.00001, epochs: 10, denseUnits: 100, batchSizeFraction: 0.4}},
                { isSelected: false, textToShow: "Version3", item: {id: -1, name: "Version3", learningRate: 0.00001, epochs: 10, denseUnits: 100, batchSizeFraction: 0.4}},
                { isSelected: false, textToShow: "Version4", item: {id: -1, name: "Version4", learningRate: 0.00001, epochs: 10, denseUnits: 100, batchSizeFraction: 0.4}},
            ]
        }

    }

    public componentDidMount() {
        this.requestVersionsNames();
    }

    private requestVersionsNames(): void {
        
    }

    private onVersionCreated(version: ModelVersion){
        this.setState({
            versionCreationActive: false
        });
        this.requestVersionsNames();
    }

    private onVersionSelected(versionSel: ModelVersion): void {
        this.state.versionsSelectList.forEach((version) => {
            if (version.item == versionSel)
                version.isSelected = !version.isSelected;
            else
                version.isSelected = false;
        });
        this.forceUpdate();
    }

    private renderVersionCreation(): JSX.Element{
        return (
            <VersionCreatorComp
               onVersionCreated={this.onVersionCreated.bind(this)} 
            ></VersionCreatorComp>
        );
    }

    private onCreateVersionBtnClick(): void{
        this.setState({versionCreationActive: true});
    }

    private renderVersionSelection(): JSX.Element{
        return (
            <div className="middleOfTheScreen row align-items-center ">
                <div className="col-md-8 offset-md-2 border borderRounded">
                    <div className="row bg-success topBordersRounded">
                        <h4 className="prettyMargin text-white">Seleccione version:</h4>
                    </div>
                    <div>
                        <ItemSelectorComp<ModelVersion>
                            itemSelectionList={this.state.versionsSelectList}
                            onItemSelected={this.onVersionSelected.bind(this)}
                        ></ItemSelectorComp>
                    </div>
                    <div className="spaceBetweenContent" >
                        <span className=" noRigthMargin  btn pointerCursor btn-light" onClick={this.onCreateVersionBtnClick.bind(this)}>
                            <img id="addBtn"></img>
                            <span>Crear version</span>
                        </span>
                        <button hidden={this.state.versionsSelectList.every(version => !version.isSelected)} className="btn noLeftMargin btn-success">Confirmar selección</button>
                    </div>
                </div>
            </div>
        );
    }

    public render(): JSX.Element {
        if(this.state.versionCreationActive)
            return this.renderVersionCreation();
        else
            return this.renderVersionSelection();
    }
}