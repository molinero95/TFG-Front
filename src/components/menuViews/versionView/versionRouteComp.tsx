import * as React from "react";
import { ApplicationState } from "../../../applicationState";
import { VersionMainViewComp } from "./versionMainViewComp";
import { ModelVersion } from "../../../entities/modelVersion";

interface IVersionRouteCompProps {

}

interface IVersionRouteCompState {
    appStateVersion: ModelVersion;
}
export class VersionRouteComp extends React.Component<IVersionRouteCompProps, IVersionRouteCompState>{

    public constructor(props: IVersionRouteCompProps) {
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
            <VersionMainViewComp
                onVersionSelectionConfirmed={this.onVersionSelected.bind(this)}
                appStateVersion={this.state.appStateVersion}
            ></VersionMainViewComp>
        );

    }
}