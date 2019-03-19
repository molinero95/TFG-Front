import * as React from "react";
import { ApplicationState } from "../../../applicationState";
import { VersionMainViewComp } from "./versionMainViewComp";
import { ModelVersion } from "../../../entities/modelVersion";

interface IVersionRouteCompProps {

}

interface IVersionRouteCompState {
}
export class VersionRouteComp extends React.Component<IVersionRouteCompProps, IVersionRouteCompState>{

    public constructor(props: IVersionRouteCompProps) {
        super(props);
        this.state = {
        };
    }


    private onVersionSelected(modelVersion: ModelVersion) {
        ApplicationState.model.activeVersion = modelVersion;
        alert(`Version: ${modelVersion.name} seleccionada correctamente`);
    }

    public render(): JSX.Element {
        return (
            <VersionMainViewComp
                onVersionSelectionConfirmed={this.onVersionSelected.bind(this)}
            ></VersionMainViewComp>
        );

    }
}