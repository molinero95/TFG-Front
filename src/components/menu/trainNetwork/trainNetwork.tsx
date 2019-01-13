import * as React from "react";
import { ItemSelector } from "../../itemSelector";
import { INetwork } from "../../../entities/inetwork";
import { NetworkService } from "../../../requestServices/networkService";
import { IBaseItem } from '../../../entities/IBaseItem';
import { Label } from 'office-ui-fabric-react/lib/Label';
import Dropzone from 'react-dropzone';
import * as tf from '@tensorflow/tfjs';
import 'bootstrap/dist/css/bootstrap.css';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { initializeIcons } from '@uifabric/icons';
initializeIcons();

interface ITrainNetworkProps {

}

interface ITrainNetworkState {
	images: Array<ImageData>
}

export class TrainNetwork extends React.Component<ITrainNetworkProps, ITrainNetworkState>{
	private readonly imageWidht: number = 224;
	private readonly imageHeight: number = 224;
	//private readonly numImages: number = 200;
	private readonly numClasses: number = 2;
	private readonly denseUnits: number = 100; //10 | 100 | 200
	private readonly learningRate: number = 0.0001; // 0.00001 | 0.001 | 0.003
	private readonly batchSizeFraction: number = 0.4; // 0.1 | 1
	private readonly epochs: number = 10; // 10, 40

	private model: any;
	private truncatedMobileNetModel: any;
	private xs: any = null;
	private ys: any = null;

	public constructor(props: ITrainNetworkProps) {
		super(props);
		this.state = {
			images: new Array<ImageData>()
		}
		console.log('Image Width:', this.imageWidht, 'Image Height:', this.imageHeight);
		console.log('Num classes:', this.numClasses, 'Learning Rate:', this.learningRate);
		console.log('BatchSizeFraction:', this.batchSizeFraction, 'Epochs:', this.epochs);
	}

