import React = require("react");
import * as tf from '@tensorflow/tfjs';
import { ServiceURLs } from "../../entities/constants/serviceURLs";
import { TrainNetworkData } from "../../entities/trainer/trainNetworkData";



export class ImageTrainer {
    private model: tf.Model;
    private truncatedMobileNetModel: tf.Model;
    private xs: tf.Tensor;
    private ys: tf.Tensor;

    private numClasses: number;

    constructor() {
        this.model,
            this.truncatedMobileNetModel,
            this.xs,
            this.ys = null;

        this.numClasses = 0;
        this.loadMobileNetModel();
    }


    public setExample(img: ImageData, label: number): any {
        tf.tidy(() => {
            //const img = webcam.capture();
            const resp: tf.Tensor<tf.Rank> = this.truncatedMobileNetModel.predict(this.createTensor(img)) as tf.Tensor<tf.Rank>;
            this.addExample(resp, label);
            // Draw the preview thumbnail.
            //ui.drawThumb(img, label);
        });
    }

    public setNumClasses(number: number): void {
        this.numClasses = number;
    }

    public getNumClasses(): number {
        return this.numClasses;
    }

    

    public async train(trainNetworkData: TrainNetworkData): Promise<void> {
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
                    units: trainNetworkData.denseUnits,
                    activation: 'relu',
                    kernelInitializer: 'varianceScaling',
                    useBias: true
                }),
                tf.layers.dense({
                    units: trainNetworkData.denseUnits * 2,
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
        const optimizer = tf.train.adam(trainNetworkData.learningRate);
        // We use categoricalCrossentropy which is the loss function we use for
        // categorical classification which measures the error between our predicted
        // probability distribution over classes (probability that an input is of each
        // class), versus the label (100% probability in the true class)>
        this.model.compile({ optimizer: optimizer, loss: 'categoricalCrossentropy' });

        // We parameterize batch size as a fraction of the entire dataset because the
        // number of examples that are collected depends on how many examples the user
        // collects. This allows us to have a flexible batch size.
        const batchSize =
            Math.floor(this.xs.shape[0] * trainNetworkData.batchSizeFraction);
        if (!(batchSize > 0)) {
            throw new Error(
                `Batch size is 0 or NaN. Please choose a non-zero fraction.`);
        }

        // Train the model! Model.fit() will shuffle xs & ys so we don't have to.
        this.model.fit(this.xs, this.ys, {
            batchSize,
            epochs: trainNetworkData.epochs,
            callbacks: {
                onBatchEnd: async (batch: any, logs: any) => {
                    console.log('Loss: ' + logs.loss.toFixed(5));
                }
            }
        });
    }


    public async predict(img: ImageData): Promise<any> {
        const prediction = tf.tidy(() => {
            // Capture the frame from the webcam.
            //const img = webcam.capture();

            // Make a prediction through mobilenet, getting the internal activation of
            // the mobilenet model, i.e., "embeddings" of the input images.
            const embeddings = this.truncatedMobileNetModel.predict(this.createTensor(img)) as tf.Tensor<tf.Rank>;
            embeddings.print();
            // Make a prediction through our newly-trained model using the embeddings
            // from mobilenet as input.
            const predictions = this.model.predict(embeddings) as tf.Tensor<tf.Rank>;

            // Returns the index with the maximum probability. This number corresponds
            // to the class the model thinks is the most probable given the input.
            const predict = predictions.as1D().argMax();
            predict.print();
            //console.log('Predicted', predict);
            return predict;
        });
        return (await prediction.data())[0];
    }

    private loadMobileNetModel(): void {
        if (this.truncatedMobileNetModel === undefined) {
            this.loadTruncatedMobileNet().then((model => {
                this.truncatedMobileNetModel = model;
                console.log('Model loaded!', this.truncatedMobileNetModel);
            }));
        }
    }

    private async loadTruncatedMobileNet(): Promise<tf.Model> {
        const mobilenet = await tf.loadModel(ServiceURLs.MOBILENETURL);
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
    private async addExample(example: tf.Tensor<tf.Rank>, label: number) {
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

}