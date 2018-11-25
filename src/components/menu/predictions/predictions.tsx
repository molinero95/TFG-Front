import * as React from "react";

interface IPredictionsProps {

}

interface IPredictionsState {

}
export class Predictions extends React.Component<IPredictionsProps, IPredictionsState>{

    public constructor(props: IPredictionsProps){
        super(props);
    }
    
    public render(): JSX.Element {
        return (
            <div>
                Esta es la predicción
            </div>
        );
    }
}