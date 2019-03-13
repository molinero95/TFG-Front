import React = require("react");
import { ModelVersion } from "../../../entities/models/modelVersion";
import { ItemSelect } from "../../../entities/itemSelect";
import { VersionCreatorComp } from "./versionCreatorComp";
import { ItemSelectorComp } from "../../common/itemSelectorAndCreator/itemSelectorComp";
import { ApplicationState } from "../../../applicationState";
import { VersionRequests } from "../../../requests/versionRequests";

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
                { isSelected: false, textToShow: "Version1", item: { id: -1, name: "Version1", classes: [] } },
                { isSelected: false, textToShow: "Version2", item: { id: -1, name: "Version2", classes: [] } },
                { isSelected: false, textToShow: "Version3", item: { id: -1, name: "Version3", classes: [] } },
                { isSelected: false, textToShow: "Version4", item: { id: -1, name: "Version4", classes: [] } },
                { isSelected: false, textToShow: "Version5", item: { id: -1, name: "Version5", classes: [] } },
                { isSelected: false, textToShow: "Version6", item: { id: -1, name: "Version6", classes: [] } },
            ]
        }

    }



    public componentDidMount() {
        if (ApplicationState.model == null)
            alert("No hay modelo seleccionado");
        else 
            this.requestVersionsNames();
    }

    private requestVersionsNames(): void {
        VersionRequests.getModelVersions(ApplicationState.model.name).then((versions) => {
            let arrayVers = new Array<ItemSelect<ModelVersion>>();
            versions.forEach(version => {
                let itemSelect: ItemSelect<ModelVersion> = {
                    isSelected: false,
                    item: version,
                    textToShow: version.name
                };
                arrayVers.push(itemSelect);
            });
            this.setState({versionsSelectList: arrayVers});
        });
    }

    //TODO
    private onVersionCreated(version: ModelVersion) {
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

    private renderVersionCreation(): JSX.Element {
        return (
            <VersionCreatorComp
                onVersionCreated={this.onVersionCreated.bind(this)}
            ></VersionCreatorComp>
        );
    }

    private onCreateVersionBtnClick(): void {
        this.setState({ versionCreationActive: true });
    }

    private getVersionSelected(): ModelVersion {
        return this.state.versionsSelectList.find(version => version.isSelected).item;
    }

    
    private onDeleteVersionBtnClick(): void {
        if(confirm("¿Desea eliminar la versión seleccionada?")){
            VersionRequests.deleteVersion(ApplicationState.model.name ,this.getVersionSelected().name).then(() => {
                this.removeSelectedVersionFromState();
            });
        }
    }


    private removeSelectedVersionFromState() :void{
        let indexToRemove = -1;
        let i = 0;
        let found = false;
        while(i < this.state.versionsSelectList.length && !found){
            if(this.state.versionsSelectList[i].isSelected){
                indexToRemove = i;
                found = true;
            }
            i++;
        }
        this.state.versionsSelectList.splice(indexToRemove, 1);
    }

    private renderVersionSelection(): JSX.Element {
        return (
            <div className="middleOfTheScreen row align-items-center ">
                <div className="col-md-8 whiteBg offset-md-2 border borderRounded">
                    <div className="row primaryColorBg topBordersRounded">
                        <h4 className="prettyMargin text-white">Seleccione version:</h4>
                    </div>
                    <div className="notMaxHeigth scrollAuto">
                        <ItemSelectorComp<ModelVersion>
                            itemSelectionList={this.state.versionsSelectList}
                            onItemSelected={this.onVersionSelected.bind(this)}
                        ></ItemSelectorComp>
                    </div>
                    <div className="spaceBetweenContent" >
                        <span className=" noRigthMargin  btn pointerCursor btn-light" onClick={this.onCreateVersionBtnClick.bind(this)}>
                            <img id="addBtn" className="borderRounded"></img>
                            <span>Crear versión</span>
                        </span>
                        <span hidden={this.state.versionsSelectList.every(version => !version.isSelected)} className=" noRigthMargin btn pointerCursor btn-light" onClick={this.onDeleteVersionBtnClick.bind(this)}>
                            <img id="removeBtn" className="borderRounded"></img>
                            <span>Borrar version</span>
                        </span>
                        <button hidden={this.state.versionsSelectList.every(version => !version.isSelected)} onClick={() => this.props.onVersionSelectionConfirmed(this.getVersionSelected())} className="btn noLeftMargin secondaryColorBg">Confirmar selección</button>
                    </div>
                </div>
            </div>
        );
    }

    public render(): JSX.Element {
        if (this.state.versionCreationActive)
            return this.renderVersionCreation();
        else
            return this.renderVersionSelection();
    }
}