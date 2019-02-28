import React = require("react");
import { ModelTrainerTopMenuComp } from "./modelTrainerTopMenuComp";
import { ApplicationState } from "../../../applicationState";
import { ModelVersion } from "../../../entities/models/modelVersion";
import { ItemSelect } from "../../../entities/itemSelect";
import { Item } from "react-bootstrap/lib/Breadcrumb";
import { ModelClass } from "../../../entities/models/modelClass";


interface IModelTrainViewCompProps {

}

interface IModelTrainViewCompState {

}

export class ModelTrainerViewComp extends React.Component<IModelTrainViewCompProps, IModelTrainViewCompState>{
    constructor(props: IModelTrainViewCompProps) {
        super(props);

    }


    public render() {
        if (ApplicationState.model != null) {
            let classWithSelector: Array<ItemSelect<ModelClass>> = ApplicationState.model.clases.map(item => {
                let res: ItemSelect<ModelClass> = {
                    isSelected: false,
                    item: item,
                    textToShow: item.name,
                };
                return res;
            });

            return (
                <div>
                    <ModelTrainerTopMenuComp
                        classesWithSelection={classWithSelector}
                    ></ModelTrainerTopMenuComp>
                </div>
            );
        }
        else
            return <div></div>  //alert aqui
    }
}