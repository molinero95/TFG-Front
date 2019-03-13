import React = require("react");
import { Model } from "../../../entities/models/model";
import { ModelRequests } from "../../../requests/modelRequests";
import { ItemSelect } from "../../../entities/itemSelect";
import { ModelCreatorComp } from "./modelCreatorComp";
import { ItemSelectorComp } from "../../common/itemSelectorAndCreator/itemSelectorComp";
import { Item } from "react-bootstrap/lib/Pager";

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
                {isSelected: false, item: {activeVersion: null, id: 0, name: "Model 1", versions: []},  textToShow: "Model 1",}
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
                            activeVersion: null,
                            clases: []
                        },
                        isSelected: false,
                        textToShow: item,
                    };
                })
            });
        });
    }

    private onModelCreated(model: Model) {
        this.setState({
            modelCreationActive: false
        });
        ModelRequests.postCreateModel(model.name);
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

    private renderModelCreation(): JSX.Element {
        return (
            <ModelCreatorComp
                onModelCreated={this.onModelCreated.bind(this)}
            ></ModelCreatorComp>
        );
    }

    private onCreateModelBtnClick(): void {
        this.setState({ modelCreationActive: true });
    }

    private getModelSelected(): Model{
        return this.state.modelSelectList.find(model => model.isSelected).item;
    }

    private renderModelSelection(): JSX.Element {
        return (
            <div className="middleOfTheScreen row align-items-center ">
                <div className="col-md-8 offset-md-2 border borderRounded whiteBg">
                    <div className="row topBordersRounded primaryColorBg">
                        <h4 className="prettyMargin text-white">Seleccione modelo:</h4>
                    </div>
                    <div className="notMaxHeigth scrollAuto">
                        <ItemSelectorComp
                            itemSelectionList={this.state.modelSelectList}
                            onItemSelected={this.onModelSelected.bind(this)}
                        ></ItemSelectorComp>
                    </div>
                    <div className="spaceBetweenContent" >
                        <span className=" noRigthMargin btn pointerCursor btn-light" onClick={this.onCreateModelBtnClick.bind(this)}>
                            <img id="addBtn" className="borderRounded"></img>
                            <span>Crear modelo</span>
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