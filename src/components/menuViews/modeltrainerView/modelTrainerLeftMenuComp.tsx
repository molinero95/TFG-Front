import React = require("react");
import { ModelClass } from "../../../entities/models/modelClass";
import { ItemSelect } from "../../../entities/itemSelect";

interface IModelTrainerLeftMenuCompProps {
    classesWithSelection: Array<ItemSelect<ModelClass>>;
    onConfirmedClass: (modelClass: ModelClass) => void;
}
interface IModelTrainerLeftMenuCompState {
    selectedClass: ModelClass;
}


export class ModelTrainerLeftMenuComp extends React.Component<IModelTrainerLeftMenuCompProps, IModelTrainerLeftMenuCompState> {
    public constructor(props: IModelTrainerLeftMenuCompProps) {
        super(props);
        this.state = {
            selectedClass: null
        }
    }

    private printClassButtons(): Array<JSX.Element> {
        let res: Array<JSX.Element> = new Array<JSX.Element>();
        this.props.classesWithSelection.forEach((modelClass, index) => {
            res.push(
                <button key={"b" + index.toString()} className="btn btn-primary prettyMargin" disabled={false} >{modelClass.textToShow}</button>
            );
        });
        return res;
    }

    public render(): JSX.Element {
        return (
            <div className="verticalLayout container">
                <span>Seleccione clase:</span>
                <div className="centerContent notMaxHeigth scrollAuto">
                    {this.printClassButtons()}
                </div>
                <button className="btn btn-success topMargin" onClick={() => this.props.onConfirmedClass(this.state.selectedClass)}>Confirmar</button>
            </div>
        );
    }
}