import React = require("react");
import { Model } from "../../../entities/model";
import { ModelRequests } from "../../../requests/modelRequests";
import { ItemSelect } from "../../../common/itemSelect";
import { ModelCreatorComp } from "./modelCreatorComp";
import { ModelSelectorComp } from "./modelSelectorComp";
import { DotLoader } from "react-spinners";
import { ApplicationState } from "../../../applicationState";

interface IModelMainViewCompProps {
    onModelSelectionConfirmed: (model: Model) => void;
    appStateModel: Model
}

interface IModelMainViewCompState {
    modelSelectList: Array<ItemSelect<Model>>;
    modelCreationActive: boolean,
    loading: boolean;
}


export class ModelMainViewComp extends React.Component<IModelMainViewCompProps, IModelMainViewCompState>{
    constructor(props: IModelMainViewCompProps) {
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
                let selectableModel: ItemSelect<Model> = {
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
            });
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
            <ModelCreatorComp
                onModelCreated={this.onModelCreated.bind(this)}
            ></ModelCreatorComp>
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
                    <ModelSelectorComp
                        modelSelectList={this.state.modelSelectList}
                        onModelSelected={this.onModelSelected.bind(this)}
                        appStateModel={this.props.appStateModel}
                    ></ModelSelectorComp>
                    <div className="spaceBetweenContent" >
                        <span className=" noRigthMargin btn pointerCursor btn-light" onClick={this.onCreateModelBtnClick.bind(this)}>
                            <img id="addBtn" className="borderRounded"></img>
                            <span>Crear modelo</span>
                        </span>
                        <span hidden={this.state.modelSelectList.every(model => !model.isSelected)} className=" noRigthMargin btn pointerCursor btn-light" onClick={this.onDeleteModelBtnClick.bind(this)}>
                            <img id="removeBtn" className="borderRounded"></img>
                            <span>Borrar modelo</span>
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