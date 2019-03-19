import React = require("react");
import { Model } from "../../../entities/model";
import { ModelRequests } from "../../../requests/modelRequests";
import { ItemSelect } from "../../../common/itemSelect";
import { ModelCreatorComp } from "./modelCreatorComp";
import { ModelSelectorComp } from "./modelSelectorComp";

interface IModelMainViewCompProps {
    onModelSelectionConfirmed: (model: Model) => void;
}

interface IModelMainViewCompState {
    modelSelectList: Array<ItemSelect<Model>>;
    modelCreationActive: boolean
}


export class ModelMainViewComp extends React.Component<IModelMainViewCompProps, IModelMainViewCompState>{
    constructor(props: IModelMainViewCompProps) {
        super(props);
        this.state = {
            modelCreationActive: false,
            modelSelectList: [
            ]
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
            modelCreationActive: false
        });
        ModelRequests.postCreateModel(model.name).then((newModel) => {
            let selectableModel: ItemSelect<Model> = {
                isSelected: false,
                item: newModel,
                textToShow: newModel.name
            }
            this.state.modelSelectList.push(selectableModel);
            this.forceUpdate();
        });
    }

    private onModelSelected(model: Model): void {
        this.state.modelSelectList.forEach((modelSelect) => {
            if (modelSelect.item == model)
                modelSelect.isSelected = !modelSelect.isSelected;
            else
                modelSelect.isSelected = false;
        });
        this.forceUpdate();
    }

    

    private onCreateModelBtnClick(): void {
        this.setState({ modelCreationActive: true });
    }

    private onDeleteModelBtnClick(): void {
        if(confirm("¿Desea eliminar el modelo seleccioado y todas sus versiones?")){
            ModelRequests.deleteModel(this.getModelSelected().id).then(() => {
                this.removeSelectedModelFromState();
            }); 
        }
    }

    private getModelSelected(): Model{
        return this.state.modelSelectList.find(model => model.isSelected).item;
    }


    private removeSelectedModelFromState() :void{
        let indexToRemove = -1;
        let i = 0;
        let found = false;
        while(i < this.state.modelSelectList.length && !found){
            if(this.state.modelSelectList[i].isSelected){
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

    private renderModelSelection(): JSX.Element {
        return (
            <div className="middleOfTheScreen row align-items-center ">
                <div className="col-md-8 offset-md-2 border borderRounded whiteBg">
                    <ModelSelectorComp
                        modelSelectList={this.state.modelSelectList}
                        onModelSelected={this.onModelSelected.bind(this)}
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
        if (this.state.modelCreationActive)
            return this.renderModelCreation();
        else
            return this.renderModelSelection();
    }
}