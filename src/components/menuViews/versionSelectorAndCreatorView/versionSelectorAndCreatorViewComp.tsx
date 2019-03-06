import * as React from "react";
import { Model } from "../../../entities/models/model";
import { ApplicationState } from "../../../applicationState";
import { VersionSelectorAndCreatorComp } from "./versionSelectorAndCreatorComp";
import { ModelVersion } from "../../../entities/models/modelVersion";
import { RouterUtils } from "../../../utils/routerUtils";

interface IVersionSelectorAndCreatorViewCompProps {

}

interface IVersionSelectorAndCreatorViewCompState {
}
export class VersionSelectorAndCreatorViewComp extends React.Component<IVersionSelectorAndCreatorViewCompProps, IVersionSelectorAndCreatorViewCompState>{

    public constructor(props: IVersionSelectorAndCreatorViewCompProps) {
        super(props);
        this.state = {
        };
    }

    public componentWillMount(){
        if(!RouterUtils.ModelSelected()){
            alert("No hay modelo seleccionado");
            history.back();
        }
    }

    private onVersionSelected(modelVersion: ModelVersion) {
        ApplicationState.model.activeVersion = modelVersion;
        alert(`Version: ${modelVersion.name} seleccionada correctamente`);
    }

    public render(): JSX.Element {
        return (
            <VersionSelectorAndCreatorComp
                onVersionSelectionConfirmed={this.onVersionSelected.bind(this)}
            ></VersionSelectorAndCreatorComp>
        );

    }
}