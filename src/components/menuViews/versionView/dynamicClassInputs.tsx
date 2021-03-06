import { ClassItem } from "../../../entities/classItem";
import React = require("react");

interface IDynamicClassInputsProps {
    classes: Array<ClassItem>;
    onClassNameChange: (value: string, modelClassId: number) => void;
}

interface IDynamicClassInputsState {

}


export class DynamicClassInputs extends React.Component<IDynamicClassInputsProps, IDynamicClassInputsState>{
    constructor(props: IDynamicClassInputsProps) {
        super(props);
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
                <input key={"i" + index.toString()} type="text" className="col-md-3 form-control" value={modelClass.name} onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.props.onClassNameChange(event.target.value, modelClass.id)}></input>
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