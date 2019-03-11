import React = require("react");
import { ClassItem } from "../../../entities/models/modelClass";
import { ItemSelect } from "../../../entities/itemSelect";

interface IModelTrainerLeftMenuCompProps {
    classesWithSelection: Array<ItemSelect<ClassItem>>;
    onConfirmedClass: (modelClass: ClassItem) => void;
}
interface IModelTrainerLeftMenuCompState {
    selectedClass: ClassItem;
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
                <button key={"b" + index.toString()} className="btn btn-light prettyMargin" disabled={false} >{modelClass.textToShow}</button>
            );
        });
        return res;
    }

    public render(): JSX.Element {
        return (
            <div className="verticalLayout container whiteBg">
                <span>Seleccione clase:</span>
                <div className="centerContent notMaxHeigth scrollAuto">
                    {this.printClassButtons()}
                </div>
                <button className="btn secondaryColorBg topMargin" onClick={() => this.props.onConfirmedClass(this.state.selectedClass)}>Confirmar</button>
            </div>
        );
    }
}