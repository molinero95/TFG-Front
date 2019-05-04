import * as React from "react";
import { ApplicationState } from "../../../applicationState";
import { VersionMainView } from "./versionMainView";
import { ModelVersion } from "../../../entities/modelVersion";

interface IVersionRouteProps {

}

interface IVersionRouteState {
    appStateVersion: ModelVersion;
}
export class VersionRoute extends React.Component<IVersionRouteProps, IVersionRouteState>{

    public constructor(props: IVersionRouteProps) {
        super(props);
        if(ApplicationState.model){
            this.state = {
                appStateVersion: ApplicationState.model.activeVersion
            };
        }
        else {
            this.state = {
                appStateVersion: null
            };
        }
        
    }


    private onVersionSelected(modelVersion: ModelVersion) {
        this.setState({
            appStateVersion: modelVersion
        });
        ApplicationState.model.activeVersion = modelVersion;
        alert(`Version: ${modelVersion.name} seleccionada correctamente`);
    }

    public render(): JSX.Element {
        return (
            <VersionMainView
                onVersionSelectionConfirmed={this.onVersionSelected.bind(this)}
                appStateVersion={this.state.appStateVersion}
            ></VersionMainView>
        );

    }
}