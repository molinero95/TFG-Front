import * as React from "react";
import { Model } from "../../../entities/models/model";
import { ApplicationState } from "../../../applicationState";
import { ModelSelectorAndCreatorComp } from "./modelSelectorAndCreatorComp";
import { RouterUtils } from "../../../utils/routerUtils";

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

    
    private onModelSelectionConfirmed(model: Model) {
        ApplicationState.model = model;
        alert(`Modelo: ${model.name} seleccionado correctamente`);
    }

    public render(): JSX.Element {
        return (
            <ModelSelectorAndCreatorComp
                onModelSelectionConfirmed={this.onModelSelectionConfirmed.bind(this)}
            ></ModelSelectorAndCreatorComp>
        );

    }
}