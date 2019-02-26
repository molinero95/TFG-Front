import * as React from "react";
import { Model } from "../../../entities/models/model";
import { ApplicationState } from "../../../applicationState";
import { ModelSelectorAndCreatorComp } from "./modelSelectorAndCreatorComp";

interface IModelSelectorAndCreatorViewCompProps {

}

interface IModelSelectorAndCreatorViewCompState {
}
export class ModelSelectorAndCreatorViewComp extends React.Component<IModelSelectorAndCreatorViewCompProps, IModelSelectorAndCreatorViewCompState>{

    public constructor(props: IModelSelectorAndCreatorViewCompProps) {
        super(props);
        this.state = {
        };
    }


    private onModelSelected(model: Model) {
        ApplicationState.model = model;
    }

    public render(): JSX.Element {
        return (
            <ModelSelectorAndCreatorComp
                onModelSelectionConfirmed={this.onModelSelected.bind(this)}
            ></ModelSelectorAndCreatorComp>
        );

    }
}