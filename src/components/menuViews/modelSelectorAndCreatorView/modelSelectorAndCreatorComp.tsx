import React = require("react");
import { Model } from "../../../entities/models/model";
import { ModelRequests } from "../../../requests/modelRequests";
import { ItemSelect } from "../../../entities/itemSelection";
import { ModelCreatorComp } from "./modelCreatorComp";
import { ItemSelectorComp } from "../../common/itemSelectorAndCreator/itemSelectorComp";

interface IModelSelectorAndCreatorCompProps {
    onModelSelectionConfirmed: (model: Model) => void;
}

interface IModelSelectorAndCreatorCompState {
    modelSelectList: Array<ItemSelect<Model>>;
    modelCreationActive: boolean
}


export class ModelSelectorAndCreatorComp extends React.Component<IModelSelectorAndCreatorCompProps, IModelSelectorAndCreatorCompState>{
    constructor(props: IModelSelectorAndCreatorCompProps) {
        super(props);
        this.state = {
            modelCreationActive: false,
            modelSelectList: [
                { isSelected: false, textToShow: "Modelo1", item: {id: -1, name: "Modelo1", versions:[], activeVersion: null} },
                { isSelected: false, textToShow: "Modelo1", item: {id: -1, name: "Modelo2", versions:[], activeVersion: null} },
                { isSelected: false, textToShow: "Modelo1", item: {id: -1, name: "Modelo3", versions:[], activeVersion: null} },
                { isSelected: false, textToShow: "Modelo1", item: {id: -1, name: "Modelo4", versions:[], activeVersion: null} },
            ]
        }
    }

    public componentDidMount() {
        this.requestModelsNames();
    }

    private requestModelsNames(): void {
        ModelRequests.getModelsNames().then((names: Array<string>) => {
            this.setState({
                modelSelectList: names.map((item, index) => {
                    return {
                        item: {
                            id: -1,
                            name: item,
                            versions: [],
                            activeVersion: null
                        },
                        isSelected: false,
                        textToShow: item
                    };
                })
            });
        });
    }

    private onModelCreated(model:Model){
        this.setState({
            modelCreationActive: false
        });
        this.requestModelsNames();
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

    private renderModelCreation(): JSX.Element{
        return (
            <ModelCreatorComp
               onModelCreated={this.onModelCreated.bind(this)} 
            ></ModelCreatorComp>
        );
    }

    private onCreateModelBtnClick(): void{
        this.setState({modelCreationActive: true});
    }

    private renderModelSelection(): JSX.Element{
        return (
            <div className="middleOfTheScreen row align-items-center ">
                <div className="col-md-8 offset-md-2 border borderRounded">
                    <div className="row bg-success topBordersRounded">
                        <h4 className="prettyMargin text-white">Seleccione modelo:</h4>
                    </div>
                    <div>
                        <ItemSelectorComp
                            itemSelectionList={this.state.modelSelectList}
                            onItemSelected={this.onModelSelected.bind(this)}
                        ></ItemSelectorComp>
                    </div>
                    <div className="spaceBetweenContent" >
                        <span className=" noRigthMargin  btn pointerCursor btn-light" onClick={this.onCreateModelBtnClick.bind(this)}>
                            <img id="addBtn"></img>
                            <span>Crear modelo</span>
                        </span>
                        <button hidden={this.state.modelSelectList.every(model => !model.isSelected)} className="btn noLeftMargin btn-success">Confirmar selección</button>
                    </div>
                </div>
            </div>
        );
    }

    public render(): JSX.Element {
        if(this.state.modelCreationActive)
            return this.renderModelCreation();
        else
            return this.renderModelSelection();
    }
}