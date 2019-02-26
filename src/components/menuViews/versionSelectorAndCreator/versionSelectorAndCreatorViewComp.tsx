import * as React from "react";
import { Model } from "../../../entities/models/model";
import { ApplicationState } from "../../../applicationState";
import { VersionSelectorAndCreatorComp } from "./versionSelectorAndCreatorComp";
import { ModelVersion } from "../../../entities/models/modelVersion";

interface IVersionSelectorAndCreatorViewCompProps {

}

interface IVersionSelectorAndCreatorViewCompState {
}
export class VersionSelectorAndCreatorCompView extends React.Component<IVersionSelectorAndCreatorViewCompProps, IVersionSelectorAndCreatorViewCompState>{

    public constructor(props: IVersionSelectorAndCreatorViewCompProps) {
        super(props);
        this.state = {
        };
    }


    private onVersionSelected(modelVersion: ModelVersion) {
        ApplicationState.model.activeVersion = modelVersion;
    }

    public render(): JSX.Element {
        return (
            <VersionSelectorAndCreatorComp
                onVersionSelectionConfirmed={this.onVersionSelected.bind(this)}
            ></VersionSelectorAndCreatorComp>
        );

    }
}