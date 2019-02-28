import React = require("react");
import { ModelClass } from "../../../entities/models/modelClass";
import { ItemSelect } from "../../../entities/itemSelect";

interface IModelTrainerTopMenuCompProps{
    classesWithSelection: Array<ItemSelect<ModelClass>>;
}
interface IModelTrainerTopMenuCompState{
    
}


export class ModelTrainerTopMenuComp extends React.Component<IModelTrainerTopMenuCompProps, IModelTrainerTopMenuCompState> {
    public constructor(props: IModelTrainerTopMenuCompProps){
        super(props);

    }

    private printClassButtons(): Array<JSX.Element> {
        let res: Array<JSX.Element> = new Array<JSX.Element>();
        this.props.classesWithSelection.forEach((modelClass, index)=> {
            res.push(
                <button key={"b"+index.toString()} className="btn btn-primary" disabled={false} >{modelClass.textToShow}</button>
            );
        });
        return res;
    }

    public render(): JSX.Element{
        return (
            <div>
                <div className="row ribbonModelTrainer">
                    <button></button>
                </div>
            </div>
        );
    }
}