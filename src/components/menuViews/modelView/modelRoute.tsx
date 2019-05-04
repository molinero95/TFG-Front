import * as React from "react";
import { Model } from "../../../entities/model";
import { ApplicationState } from "../../../applicationState";
import { ModelMainView } from "./modelMainView";

interface IModelRouteProps {

}

interface IModelRouteState {
    appStateModel: Model,

}

export class ModelRoute extends React.Component<IModelRouteProps, IModelRouteState>{

    public constructor(props: IModelRouteProps) {
        super(props);
        this.state = {
            appStateModel: ApplicationState.model
        };
    }

    
    private onModelSelectionConfirmed(model: Model) {
        this.setState({
            appStateModel: model
        });
        ApplicationState.model = model;
        alert(`Modelo: ${model.name} seleccionado correctamente`);
    }

    public render(): JSX.Element {
        return (
            <ModelMainView
                onModelSelectionConfirmed={this.onModelSelectionConfirmed.bind(this)}
                appStateModel={this.state.appStateModel}
            ></ModelMainView>
        );

    }
}