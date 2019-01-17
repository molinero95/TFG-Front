import React = require("react");
import { NetworkImageData } from "../../../entities/images/NetworkImageData";

interface TrainNetworkImageViewerProps {
    images: Array<NetworkImageData>;
    onImageSelected: (image: NetworkImageData) => void;
}


interface TrainNetworkImageViewerState {

}

export class TrainNetworkImageViewer extends React.Component<TrainNetworkImageViewerProps, TrainNetworkImageViewerState> {
    constructor(props: TrainNetworkImageViewerProps) {
        super(props);

    }

    private selectImage(image: NetworkImageData) {
        this.props.onImageSelected(image);
    }

    private imageSelectedClassName(image: NetworkImageData): string {
        if (image.selected)
            return "imageSelected";
        return "";
    }

    private imageClassifiedClassName(image: NetworkImageData): string {
        if(image.classified)
            return "imageClassified";
        return "";
    }

    private printImages(): Array<JSX.Element> {
        let result: Array<JSX.Element> = new Array<JSX.Element>();
        this.props.images.forEach((image, index) => {
            let className = "imageSize " + this.imageSelectedClassName(image) + " " + this.imageClassifiedClassName(image);
            let title = "";
            if (image.labelData)
                title = image.labelData.labelName;
            result.push(<span key={index} className="imageOverlay"><img key={index} title={title} src={image.imageUrl} onClick={() => this.selectImage(image)} className={className}></img></span>)
        });
        return result;
    }

    public render() {
        return (//flex
            <div id="trainNetworkImageViewer">
                {this.printImages()}
            </div>
        );
    }
}