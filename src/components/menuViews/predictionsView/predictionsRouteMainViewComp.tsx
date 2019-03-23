import * as React from "react";
import Dropzone from "react-dropzone";
import { ImageItem } from "../../../entities/ImageItem";
import { ApplicationState } from "../../../applicationState";
import { DotLoader } from "react-spinners";
import { PredictionRequests } from "../../../requests/predictionRequests";

interface IPredictionsRouteMainViewProps {

}

interface IPredictionsRouteMainViewCompState {
	imageToPredict: ImageItem;
	loading: boolean;
}
export class PredictionsRouteMainViewComp extends React.Component<IPredictionsRouteMainViewProps, IPredictionsRouteMainViewCompState>{

	public constructor(props: IPredictionsRouteMainViewProps) {
		super(props);
		this.state = {
			imageToPredict: null,
			loading: false
		}
	}


	public componentDidMount() {
		if (ApplicationState.model == null)
			alert("No hay modelo seleccionado");
		else if (ApplicationState.model.activeVersion == null)
			alert("No hay version seleccionada");
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


	private onPredictBtnClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
		//PredictRequiest
		this.setState({ loading: true });
		console.log(this.state.imageToPredict);
		let params = { file: this.state.imageToPredict.file, modelId: 26, versionId: 21, fileName: this.state.imageToPredict.file.name };
		PredictionRequests.makePrediction(params).then(data => {
			console.log(data);
		}).catch(console.error);
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
							<button className="topMargin btn secondaryColorBg col-md-4 offset-md-4" onClick={this.onPredictBtnClick.bind(this)}>Predecir</button>
						</div>
						<div className="centerContent topMargin">
							<DotLoader
								size={100}
								color={"#D78193"}
								loading={this.state.loading}
							></DotLoader>
						</div>
					</div>
				</Dropzone>
			</div>
		);
	}
}