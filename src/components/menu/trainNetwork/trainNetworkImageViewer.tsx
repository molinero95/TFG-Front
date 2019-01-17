import React = require("react");
import { ImageToTrainData } from "../../../entities/images/imagesForTrainData";
import { ClassData } from "../../../entities/trainer/classData";

interface TrainNetworkImageViewerProps {
    images: Array<ImageToTrainData>;
    selectedClass: ClassData;
}


interface TrainNetworkImageViewerState {

}

export class TrainNetworkImageViewer extends React.Component<TrainNetworkImageViewerProps, TrainNetworkImageViewerState> {
    constructor(props: TrainNetworkImageViewerProps) {
        super(props);

    }

    private selectImage(image: ImageToTrainData) {
        if (!image.classified) {
            image.selected = !image.selected;
            if (image.selected)
                image.labelData = this.props.selectedClass;
            this.forceUpdate();
        }
    }

    private imageSelectedClassName(image: ImageToTrainData): string {
        if (image.selected)
            return "imageSelected";
        return "";
    }

    private imageClassifiedClassName(image: ImageToTrainData): string {
        if(image.classified)
            return "imageClassified";
        return "";
    }

    private printImages(): Array<JSX.Element> {
        let result: Array<JSX.Element> = new Array<JSX.Element>();
        this.props.images.forEach((image, index) => {
            let className = "imageSize " + this.imageSelectedClassName(image);
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