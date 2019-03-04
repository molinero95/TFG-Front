import * as React from "react";

interface IPredictionsViewCompProps {

}

interface IPredictionsViewCompState {

}
export class PredictionsViewComp extends React.Component<IPredictionsViewCompProps, IPredictionsViewCompState>{

	public constructor(props: IPredictionsViewCompProps) {
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