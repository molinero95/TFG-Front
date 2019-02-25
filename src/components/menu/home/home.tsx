import * as React from "react";
import { ModelSelectorAndCreator } from "../../models/modelSelectorAndCreator";
import { ModelCreator } from "../../models/creation/modelCreator";

interface IHomeProps {

}

interface IHomeState {
    modelSelectedName: string,
    modelIsBeingCreated: boolean
}
export class Home extends React.Component<IHomeProps, IHomeState>{

    public constructor(props: IHomeProps){
        super(props);
        this.state = {
            modelSelectedName: null,
            modelIsBeingCreated: false,
        };
    }

    private onCreateModel(){
        this.setState({modelIsBeingCreated: true});
    }

    private onModelSelected(modelName: string){
        this.setState({modelSelectedName: modelName});
    }

    private onModelCreated(newModelName: string){
        this.setState({
            modelSelectedName: newModelName,
            modelIsBeingCreated: false,
        });
    }

    private showInterface(): JSX.Element{
        if(this.state.modelIsBeingCreated){
            return (
                <ModelCreator
                   onModelCreated={this.onModelCreated.bind(this)} 
                ></ModelCreator>
            )
        }
        else{
            return (
                <ModelSelectorAndCreator
                    onCreateModel={this.onCreateModel.bind(this)}
                    onModelConfirmed={this.onModelSelected.bind(this)}
                ></ModelSelectorAndCreator>
            );
        }
    }

    public render(): JSX.Element {
        let rend = this.showInterface();
        return (
            <div>
                {rend}
            </div>
        );
    }
}