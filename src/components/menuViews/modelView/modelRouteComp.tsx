import * as React from "react";
import { Model } from "../../../entities/model";
import { ApplicationState } from "../../../applicationState";
import { ModelMainViewComp } from "./modelMainViewComp";

interface IModelRouteCompProps {

}

interface IModelRouteCompState {

}

export class ModelRouteComp extends React.Component<IModelRouteCompProps, IModelRouteCompState>{

    public constructor(props: IModelRouteCompProps) {
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
            <ModelMainViewComp
                onModelSelectionConfirmed={this.onModelSelectionConfirmed.bind(this)}
            ></ModelMainViewComp>
        );

    }
}