import * as React from "react";
import Dropzone from "react-dropzone";
import { ImageItem } from "../../../entities/ImageItem";
import { ApplicationState } from "../../../applicationState";

interface IPredictionsRouteMainViewProps {

}

interface IPredictionsRouteMainViewCompState {
	imageToPredict: ImageItem;
}
export class PredictionsRouteMainViewComp extends React.Component<IPredictionsRouteMainViewProps, IPredictionsRouteMainViewCompState>{

	public constructor(props: IPredictionsRouteMainViewProps) {
		super(props);
		this.state = {
			imageToPredict: null
		}
	}


	public componentDidMount() {
		if(ApplicationState.model == null)
            alert("No hay modelo seleccionado");
        else if(ApplicationState.model.activeVersion == null)
            alert("No hay version seleccionada");
        else{
            
        }
	}

	private onDropItem(accepted: File[], rejected: File[], event: React.DragEvent<HTMLDivElement>) {
		if (accepted == null || accepted.length == 0 || accepted.length > 1)
			alert("Introduzca sólo una imagen");
		else {
			let url = URL.createObjectURL(accepted[0]);
			let img: ImageItem = {
				class: null,
				file: accepted[0],
				imageUrl: url
			}
			this.setState({ imageToPredict: img })
		}
	}

	private showImage(): JSX.Element {
		if (this.state.imageToPredict != null) {
			return (
				<img src={this.state.imageToPredict.imageUrl} className="dashedBorder halfMinHeigth maxWidth halfHeigth"></img>
			)
		}
		return (<div className="maxWidth halfMinHeigth halfHeigth dashedBorder bigCentereBlackText">Arrastre imagen aqui</div>)
	}


	public render(): JSX.Element {
		return (
			<div >
				<Dropzone className="maxHeigth maxWidth scrollYAuto " onDrop={this.onDropItem.bind(this)} disableClick={true}>
					<div className="middleOfTheScreen align-items-center topPadding prettyMargin">
						<div className="row halfMinHeigth halfHeigth">
							<div className="col-md-4 maxHeigth offset-md-4">
								{this.showImage()}
							</div>
						</div>
						<div className="row">
							<button className="topMargin btn secondaryColorBg col-md-4 offset-md-4">Predecir</button>
						</div>
					</div>
				</Dropzone>
			</div>
		);
	}
}