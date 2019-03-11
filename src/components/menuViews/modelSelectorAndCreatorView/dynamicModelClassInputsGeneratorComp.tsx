import { ClassItem } from "../../../entities/models/modelClass";
import React = require("react");

interface IDynamicModelClassInputsGeneratorCompProps {
    classes: Array<ClassItem>;
    onClassNameChange: (value: string, modelClass: ClassItem) => void;
}

interface IDynamicModelClassInputsGeneratorCompState {

}


export class DynamicModelClassInputsGeneratorComp extends React.Component<IDynamicModelClassInputsGeneratorCompProps, IDynamicModelClassInputsGeneratorCompState>{
    constructor(props: IDynamicModelClassInputsGeneratorCompProps) {
        super(props);
    }

    private onClassNameChange(event: React.ChangeEvent<HTMLInputElement>, modelClass: ClassItem) {
        let value = event.target.value;
        this.props.onClassNameChange(value, modelClass);   //lo hacemos asi para que haya un cambio de estado
    }


    private GenerateDynamicInputs(): Array<JSX.Element> {
        let res: Array<JSX.Element> = new Array<JSX.Element>();
        let lineArray: Array<JSX.Element> = new Array<JSX.Element>();
        this.props.classes.forEach((modelClass, index) => {
            if(index % 2 == 0){
                lineArray.push(
                    <label key={"l" + index.toString()} className="text-right offset-md-1 col-md-2">Clase {index + 1}: </label>
                );
            }
            else{
                lineArray.push(
                    <label key={"l" + index.toString()} className="text-right col-md-2">Clase {index + 1}: </label>
                );
            }
            lineArray.push(
                <input key={"i" + index.toString()} type="text" className="col-md-3 form-control" value={modelClass.name} onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onClassNameChange(event, modelClass)}></input>
            );
            if (index == this.props.classes.length - 1) {   //ultimo
                res.push(
                    <div key={"r" + (index - 1).toString()} className="row form-group">
                        {lineArray}
                    </div>);
            }
            else if (index % 2 == 1) {  //impar
                res.push(
                    <div key={"r" + (index - 1).toString()} className="row form-group">
                        {lineArray}
                    </div>
                );
                lineArray = new Array<JSX.Element>();
            }

        });
        return res;
    }

    public render() {
        return (
            <div className="scrollYAuto limitedHeigth">
                {this.GenerateDynamicInputs()}
            </div>
        );
    }
}