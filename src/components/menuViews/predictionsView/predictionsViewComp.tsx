import * as React from "react";
import { RouterUtils } from "../../../utils/routerUtils";

interface IPredictionsViewCompProps {

}

interface IPredictionsViewCompState {

}
export class PredictionsViewComp extends React.Component<IPredictionsViewCompProps, IPredictionsViewCompState>{

	public constructor(props: IPredictionsViewCompProps) {
		super(props);
	}


	public componentWillMount(){
        if(!RouterUtils.ModelAndVersionSelected()){
            if(!RouterUtils.ModelSelected)
                alert("No hay modelo seleccionado");
            else
                alert("No hay versión seleccionada");
            history.back();
        }
    }
	

	public render(): JSX.Element {
		return (
			<div>
				Esta es la predicción
            </div>
		);
	}
}