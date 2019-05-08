import * as React from "react";
import Dropzone from "react-dropzone";
import { ImageItem } from "../../../entities/ImageItem";
import { ApplicationState } from "../../../applicationState";
import { DotLoader } from "react-spinners";
import { ClassificationRequests } from "../../../requests/classificationRequests";
import { Model } from "../../../entities/model";
import { ModelVersion } from "../../../entities/modelVersion";
import { isNullOrUndefined, isNull } from "util";

interface IClassificationsMainViewProps {

}

interface IClassificationsMainViewState {
	imageToClassify: ImageItem;
	loading: boolean;
	classification: string;
	activeModelAndVersion: boolean;
}
export class ClassificationsMainView extends React.Component<IClassificationsMainViewProps, IClassificationsMainViewState>{

	public constructor(props: IClassificationsMainViewProps) {
		super(props);
		this.state = {
			imageToClassify: null,
			loading: false,
			classification: '',
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
			if (accepted[0].type == "image/png" || accepted[0].type == "image/jpeg") {
				let url = URL.createObjectURL(accepted[0]);
				let img: ImageItem = {
					class: null,
					file: accepted[0],
					imageUrl: url
				}
				this.setState({ imageToClassify: img });
			}
			else
				alert("Formato no valido");
		}

	}

	private showImage(): JSX.Element {
		if (this.state.imageToClassify != null) {
			return (
				<img src={this.state.imageToClassify.imageUrl} className="dashedBorder maxWidth classificationImageHeigth"></img>
			)
		}
		return (<div className="maxWidth dashedBorder bigCentereBlackText classificationImageHeigth">Arrastre imagen aqui</div>)
	}


	private onClassifyBtnClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
		//ClassifyRequiest
		this.setState({ loading: true });
		let params = { file: this.state.imageToClassify.file, modelId: ApplicationState.model.id, versionId: ApplicationState.model.activeVersion.id, fileName: this.state.imageToClassify.file.name };
		ClassificationRequests.makeClassification(params).then(classification => {
			this.setState({ loading: false, classification });
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
					<button className="topMargin btn secondaryColorBg col-md-4 offset-md-4" disabled={!this.state.activeModelAndVersion || this.state.loading} onClick={this.onClassifyBtnClick.bind(this)}>Clasificar</button>
				</div>
				<div className="row col-md-12">
					<div className="offset-md-4 col-md-4 text-center">
						{this.state.classification}
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