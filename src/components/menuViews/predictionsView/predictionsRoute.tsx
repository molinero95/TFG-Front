import React = require("react");
import { PredictionsMainView } from "./predictionsMainView";

interface IPredictionsRouteProps {

}

interface IPredictionsRouteState {

}

export class PredictionsRoute extends React.Component<IPredictionsRouteProps, IPredictionsRouteState>{

	public constructor(props: IPredictionsRouteProps) {
		super(props);

    }
    
    
    public render(){
        return (
            <PredictionsMainView></PredictionsMainView>
        )
    }
}
