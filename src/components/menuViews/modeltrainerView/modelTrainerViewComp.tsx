import React = require("react");
import { ModelTrainerLeftMenuComp } from "./modelTrainerLeftMenuComp";
import { ItemSelect } from "../../../entities/itemSelect";
import { ModelVersion } from "../../../entities/models/modelVersion";
import { ModelClass } from "../../../entities/models/modelClass";


interface IModelTrainViewCompProps {

}

interface IModelTrainViewCompState {
    testClasses: Array<ItemSelect<ModelClass>>;

}

export class ModelTrainerViewComp extends React.Component<IModelTrainViewCompProps, IModelTrainViewCompState>{
    constructor(props: IModelTrainViewCompProps) {
        super(props);
        this.state = {
            testClasses: [
                {isSelected: false, textToShow: "clase1", item: {id: 0, name: "clase1"}},
                {isSelected: false, textToShow: "clase2", item: {id: 0, name: "clase2"}},
                {isSelected: false, textToShow: "clase3", item: {id: 0, name: "clase3"}},
                {isSelected: false, textToShow: "clase3", item: {id: 0, name: "clase3"}},
                {isSelected: false, textToShow: "clase3", item: {id: 0, name: "clase3"}},
                {isSelected: false, textToShow: "clase3", item: {id: 0, name: "clase3"}},
                {isSelected: false, textToShow: "clase3", item: {id: 0, name: "clase3"}},
                {isSelected: false, textToShow: "clase3", item: {id: 0, name: "clase3"}},
            ]
        }
    }


    public render() {
        return (
            <div className="horizontalLayout maxHeigth bo">
                <div id="menuWidth" className="borderRigth">
                    <ModelTrainerLeftMenuComp
                        classesWithSelection={this.state.testClasses}
                    ></ModelTrainerLeftMenuComp>
                </div>
                <div>
                    sfaf
                </div>
            </div>
        );
    }
    /*
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
                return (
                    <div>
                    </div>  //alert aqui
                );
        }*/
}