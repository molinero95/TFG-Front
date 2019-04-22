import * as React from "react";
import Dropzone from "react-dropzone";
import { ImageItem } from "../../../entities/ImageItem";
import { ApplicationState } from "../../../applicationState";
import { DotLoader } from "react-spinners";
import { PredictionRequests } from "../../../requests/predictionRequests";
import { Model } from "../../../entities/model";
import { ModelVersion } from "../../../entities/modelVersion";
import { isNullOrUndefined, isNull } from "util";

interface IPredictionsRouteMainViewProps {

}

interface IPredictionsRouteMainViewCompState {
	imageToPredict: ImageItem;
	loading: boolean;
	prediction: string;
	activeModelAndVersion: boolean;
}
export class PredictionsRouteMainViewComp extends React.Component<IPredictionsRouteMainViewProps, IPredictionsRouteMainViewCompState>{

	public constructor(props: IPredictionsRouteMainViewProps) {
		super(props);
		this.state = {
			imageToPredict: null,
			loading: false,
			prediction: '',
			activeModelAndVersion: !isNullOrUndefined(ApplicationState.model) && !isNullOrUndefined(ApplicationState.model.activeVersion)
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
				<img src={this.state.imageToPredict.imageUrl} className="dashedBorder maxWidth predictionImageHeigth"></img>
			)
		}
		return (<div className="maxWidth dashedBorder bigCentereBlackText predictionImageHeigth">Arrastre imagen aqui</div>)
	}


	private onPredictBtnClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
		//PredictRequiest
		this.setState({ loading: true });
		console.log(this.state.imageToPredict);
		let params = { file: this.state.imageToPredict.file, modelId: ApplicationState.model.id, versionId: ApplicationState.model.activeVersion.id, fileName: this.state.imageToPredict.file.name };
		PredictionRequests.makePrediction(params).then(prediction => {
			this.setState({ loading: false, prediction });
		}).catch(console.error);
	}

	public render(): JSX.Element {
		return (
			<div className="row notMaxHeigth">
				<Dropzone className="row noScroll col-md-12 " onDrop={this.onDropItem.bind(this)}>
					<div className="offset-md-3 col-md-6  align-items-center topPadding prettyMargin">
						{this.showImage()}
					</div>
				</Dropzone>
				<div className="row col-md-12">
					<button className="topMargin btn secondaryColorBg col-md-4 offset-md-4" disabled={!this.state.activeModelAndVersion || this.state.loading} onClick={this.onPredictBtnClick.bind(this)}>Predecir</button>
				</div>
				<div className="row col-md-12">
					<div className="offset-md-4 col-md-4 text-center">
						{this.state.prediction}
					</div>
				</div>
				<div className="row col-md-12">
				<div className="centerContent col-md-12">
						<DotLoader
							size={100}
							color={"#D78193"}
							loading={this.state.loading}
						></DotLoader>
					</div>
				</div>
			</div>
		);
	}
}