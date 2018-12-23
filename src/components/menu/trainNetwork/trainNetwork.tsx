import * as React from "react";
import { ItemSelector } from "../../itemSelector";
import { INetwork } from "../../../entities/inetwork";
import { NetworkService } from "../../../requestServices/networkService";
import { IBaseItem } from '../../../entities/IBaseItem';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Button } from 'office-ui-fabric-react/lib/Button';
import Dropzone from 'react-dropzone';
import * as tf from '@tensorflow/tfjs';
import { tensor3d } from "@tensorflow/tfjs";
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as fs from 'fs';
import * as jpg from 'jpeg-js';


interface ITrainNetworkProps {

}
interface ITrainNetworkState {
	selectedNetwork: INetwork;
	images: any,
	imagesForTrain: Float32Array,
	labels: Uint8Array
}

export class TrainNetwork extends React.Component<ITrainNetworkProps, ITrainNetworkState>{
	private model = tf.sequential();
	private resizeWidth = 300;
	private resizeHeight = 300;
	private IMAGE_SIZE = this.resizeHeight * this.resizeWidth;
	private NUM_CLASSES = 2;
	private NUM_TRAIN_ELEMENTS = 2;
	private trainIndices = new Uint32Array();
	private shuffledTrainIndex = 0;

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
			imagesForTrain: new Float32Array(),
			labels: new Uint8Array()
		}
		// Create a buffer and set values at particular indices.
		/*const buffer = tf.buffer([4, 4]);
		buffer.set(1, 0, 0);
		buffer.set(2, 0, 1);
		buffer.set(3, 1, 0);
		buffer.set(4, 1, 1);

		// Convert the buffer back to a tensor.
		buffer.toTensor().print();*/


	}

	private onSelectedNetwork(selectedItem: IBaseItem): void {
		NetworkService.getNetwork(selectedItem.name).then(resp => {
			return resp.json();
		}).then((network: INetwork) => {
			this.setState({ selectedNetwork: network });
		}).catch(error => { console.error(error) });
	}

	/*private async prueba() {
		let imagesForTrain = new Array();
		for (let i = 0; i < this.state.images.length; i++) {
			let pixels = await this.readFileAsync(this.state.images[i]);

			//imagesForTrain.push(new Uint32Array(pixels.data.buffer));
		}
		this.setState({ imagesForTrain: imagesForTrain });
		console.log(imagesForTrain);
	}*/

	readFileAsync(file: File) {
		return new Promise((resolve, reject) => {
			let reader = new FileReader();

			reader.onload = async (event: any) => {
				resolve(reader.result);
			};

			reader.onerror = reject;

			reader.readAsArrayBuffer(file);
		})
	}

	public async entrenar(imageData: ImageData) {
		const pred = await tf.tidy(() => {
			//convert canvas pixels to
			let img = tf.fromPixels(imageData, 1);
			img = img.reshape([1, 438, 173]);
			img = tf.cast(img, 'float32');
			//await this.model.fit();
			//console.log('La imagen es', img);
		});
		console.log('pred es ', pred);
	}

	/*public test = async () => {
		this.model.add(tf.layers.conv2d({
			inputShape: [this.resizeWidth, this.resizeHeight, 3],
			kernelSize: 5,
			filters: 8,
			strides: 1,
			activation: 'relu',
			kernelInitializer: 'VarianceScaling'
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
			units: 2,
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

		console.log('hola', this.state.imagesForTrain);
		for (let i = 0; i < this.state.imagesForTrain.length; i++) {
			let ts = tf.tensor1d(this.state.imagesForTrain[i], 'int32');
			let input = tf.reshape(ts, [-1, this.resizeHeight, this.resizeWidth, 1]);
			//const input = tf.tensor([ts], [this.state.imagesForTrain.length, this.resizeHeight, this.resizeWidth, 1], 'int32');
			//input.print();
			//const labels = tf.tensor2d(this.trainLabels, [this.trainLabels.length / NUM_CLASSES, NUM_CLASSES]);
			//const input = await tf.tensor2d(, [1, 1]);
			const labels = tf.tensor2d([[0], [1]], [2, 1]);
			labels.print();
			//console.log('el input', input);
			//console.log('e. label', label);

			await this.model.fit(input, labels, {
				batchSize: 1,
				epochs: 1
			});
		}
	}*/

	/*public llama = () => {
		//console.log('Images es ', this.state.images);
		const canvas = document.querySelector("canvas");
		const ctx = canvas.getContext("2d");

		for (let j = 0; j < this.state.images.length; j++) {
			const image = new Image();
			image.src = this.state.images[j].path;
			image.onload = () => {
				canvas.width = this.resizeWidth;
				canvas.height = this.resizeHeight;
				ctx.drawImage(image, 0, 0, this.resizeWidth, this.resizeHeight);
				const width = this.resizeWidth;
				const height = this.resizeHeight;
				const nImg = new Image();
				let imageData = ctx.getImageData(0, 0, width, height);
				let numChannels = 3;
				const pixels = this.grayscale(imageData);
				ctx.putImageData(pixels, 0, 0);
				const values = new Int32Array(width * height * numChannels);
				for (let i = 0; i < pixels.data.length; i++) {
					for (let channel = 0; channel < numChannels; ++channel) {
						values[i * numChannels + channel] = pixels.data[i * 4 + channel];
					}
				}
				let data = this.state.imagesForTrain;
				data.push(values);
				this.setState({ imagesForTrain: data }, this.test.bind(this));
			}
		}
	}*/

	public load = () => {
		let NUM_DATASET_ELEMENTS = 2;
		const IMAGE_H = 300;
		const IMAGE_W = 300;
		const IMAGE_SIZE = IMAGE_H * IMAGE_W;
		// Make a request for the MNIST sprited image.
		const img = new Image();
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		/*	const imgRequest = new Promise((resolve, reject) => {
				img.crossOrigin = '';
				img.onload = () => {
					img.width = img.naturalWidth;
					img.height = img.naturalHeight;
	
					const datasetBytesBuffer = new ArrayBuffer(NUM_DATASET_ELEMENTS * IMAGE_SIZE * 4);
	
					const chunkSize = 5000;
					canvas.width = img.width;
					canvas.height = chunkSize;
	
					for (let i = 0; i < NUM_DATASET_ELEMENTS / chunkSize; i++) {
						const datasetBytesView = new Float32Array(datasetBytesBuffer, i * IMAGE_SIZE * chunkSize * 4, IMAGE_SIZE * chunkSize);
						ctx.drawImage(img, 0, i * chunkSize, img.width, chunkSize, 0, 0, img.width, chunkSize);
	
						const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	
						for (let j = 0; j < imageData.data.length / 4; j++) {
							// All channels hold an equal value since the image is grayscale, so
							// just read the red channel.
							datasetBytesView[j] = imageData.data[j * 4] / 255;
						}
					}
					let datasetImages = new Float32Array(datasetBytesBuffer);
	
					resolve();
				};
				img.src = this.state.images[i].path;
			});
	
			const labelsRequest = fetch(MNIST_LABELS_PATH);
			const [imgResponse, labelsResponse] =
				await Promise.all([imgRequest, labelsRequest]);
	
			this.datasetLabels = new Uint8Array(await labelsResponse.arrayBuffer());
	
			// Slice the the images and labels into train and test sets.
			this.trainImages =
				this.datasetImages.slice(0, IMAGE_SIZE * NUM_TRAIN_ELEMENTS);
			this.testImages = this.datasetImages.slice(IMAGE_SIZE * NUM_TRAIN_ELEMENTS);
			this.trainLabels =
				this.datasetLabels.slice(0, NUM_CLASSES * NUM_TRAIN_ELEMENTS);
			this.testLabels =
				this.datasetLabels.slice(NUM_CLASSES * NUM_TRAIN_ELEMENTS);*/
	}

	private grayscale = (imageData: ImageData) => {
		for (var i = 0; i < imageData.data.length; i += 4) {
			var avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
			imageData.data[i] = avg; // red
			imageData.data[i + 1] = avg; // green
			imageData.data[i + 2] = avg; // blue
		}
		return imageData;
	};

	nextTrainBatch(batchSize: Number) {
		this.trainIndices = tf.util.createShuffledIndices(this.NUM_TRAIN_ELEMENTS);
		return this.nextBatch(
			batchSize, [this.state.imagesForTrain, this.state.labels], () => {
				this.shuffledTrainIndex = (this.shuffledTrainIndex + 1) % this.trainIndices.length;
				return this.trainIndices[this.shuffledTrainIndex];
			});
	}

	nextBatch(batchSize: any, data: any, index: any) {
		const batchImagesArray = new Float32Array(batchSize * this.IMAGE_SIZE);
		const batchLabelsArray = new Uint8Array(batchSize * this.NUM_CLASSES);

		for (let i = 0; i < batchSize; i++) {
			const idx = index();

			const image =
				data[0].slice(idx * this.IMAGE_SIZE, idx * this.IMAGE_SIZE + this.IMAGE_SIZE);
			batchImagesArray.set(image, i * this.IMAGE_SIZE);

			const label =
				data[1].slice(idx * this.NUM_CLASSES, idx * this.NUM_CLASSES + this.NUM_CLASSES);
			batchLabelsArray.set(label, i * this.NUM_CLASSES);
		}

		//const xs = tf.tensor4d(batchImagesArray, [batchSize / this.IMAGE_SIZE, this.re, IMAGE_W, 1]);
		//const labels = tf.tensor2d(batchLabelsArray, [this.trainLabels.length / NUM_CLASSES, NUM_CLASSES]);

		const xs = tf.tensor2d(batchImagesArray, [batchSize, this.IMAGE_SIZE]);
		const labels = tf.tensor2d(batchLabelsArray, [batchSize, this.NUM_CLASSES]);

		return { xs, labels };
	}

	private concat = (first: Float32Array, second: Float32Array) => {
		let firstLength = first.length;
		let result = new Float32Array(firstLength + second.length);
		result.set(first);
		result.set(second, firstLength);
		return result;
	}


	private onDrop = async (acceptedFiles: any, rejectedFiles: any) => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		let imgRequests = new Array<Promise<any>>();

		for (let j = 0; j < acceptedFiles.length; j++) {
			imgRequests.push(new Promise((resolve, reject) => {
				const image = new Image();
				image.crossOrigin = '';
				image.onload = () => {
					canvas.width = this.resizeWidth;
					canvas.height = this.resizeHeight;
					ctx.drawImage(image, 0, 0, this.resizeWidth, this.resizeHeight);
					const datasetBytesView = new Float32Array(this.resizeWidth * this.resizeHeight);
					const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

					for (let j = 0; j < imageData.data.length / 4; j++) {
						// All channels hold an equal value since the image is grayscale, so
						// just read the red channel.
						datasetBytesView[j] = imageData.data[j * 4] / 255;
					}
					this.setState({ imagesForTrain: this.concat(this.state.imagesForTrain, datasetBytesView) });
					resolve();
				}
				image.src = acceptedFiles[j].path;
			}));
		}

		await Promise.all(imgRequests);
		this.setState({ labels: new Uint8Array([0, 1]) });
		this.trainIndices = tf.util.createShuffledIndices(this.NUM_TRAIN_ELEMENTS);
		await this.create();




		/*console.log(this.state.imagesForTrain);
		let labelArr = new Uint8Array([0, 1]);
		let nClasses = 2;
		*/

	}

	create = async () => {
		const model = tf.sequential();

		model.add(tf.layers.conv2d({
			inputShape: [this.resizeHeight, this.resizeWidth, 1],
			kernelSize: 5,
			filters: 8,
			strides: 1,
			activation: 'relu',
			kernelInitializer: 'VarianceScaling'
		}));

		model.add(tf.layers.maxPooling2d({
			poolSize: [2, 2],
			strides: [2, 2]
		}));

		model.add(tf.layers.conv2d({
			kernelSize: 5,
			filters: 16,
			strides: 1,
			activation: 'relu',
			kernelInitializer: 'VarianceScaling'
		}));

		model.add(tf.layers.maxPooling2d({
			poolSize: [2, 2],
			strides: [2, 2]
		}));

		model.add(tf.layers.flatten({}));

		model.add(tf.layers.dense({
			units: this.NUM_CLASSES,
			kernelInitializer: 'VarianceScaling',
			activation: 'softmax'
		}));

		const LEARNING_RATE = 0.15;
		const optimizer = tf.train.sgd(LEARNING_RATE);

		model.compile({
			optimizer: optimizer,
			loss: 'categoricalCrossentropy',
			metrics: ['accuracy'],
		});

		const xs = tf.tensor4d(this.state.imagesForTrain, [this.state.imagesForTrain.length / (this.resizeHeight * this.resizeWidth), this.resizeHeight, this.resizeWidth, 1]);
		xs.print();
		const labels = tf.tensor2d([0, 0], [this.state.labels.length / this.NUM_CLASSES, this.NUM_CLASSES]);
		labels.print();
		const batchSize = 320;
		const validationSplit = 0.15;
		const h = await model.fit(xs, labels, { batchSize, validationSplit, epochs: 1 });
		console.log(h);
		/*const loss = h.history.loss[0];
		const accuracy = h.history.acc[0];

		console.log(loss);
		console.log(accuracy);*/
		/*
				// How many examples the model should "see" before making a parameter update.
				const BATCH_SIZE = 2;//64
				// How many batches to train the model for.
				const TRAIN_BATCHES = 2;//100
				for (let i = 0; i < TRAIN_BATCHES; i++) {
					const batch = this.nextTrainBatch(BATCH_SIZE);
					// The entire dataset doesn't fit into memory so we call fit repeatedly
					// with batches.
					const history = await model.fit(
						batch.xs.reshape([BATCH_SIZE, this.resizeHeight, this.resizeWidth, 1]),
						batch.labels,
						{
							batchSize: BATCH_SIZE,
							epochs: 1
						});
		
					const loss = history.history.loss[0];
					const accuracy = history.history.acc[0];
		
					console.log(loss);
					console.log(accuracy);
				}*/
	}

	public render(): JSX.Element {
		//Item selector es para seleccionar el network que vamos a entrenar
		/*return (
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
		);*/
		return (
			<div>
				<canvas id="canvas" ></canvas>
				<Dropzone accept="image/jpeg, image/png"
					onDrop={this.onDrop} />
			</div>
		);
	}
}