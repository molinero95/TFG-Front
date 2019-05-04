import React = require("react");
import { TrainerMainView } from "./trainerMainView";

interface ITrainerRouteProps {

}

interface ITrainerRouteState {

}

export class TrainerRoute extends React.Component<ITrainerRouteProps, ITrainerRouteState>{
    constructor(props: ITrainerRouteProps) {
        super(props);
    }

    public render() {
        return (
            <TrainerMainView></TrainerMainView>
        );
    }

}