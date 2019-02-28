import * as React from "react";
import Dropzone from 'react-dropzone';
import 'bootstrap/dist/css/bootstrap.css';
import { initializeIcons } from '@uifabric/icons';
import { TrainNetworkData } from "../../../entities/trainer/trainNetworkData";
import { NetworkImageData } from "../../../entities/images old/NetworkImageData";
import { TrainNetworkImageViewer } from "./trainNetworkImageViewer";
import { TrainNetworkMenuView } from "./trainNetworkMenuView";
import { ClassData } from "../../../entities/trainer/classData";

initializeIcons();

interface TrainNetworkViewProps {

}

interface TrainNetworkViewState {
	images: Array<NetworkImageData>
	trainNetworkData: TrainNetworkData;
}

export class TrainNetworkView extends React.Component<TrainNetworkViewProps, TrainNetworkViewState>{

	public constructor(props: TrainNetworkViewProps) {
		super(props);
		this.state = {
			images: new Array<NetworkImageData>(),
			trainNetworkData: {
				epochs: 10,
				denseUnits: 100,
				learningRate: 0.00001,
				batchSizeFraction: 0.4,
				classes: new Array<ClassData>()
			},
		}

	}


	private handleTrain(): void {
		
	}

	private addNewClassToTrainer(newClass: ClassData): void {
		this.state.trainNetworkData.classes.push(newClass);
	}

	private handleAddImageClass(image: NetworkImageData, selectedClass: ClassData): void {
		image.classData = selectedClass;
        image.classified = true;
		image.selected = false;
		this.forceUpdate();
	}


	private handleMakePrediction(imageForPrediction: NetworkImageData): void{
	}

	private getTrainerValueName(value: number){
		let item = this.state.trainNetworkData.classes.find(item => item.value == value);
		if(item)
			return item.className;
		return item;
	}


	private async onDropTrainingImageHandle(acceptedFiles: any, rejectedFiles: any) {
		let images = new Array<NetworkImageData>();
		for (let i = 0; i < acceptedFiles.length; i++) {
			let url = URL.createObjectURL(acceptedFiles[i]);
			images.push({
				imageUrl: url,
				classData: null,
				selected: false,
				classified: false
			});
		}
		this.setState({
			images: this.state.images.concat(images)
		})
		console.log('Images loaded!')
	}

	private onImageSelected(image: NetworkImageData): void {
		if (!image.classified) {
			image.selected = !image.selected;
			this.forceUpdate();
		}
	}

	//#endregion
	//#region Menu methods

	private onEpochsChange(newValue: number) {
		let trainNetworkData = this.state.trainNetworkData;
		trainNetworkData.epochs = newValue;
		this.setState({ trainNetworkData: trainNetworkData })
	}

	private onDenseUnitsChange(newValue: number) {
		let trainNetworkData = this.state.trainNetworkData;
		trainNetworkData.denseUnits = newValue;
		this.setState({ trainNetworkData: trainNetworkData })
	}

	private onBatchSizeChange(newValue: number) {
		let trainNetworkData = this.state.trainNetworkData;
		trainNetworkData.batchSizeFraction = newValue;
		this.setState({ trainNetworkData: trainNetworkData })
	}

	private onLearningRateChange(newValue: number) {
		let trainNetworkData = this.state.trainNetworkData;
		trainNetworkData.learningRate = newValue;
		this.setState({ trainNetworkData: trainNetworkData })
	}

	//#endregion

	public render(): JSX.Element {
		return (
			<div className="horizontalLayout">
				<div id="trainNetworkMenu">
					<TrainNetworkMenuView
						trainNetworkData={this.state.trainNetworkData}
						imagesData={this.state.images}
						handleTrain={this.handleTrain.bind(this)}
						handleAddImageClass={this.handleAddImageClass.bind(this)}
						handleMakePrediction={this.handleMakePrediction.bind(this)}
						onEpochsChange={this.onEpochsChange.bind(this)}
						onDenseUnitsChange={this.onDenseUnitsChange.bind(this)}
						onBatchSizeChange={this.onBatchSizeChange.bind(this)}
						onLearningRateChange={this.onLearningRateChange.bind(this)}
						addClassToTrainer={this.addNewClassToTrainer.bind(this)}
					></TrainNetworkMenuView>
				</div>
				<div className="verticalLayout">
					<canvas id="canvas" hidden></canvas>
					<TrainNetworkImageViewer
						images={this.state.images}
						onImageSelected={this.onImageSelected.bind(this)}
					>
					</TrainNetworkImageViewer>
					<div>
						<Dropzone
							accept="image/jpeg, image/png"
							onDrop={this.onDropTrainingImageHandle.bind(this)}
							className="dropzoneWidthHeith dropzone"
						>
							<p className="dropzoneWidthHeith">Add images here </p>
						</Dropzone>
					</div>

				</div>

			</div>
		);
	}
}