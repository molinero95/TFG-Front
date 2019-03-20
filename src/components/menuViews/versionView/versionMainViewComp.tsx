import React = require("react");
import { ModelVersion } from "../../../entities/modelVersion";
import { ItemSelect } from "../../../common/itemSelect";
import { VersionCreatorComp } from "./versionCreatorComp";
import { ApplicationState } from "../../../applicationState";
import { VersionRequests } from "../../../requests/versionRequests";
import { VersionSelectorComp } from "./versionSelectorComp";

interface IVersionMainViewCompProps {
    onVersionSelectionConfirmed: (version: ModelVersion) => void;
}

interface IVersionMainViewCompState {
    versionsSelectList: Array<ItemSelect<ModelVersion>>;
    versionCreationActive: boolean
}


export class VersionMainViewComp extends React.Component<IVersionMainViewCompProps, IVersionMainViewCompState>{
    constructor(props: IVersionMainViewCompProps) {
        super(props);
        this.state = {
            versionCreationActive: false,
            versionsSelectList: []
        }

    }

    public componentDidMount() {
        if (ApplicationState.model == null)
            alert("No hay modelo seleccionado");
        else
            this.requestVersionsNames();
    }

    private requestVersionsNames(): void {
        VersionRequests.getModelVersions(ApplicationState.model.id).then((versions) => {
            if (versions) {
                let arrayVers = new Array<ItemSelect<ModelVersion>>();
                versions.forEach(version => {
                    let itemSelect: ItemSelect<ModelVersion> = {
                        isSelected: false,
                        item: version,
                        textToShow: version.name
                    };
                    arrayVers.push(itemSelect);
                });
                this.setState({ versionsSelectList: arrayVers });
            }
        });
    }


    private onVersionCreated(version: ModelVersion) {
        VersionRequests.postCreateVersion(version).then( (id) => {
            version.id = id;
            let selItem: ItemSelect<ModelVersion> = {
                isSelected: false,
                item: version,
                textToShow: version.name
            }
            let versions = this.state.versionsSelectList;
            versions.push(selItem);
            this.setState({
                versionCreationActive: false,
                versionsSelectList: versions
            });
        });
        
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
        if (confirm("¿Desea eliminar la versión seleccionada?")) {
            VersionRequests.deleteVersion(ApplicationState.model.id, this.getVersionSelected().name).then(() => {
                this.removeSelectedVersionFromState();
            });
        }
    }


    private removeSelectedVersionFromState(): void {
        let indexToRemove = -1;
        let i = 0;
        let found = false;
        while (i < this.state.versionsSelectList.length && !found) {
            if (this.state.versionsSelectList[i].isSelected) {
                indexToRemove = i;
                found = true;
            }
            i++;
        }
        let aux = this.state.versionsSelectList;
        aux.splice(indexToRemove, 1);
        this.setState({
            versionsSelectList: aux
        });
    }

    private renderVersionSelection(): JSX.Element {
        return (
            <div className="middleOfTheScreen row align-items-center ">
                <div className="col-md-8 whiteBg offset-md-2 border borderRounded">
                    <VersionSelectorComp
                        onVersionSelected = {this.onVersionSelected.bind(this)}
                        versionsSelectList = {this.state.versionsSelectList}
                    ></VersionSelectorComp>
                    <div className="spaceBetweenContent" >
                        <span hidden={ApplicationState.model == null} className=" noRigthMargin  btn pointerCursor btn-light" onClick={this.onCreateVersionBtnClick.bind(this)}>
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