import React = require("react");
import { Model } from "../../../entities/model";
import { ModelRequests } from "../../../requests/modelRequests";
import { SelectableItem } from "../../../common/selectableItem";
import { ModelCreator } from "./modelCreator";
import { ModelSelector } from "./modelSelector";
import { DotLoader } from "react-spinners";
import { ApplicationState } from "../../../applicationState";

interface IModelMainViewProps {
    onModelSelectionConfirmed: (model: Model) => void;
    appStateModel: Model
}

interface IModelMainViewState {
    modelSelectList: Array<SelectableItem<Model>>;
    modelCreationActive: boolean,
    loading: boolean;
}


export class ModelMainView extends React.Component<IModelMainViewProps, IModelMainViewState>{
    constructor(props: IModelMainViewProps) {
        super(props);
        this.state = {
            modelCreationActive: false,
            modelSelectList: [
            ],
            loading: false,
        }
    }

    public componentDidMount() {
        this.requestModelsNames();
    }


    private requestModelsNames(): void {
        ModelRequests.getModels().then((models: Array<Model>) => {
            this.setState({
                modelSelectList: models.map((modelItem, index) => {
                    return {
                        item: modelItem,
                        isSelected: false,
                        textToShow: modelItem.name,
                    };
                })
            });
        });
    }

    private onModelCreated(model: Model) {
        this.setState({
            modelCreationActive: false,
            loading: true,
        });
        try {
            ModelRequests.postCreateModel(model.name).then((newModel) => {
                let selectableModel: SelectableItem<Model> = {
                    isSelected: false,
                    item: newModel,
                    textToShow: newModel.name
                }
                let aux = this.state.modelSelectList;
                aux.push(selectableModel);
                this.setState({
                    loading: false,
                    modelSelectList: aux
                });
            }).catch(( err) => {
                alert("Se ha producido un error");
                console.error(err)
            })
        }
        catch (err) {
            this.setState({loading: false});
            alert("Se ha producido un error en el servidor");
            console.error(err);
        }
    }

    private onModelSelected(model: Model): void {
        let aux = this.state.modelSelectList;
        aux.forEach((modelSelect) => {
            if (modelSelect.item == model)
                modelSelect.isSelected = !modelSelect.isSelected;
            else
                modelSelect.isSelected = false;
        });
        this.setState({modelSelectList: aux});
    }



    private onCreateModelBtnClick(): void {
        this.setState({ modelCreationActive: true });
    }

    private onDeleteModelBtnClick(): void {
        if (confirm("¿Desea eliminar el modelo seleccioado y todas sus versiones?")) {
            ModelRequests.deleteModel(this.getModelSelected().id).then(() => {
                this.removeSelectedModelFromState();
            });
        }
    }

    private getModelSelected(): Model {
        return this.state.modelSelectList.find(model => model.isSelected).item;
    }


    private removeSelectedModelFromState(): void {
        let indexToRemove = -1;
        let i = 0;
        let found = false;
        while (i < this.state.modelSelectList.length && !found) {
            if (this.state.modelSelectList[i].isSelected) {
                indexToRemove = i;
                found = true;
            }
            i++;
        }
        this.state.modelSelectList.splice(indexToRemove, 1);
        this.forceUpdate();
    }

    private renderModelCreation(): JSX.Element {
        return (
            <ModelCreator
                onModelCreated={this.onModelCreated.bind(this)}
            ></ModelCreator>
        );
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

    private renderModelSelection(): JSX.Element {
        return (
            <div className="middleOfTheScreen row align-items-center ">
                <div className="col-md-8 offset-md-2 border borderRounded whiteBg">
                    <ModelSelector
                        modelSelectList={this.state.modelSelectList}
                        onModelSelected={this.onModelSelected.bind(this)}
                        appStateModel={this.props.appStateModel}
                    ></ModelSelector>
                    <div className="spaceBetweenContent" >
                        <span className=" noRigthMargin btn pointerCursor btn-light" onClick={this.onCreateModelBtnClick.bind(this)}>
                            <img id="addBtn" className="borderRounded"></img>
                            <span>Crear categoría</span>
                        </span>
                        <span hidden={this.state.modelSelectList.every(model => !model.isSelected)} className=" noRigthMargin btn pointerCursor btn-light" onClick={this.onDeleteModelBtnClick.bind(this)}>
                            <img id="removeBtn" className="borderRounded"></img>
                            <span>Borrar categoría</span>
                        </span>
                        <button hidden={this.state.modelSelectList.every(model => !model.isSelected)} onClick={() => this.props.onModelSelectionConfirmed(this.getModelSelected())} className="btn noLeftMargin secondaryColorBg">Confirmar selección</button>
                    </div>
                </div>
            </div>
        );
    }

    public render(): JSX.Element {
        if (this.state.loading)
            return this.onLoading();
        else {
            if (this.state.modelCreationActive)
                return this.renderModelCreation();
            else
                return this.renderModelSelection();
        }
    }
}