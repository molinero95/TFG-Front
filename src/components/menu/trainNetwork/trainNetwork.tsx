import * as React from "react";
import { ItemSelector } from "../../itemSelector";
import { INetwork } from "../../../entities/inetwork";
import { NetworkService } from "../../../requestServices/networkService";
import { IBaseItem } from '../../../entities/IBaseItem';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Button } from 'office-ui-fabric-react/lib/Button';
import Dropzone from 'react-dropzone';
import * as tf from '@tensorflow/tfjs';

interface ITrainNetworkProps {

}
interface ITrainNetworkState {
	selectedNetwork: INetwork;
	images: any,
	imagesForTrain: any
}

export class TrainNetwork extends React.Component<ITrainNetworkProps, ITrainNetworkState>{
	private model = tf.sequential();

	public constructor(props: ITrainNetworkProps) {
		super(props);
		this.state = {
			selectedNetwork: {
				name: "",
				alfa: 0,
				inputs: 0,
				layers: 0,
				classes: []
			},
			images: [],
			imagesForTrain: []
		}
	}

	private onSelectedNetwork(selectedItem: IBaseItem): void {
		NetworkService.getNetwork(selectedItem.name).then(resp => {
			return resp.json();
		}).then((network: INetwork) => {
			this.setState({ selectedNetwork: network });
		}).catch(error => { console.error(error) });
	}

	private async train() {
		this.model.add(tf.layers.conv2d({
			inputShape: [28, 28, 1],
			kernelSize: 5,
			filters: 8,
			strides: 1,
			activation: 'relu',
			kernelInitializer: 'VarianceScaling'
		}));
		this.model.add(tf.layers.maxPooling2d({
			poolSize: [2, 2],
			strides: [2, 2]
		}));
		this.model.add(tf.layers.conv2d({
			kernelSize: 5,
			filters: 16,
			strides: 1,
			activation: 'relu',
			kernelInitializer: 'VarianceScaling'
		}));

		this.model.add(tf.layers.maxPooling2d({
			poolSize: [2, 2],
			strides: [2, 2]
		}));

		this.model.add(tf.layers.flatten());

		this.model.add(tf.layers.dense({
			units: 10,
			kernelInitializer: 'VarianceScaling',
			activation: 'softmax'
		}));
		const LEARNING_RATE = 0.15;
		const optimizer = tf.train.sgd(LEARNING_RATE);
		this.model.compile({
			optimizer: optimizer,
			loss: 'categoricalCrossentropy',
			metrics: ['accuracy'],
		});

		await this.model.fit(tf.tensor2d(this.state.imagesForTrain), tf.tensor2d([28, 28, 1]));
		// How many examples the model should "see" before making a parameter update.
		const BATCH_SIZE = 64;
		// How many batches to train the model for.
		const TRAIN_BATCHES = 100;

		// Every TEST_ITERATION_FREQUENCY batches, test accuracy over TEST_BATCH_SIZE examples.
		// Ideally, we'd compute accuracy over the whole test set, but for performance
		// reasons we'll use a subset.
		const TEST_BATCH_SIZE = 1000;
		const TEST_ITERATION_FREQUENCY = 5;
		/*for (let i = 0; i < TRAIN_BATCHES; i++) {
			const batch = data.nextTrainBatch(BATCH_SIZE);

			let testBatch;
			let validationData;
			// Every few batches test the accuracy of the mode.
			if (i % TEST_ITERATION_FREQUENCY === 0) {
				testBatch = data.nextTestBatch(TEST_BATCH_SIZE);
				validationData = [
					testBatch.xs.reshape([TEST_BATCH_SIZE, 28, 28, 1]), testBatch.labels
				];
			}

			// The entire dataset doesn't fit into memory so we call fit repeatedly
			// with batches.
			const history = await model.fit(
				batch.xs.reshape([BATCH_SIZE, 28, 28, 1]),
				batch.labels,
				{
					batchSize: BATCH_SIZE,
					validationData,
					epochs: 1
				});

			const loss = history.history.loss[0];
			const accuracy = history.history.acc[0];

			// ... plotting code ...
		}*/
	}

	private async prueba() {
		let imagesForTrain = new Array();
		for (let i = 0; i < this.state.images.length; i++) {
			let arrayBufferImage = (await this.readFileAsync(this.state.images[i]) as Uint8Array);
			imagesForTrain.push(arrayBufferImage);
			arrayBufferImage = new Uint8Array();
		}
		this.setState({ imagesForTrain: imagesForTrain });
		this.train();
	}

	readFileAsync(file: File) {
		return new Promise((resolve, reject) => {
			let reader = new FileReader();

			reader.onload = (event: any) => {
				console.log(event);
				resolve(new Uint8Array(event.target.result));
			};

			reader.onerror = reject;

			reader.readAsArrayBuffer(file);
		})
	}

	public render(): JSX.Element {
		//Item selector es para seleccionar el network que vamos a entrenar
		return (
			<div style={{ textAlign: "center" }}>
				<h1 style={{ textAlign: "center" }}>Este es el entrenador</h1>
				<div style={{ display: "flex", justifyContent: "center" }}>
					<ItemSelector getItemsService={NetworkService.getNetworkNames.bind(this)} pageSize={20} getNumberOfPagesService={NetworkService.getNerworkPages.bind(this)} onItemSelected={this.onSelectedNetwork.bind(this)} />

					<Label style={{ marginLeft: "15px" }}>Alfa: {this.state.selectedNetwork.alfa}</Label>
					<Label style={{ marginLeft: "15px" }}>Lotes de imagenes: {this.state.selectedNetwork.inputs}</Label>
					<Label style={{ marginLeft: "15px" }}>Capas: {this.state.selectedNetwork.layers}</Label>
					<Label style={{ marginLeft: "15px" }}>Clases:
							{this.state.selectedNetwork.classes.map(function (elem: String, i: number) {
							return (
								<span style={{ marginLeft: "5px" }}>
									{elem}
								</span>
							);
						}.bind(this))}
					</Label>
				</div>
				<Dropzone style={{
					display: "flex", justifyContent: "center", position: "relative", height: "75%", width: "100%",
					marginTop: "10px", borderWidth: "2px", borderColor: "rgb(102,102,102)", borderStyle: "dashed",
					borderRadius: "5px"
				}}
					accept="image/jpeg, image/png"
					onDrop={(accepted, rejected) => {
						this.setState({ images: accepted }, this.prueba.bind(this));
					}} >
					{this.state.images.length > 0 &&
						<div style={{ display: "flex", flexWrap: "wrap", }}>
							{this.state.images.map((image: any) => (
								<img
									alt="Preview"
									key={image.name}
									src={image.path}
									style={{
										display: 'flex',
										width: 100,
										height: 100,
										margin: "5px"
									}}
								/>
							))}
						</div>
					}
				</Dropzone>
			</div>
		);
	}
}