	private onDrop = async (acceptedFiles: any, rejectedFiles: any) => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		let imgRequests = new Array<Promise<any>>();
		if (this.truncatedMobileNetModel === undefined) {
			this.truncatedMobileNetModel = await this.loadTruncatedMobileNet();
			console.log('Model loaded!', this.truncatedMobileNetModel);
		}
		for (let j = 0; j < acceptedFiles.length; j++) {
			imgRequests.push(new Promise((resolve, reject) => {
				const image = new Image();
				image.crossOrigin = '';
				image.onload = () => {
					canvas.width = this.imageWidht;
					canvas.height = this.imageHeight;
					ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
					//const datasetBytesView = new Float32Array(canvas.width * canvas.height);
					const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
					const isDog = document.getElementById('dog') as HTMLInputElement;
					const isShark = document.getElementById('shark') as HTMLInputElement;
					let label;
					if (isDog.checked)
						label = 0;
					else if (isShark.checked)
						label = 1;
					else
						console.log('Input error!');
					this.setExampleHandler(imageData, label);
					let images = this.state.images;
					images.push(imageData);
					this.setState({
						images
					});
					resolve();
				}
				image.src = acceptedFiles[j].path;
			}));
		}
		await Promise.all(imgRequests);
		console.log('Images loaded!')
	}


	private loadTruncatedMobileNet = async () => {
		const mobilenet = await tf.loadModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
		// Return a model that outputs an internal activation.
		const layer = mobilenet.getLayer('conv_pw_13_relu');
		return tf.model({ inputs: mobilenet.inputs, outputs: layer.output });
	};

	/**
   * Adds an example to the controller dataset.
   * @param {Tensor} example A tensor representing the example. It can be an image,
   *     an activation, or any other type of Tensor.
   * @param {number} label The label of the example. Should be a number.
   */
	private addExample = async (example: tf.Tensor, label: number) => {
		// One-hot encode the label.
		const y = tf.tidy(() => tf.oneHot(tf.tensor1d([label]).toInt(), this.numClasses));

		if (this.xs == null) {
			// For the first example that gets added, keep example and y so that the
			// ControllerDataset owns the memory of the inputs. This makes sure that
			// if addExample() is called in a tf.tidy(), these Tensors will not get
			// disposed.
			this.xs = tf.keep(example);
			this.ys = tf.keep(y);
		} else {
			const oldX = this.xs;
			this.xs = tf.keep(oldX.concat(example, 0));

			const oldY = this.ys;
			this.ys = tf.keep(oldY.concat(y, 0));

			oldX.dispose();
			oldY.dispose();
			y.dispose();
		}
	}

	/**
 * Crops an image tensor so we get a square image with no white space.
 * @param {Tensor4D} img An input image Tensor to crop.
 */
	private cropImage(img: tf.Tensor<tf.Rank.R3>) {
		const size = Math.min(img.shape[0], img.shape[1]);
		const centerHeight = img.shape[0] / 2;
		const beginHeight = centerHeight - (size / 2);
		const centerWidth = img.shape[1] / 2;
		const beginWidth = centerWidth - (size / 2);
		return img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
	}

	private createTensor = (image: ImageData) => {
		return tf.tidy(() => {
			const webcamImage = tf.fromPixels(image);
			const croppedImage = this.cropImage(webcamImage);
			const batchedImage = croppedImage.expandDims(0);

			return batchedImage.toFloat().div(127).sub(1);
		});
	}

	private setExampleHandler = (img: ImageData, label: number) => {
		tf.tidy(() => {
			//const img = webcam.capture();
			const resp = this.truncatedMobileNetModel.predict(this.createTensor(img));
			this.addExample(resp, label);
			console.log('Deberia ser: ', label);
			// Draw the preview thumbnail.
			//ui.drawThumb(img, label);
		});
	};

	private train = async () => {
		if (this.xs == null) {
			throw new Error('Add some examples before training!');
		}

		// Creates a 2-layer fully connected model. By creating a separate model,
		// rather than adding layers to the mobilenet model, we "freeze" the weights
		// of the mobilenet model, and only train weights from the new model.
		this.model = tf.sequential({
			layers: [
				// Flattens the input to a vector so we can use it in a dense layer. While
				// technically a layer, this only performs a reshape (and has no training
				// parameters).
				tf.layers.flatten({
					inputShape: this.truncatedMobileNetModel.outputs[0].shape.slice(1)
				}),
				// Layer 1.
				tf.layers.dense({
					units: this.denseUnits,
					activation: 'relu',
					kernelInitializer: 'varianceScaling',
					useBias: true
				}),
				tf.layers.dense({
					units: this.denseUnits * 2,
					activation: 'relu',
					kernelInitializer: 'varianceScaling',
					useBias: true
				}),
				// Layer 2. The number of units of the last layer should correspond
				// to the number of classes we want to predict.
				tf.layers.dense({
					units: this.numClasses,
					kernelInitializer: 'varianceScaling',
					useBias: false,
					activation: 'softmax'
				})
			]
		});
		// Creates the optimizers which drives training of the model.
		const optimizer = tf.train.adam(this.learningRate);
		// We use categoricalCrossentropy which is the loss function we use for
		// categorical classification which measures the error between our predicted
		// probability distribution over classes (probability that an input is of each
		// class), versus the label (100% probability in the true class)>
		this.model.compile({ optimizer: optimizer, loss: 'categoricalCrossentropy' });

		// We parameterize batch size as a fraction of the entire dataset because the
		// number of examples that are collected depends on how many examples the user
		// collects. This allows us to have a flexible batch size.
		const batchSize =
			Math.floor(this.xs.shape[0] * this.batchSizeFraction);
		if (!(batchSize > 0)) {
			throw new Error(
				`Batch size is 0 or NaN. Please choose a non-zero fraction.`);
		}

		// Train the model! Model.fit() will shuffle xs & ys so we don't have to.
		this.model.fit(this.xs, this.ys, {
			batchSize,
			epochs: this.epochs,
			callbacks: {
				onBatchEnd: async (batch: any, logs: any) => {
					console.log('Loss: ' + logs.loss.toFixed(5));
				}
			}
		});
	}

	private handleTrain = async () => {
		await this.train();
		//this.xs.dispose();
		//this.ys.dispose();
	}

	private predict = async (img: ImageData) => {
		const prediction = tf.tidy(() => {
			// Capture the frame from the webcam.
			//const img = webcam.capture();

			// Make a prediction through mobilenet, getting the internal activation of
			// the mobilenet model, i.e., "embeddings" of the input images.
			const embeddings = this.truncatedMobileNetModel.predict(this.createTensor(img));
			embeddings.print();
			// Make a prediction through our newly-trained model using the embeddings
			// from mobilenet as input.
			const predictions = this.model.predict(embeddings);

			// Returns the index with the maximum probability. This number corresponds
			// to the class the model thinks is the most probable given the input.
			const predict = predictions.as1D().argMax();
			predict.print();
			//console.log('Predicted', predict);
			return predict;
		});
		const res = (await prediction.data())[0];
		console.log('Predicted', res);
	}

	private predictHandle = (acceptedFiles: any, rejectedFiles: any) => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		const image = new Image();
		image.crossOrigin = '';
		image.onload = async () => {
			canvas.width = this.imageWidht;
			canvas.height = this.imageHeight;
			ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
			//const datasetBytesView = new Float32Array(canvas.width * canvas.height);
			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			await this.predict(imageData);
		}
		image.src = acceptedFiles[0].path;
	}

	/*public render(): JSX.Element {
		return (
			<div>
				<Dropzone accept="image/jpeg, image/png" onDrop={this.onDrop} >
					<p>Selecciona las imágenes para la clase </p>
				</Dropzone>
				<canvas id="canvas" ></canvas>
				<input type="checkbox" name="dog" value="dog" id="dog" /> Dog
				<input type="checkbox" name="shark" value="shark" id="shark" /> Shark
				<button onClick={this.handleTrain}>Train</button>
				<Dropzone accept="image/jpeg, image/png" onDrop={this.predictHandle} >
					<p style={{ textAlign: "center" }}> Drop images for make predictions!</p>
				</Dropzone>
			</div>
		);
	}*/

	public render(): JSX.Element {
		return (
			<div>
				<button className="btn btn-success">
					<Icon iconName="AddTo" className="ms-IconExample" /> Añadir clase
				</button>
				<input type="checkbox" name="dog" value="dog" id="dog" /> Dog
				<input type="checkbox" name="shark" value="shark" id="shark" /> Shark
				<Dropzone accept="image/jpeg, image/png" onDrop={this.onDrop} >
					<p>Selecciona las imágenes para la clase </p>
				</Dropzone>
				<canvas id="canvas" hidden></canvas>
				<button onClick={this.handleTrain}>Train</button>
				<Dropzone accept="image/jpeg, image/png" onDrop={this.predictHandle} >
					<p style={{ textAlign: "center" }}> Drop images for make predictions!</p>
				</Dropzone>
			</div>
		);
	}
}