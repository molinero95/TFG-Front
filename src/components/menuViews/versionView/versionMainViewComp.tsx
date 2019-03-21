import React = require("react");
import { ModelVersion } from "../../../entities/modelVersion";
import { ItemSelect } from "../../../common/itemSelect";
import { VersionCreatorComp } from "./versionCreatorComp";
import { ApplicationState } from "../../../applicationState";
import { VersionRequests } from "../../../requests/versionRequests";
import { VersionSelectorComp } from "./versionSelectorComp";
import { DotLoader } from 'react-spinners';


interface IVersionMainViewCompProps {
    onVersionSelectionConfirmed: (version: ModelVersion) => void;
    appStateVersion: ModelVersion
}

interface IVersionMainViewCompState {
    versionsSelectList: Array<ItemSelect<ModelVersion>>;
    versionCreationActive: boolean
    loading: boolean;
}


export class VersionMainViewComp extends React.Component<IVersionMainViewCompProps, IVersionMainViewCompState>{
    constructor(props: IVersionMainViewCompProps) {
        super(props);
        this.state = {
            versionCreationActive: false,
            versionsSelectList: [],
            loading: false
        }

    }

    public componentDidMount() {
        if (ApplicationState.model == null)
            alert("No hay modelo seleccionado");
        else
            this.requestModelVersions();
    }

    private requestModelVersions(): void {
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
        this.setState({ loading: true })
        try {
            VersionRequests.postCreateVersion(version).then((id) => {
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
                    versionsSelectList: versions,
                    loading: false
                });
            });
        }
        catch (err) {
            alert("Se ha producido un error en el servidor");
            console.error(err);
            this.setState({
                loading: false
            })
        }

    }

    private onVersionSelected(versionSel: ModelVersion): void {
        let aux = this.state.versionsSelectList;
        aux.forEach((version) => {
            if (version.item == versionSel)
                version.isSelected = !version.isSelected;
            else
                version.isSelected = false;
        });
        this.setState({
            versionsSelectList: aux
        });
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

    private onLoading(): JSX.Element {
        return (
            <div className="middleOfTheScreen centerContent row align-items-center ">
                <DotLoader
                    size={200}
                    color={"#D78193"}
                    loading={this.state.loading}
                ></DotLoader>
            </div>
        );
    }

    private renderVersionSelection(): JSX.Element {
        return (
            <div className="middleOfTheScreen row align-items-center ">
                <div className="col-md-8 whiteBg offset-md-2 border borderRounded">
                    <VersionSelectorComp
                        appStateVersion={this.props.appStateVersion}
                        onVersionSelected={this.onVersionSelected.bind(this)}
                        versionsSelectList={this.state.versionsSelectList}
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
        if (this.state.loading) {
            return this.onLoading();
        }
        else {
            if (this.state.versionCreationActive)
                return this.renderVersionCreation();
            else
                return this.renderVersionSelection();
        }
    }
}