import * as React from "react";
import Dropzone from 'react-dropzone';
import 'bootstrap/dist/css/bootstrap.css';
import { initializeIcons } from '@uifabric/icons';
import { CanvasHelper } from "../../../helpers/canvasHelper";
import { ImageTrainerConstants } from "../../trainer/constants";
import { ImageTrainer } from "../../trainer/imageTrainer";
import { TrainNetworkData } from "../../../entities/trainer/trainNetworkData";
import { ImageToTrainData } from "../../../entities/images/imagesForTrainData";
import { TrainNetworkImageViewer } from "./trainNetworkImageViewer";
import { TrainNetworkMenu } from "./trainNetworkMenu";
import { ClassData } from "../../../entities/trainer/classData";
import { train } from "@tensorflow/tfjs";
initializeIcons();

interface ITrainNetworkProps {

}

interface ITrainNetworkState {
	images: Array<ImageToTrainData>
	trainNetworkData: TrainNetworkData;
}

export class TrainNetwork extends React.Component<ITrainNetworkProps, ITrainNetworkState>{
	private trainer: ImageTrainer;

	public constructor(props: ITrainNetworkProps) {
		super(props);
		this.state = {
			images: new Array<ImageToTrainData>(),
			trainNetworkData: {
				epochs: 10,
				denseUnits: 100,
				learningRate: 0.00001,
				batchSizeFraction: 0.4,
				classes: new Array<ClassData>()
			},
		}
		this.trainer = new ImageTrainer();
	}

	private async onDropTrainingImageHandle(acceptedFiles: any, rejectedFiles: any) {
		let images = new Array<ImageToTrainData>();
		for (let i = 0; i < acceptedFiles.length; i++) {
			let url = URL.createObjectURL(acceptedFiles[i]);
			images.push({
				imageUrl: url,
				labelData: null,
				imageData: await CanvasHelper.getResizedImage(url, ImageTrainerConstants.IMAGEHEIGTH, ImageTrainerConstants.IMAGEWIDTH),
				selected: false,
				classified: false
			});
		}
		this.setState({
			images: this.state.images.concat(images)
		})
		console.log('Images loaded!')
	}

	private handleTrain(): void {
		this.trainer.train(this.state.trainNetworkData);
	}


	private onEpochsChange(newValue:number){
		let trainNetworkData = this.state.trainNetworkData;
		trainNetworkData.epochs = newValue;
		this.setState({trainNetworkData: trainNetworkData})
	}

	private onDenseUnitsChange(newValue:number){
		let trainNetworkData = this.state.trainNetworkData;
		trainNetworkData.denseUnits = newValue;
		this.setState({trainNetworkData: trainNetworkData})
	}

	private onBatchSizeChange(newValue:number){
		let trainNetworkData = this.state.trainNetworkData;
		trainNetworkData.batchSizeFraction = newValue;
		this.setState({trainNetworkData: trainNetworkData})
	}

	private onLearningRateChange(newValue:number){
		let trainNetworkData = this.state.trainNetworkData;
		trainNetworkData.learningRate = newValue;
		this.setState({trainNetworkData: trainNetworkData})
	}


	public render(): JSX.Element {
		return (
			<div className="horizontalLayout">
				<div id="trainNetworkMenu">
					<TrainNetworkMenu
						trainNetworkData={this.state.trainNetworkData}
						trainer={this.trainer}
						imagesData={this.state.images}
						handleTrain={this.handleTrain.bind(this)}
						onEpochsChange={this.onEpochsChange.bind(this)}
						onDenseUnitsChange={this.onDenseUnitsChange.bind(this)}
						onBatchSizeChange={this.onBatchSizeChange.bind(this)}
						onLearningRateChange={this.onLearningRateChange.bind(this)}
						
					></TrainNetworkMenu>
				</div>
				<div className="verticalLayout">
					<canvas id="canvas" hidden></canvas>
					<TrainNetworkImageViewer
						images={this.state.images}
						selectedClass={this.state.trainNetworkData.classes.find(item => item.selected)}
					>
					</TrainNetworkImageViewer>
					<div>
						<Dropzone
							accept="image/jpeg, image/png"
							onDrop={this.onDropTrainingImageHandle.bind(this)}
							className="dropzoneWidthHeith dropzone"
						>
							<p className="dropzoneWidthHeith">Selecciona las imágenes para la clase </p>
						</Dropzone>
					</div>

				</div>

			</div>
		);
	}
}