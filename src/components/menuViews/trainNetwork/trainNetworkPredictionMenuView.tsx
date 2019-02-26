import React = require("react");
import { NetworkImageData } from "../../../entities/images/NetworkImageData";
import Dropzone from "react-dropzone";
import { CanvasHelper } from "../../../helpers/canvasHelper";

interface TrainNetworkPredictionMenuViewProps {
    handleMakePrediction: (imageForPrediction: NetworkImageData) => void;
}

interface TrainNetworkPredictionMenuViewState {
    imageForPrediction: NetworkImageData;
}

export class TrainNetworkPredictionMenuView extends React.Component<TrainNetworkPredictionMenuViewProps, TrainNetworkPredictionMenuViewState>{

    constructor(props: TrainNetworkPredictionMenuViewProps) {
        super(props);
        this.state = {
            imageForPrediction: null
        }
    }

    private handlePrediction(): void {
        if (this.state.imageForPrediction) 
            this.props.handleMakePrediction(this.state.imageForPrediction);
        else
            alert("No hay imagen para la predicción");
    }

    private async onDropPredictionImage(acceptedFiles: Array<File>, rejectedFiles: Array<File>): Promise<any> {
        let url = URL.createObjectURL(acceptedFiles[0]);
        this.setState({
            imageForPrediction: {
                imageUrl: url,
                classData: null,
                selected: false,
                classified: false
            }
        });
    }

    private printImage(): JSX.Element{
        let image: JSX.Element = null;
        if(this.state.imageForPrediction)
            image = <img className="imageSize" src={this.state.imageForPrediction.imageUrl}></img>

        return image;
    }

    public render() {
        return (<div>
            <div className= "centerContent">
                {this.printImage()}
            </div>
            <div className="centerContent smallMarginTop">
                <Dropzone className="predictionDropzone dropzone" accept="image/jpeg, image/png" onDrop={this.onDropPredictionImage.bind(this)} >
                    <p className="predictionDropzone"> Drop predicition image here</p>
                </Dropzone>
            </div>
            <div className="centerContent smallMarginTop">
                <button onClick={this.handlePrediction.bind(this)} className="btn btn-primary maxWidth">Predict</button>
            </div>
        </div>);
    }
}