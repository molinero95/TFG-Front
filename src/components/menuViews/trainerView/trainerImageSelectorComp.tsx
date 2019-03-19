import React = require("react");
import * as DropZoneLib from "react-dropzone";
import { ItemSelect } from "../../../common/itemSelect";
import { ImageItem } from "../../../entities/ImageItem";
import { TrainerTopMenuComp } from "./trainerTopMenuComp";


let Dropzone = DropZoneLib.default;
interface ITrainerImageSelectorCompProps {
    onAddedImages: (images: Array<File>) => void;
    onImageSelected: (image: ImageItem) => void;
    onDeselectAllImagesClick: () => void;
    onSelectAllImagesClick: () => void;
    onRemoveImagesClick: () => void;
    images: Array<ItemSelect<ImageItem>>;
}

interface ITrainerImageSelectorCompState {
}

export class TrainerImageSelectorComp extends React.Component<ITrainerImageSelectorCompProps, ITrainerImageSelectorCompState>{
    constructor(props: ITrainerImageSelectorCompProps) {
        super(props);
    }

    

    private onDropItem(accepted: File[], rejected: File[], event: React.DragEvent<HTMLDivElement>) {
        this.props.onAddedImages(accepted);
    }


    //TODO: image style
    private showImages(): Array<JSX.Element> {
        let res: Array<JSX.Element> = new Array<JSX.Element>();
        this.props.images.forEach(image => {
            let item: JSX.Element;
            if (image.isSelected && image.item.class != null) {
                item = <img className="imageSize pointerCursor imageClassified imageSelected" onClick={() => { this.props.onImageSelected(image.item) }} src={image.item.imageUrl}></img>
            }
            else if (image.isSelected && image.item.class == null) {
                item = <img className="imageSize pointerCursor imageSelected" onClick={() => { this.props.onImageSelected(image.item) }} src={image.item.imageUrl}></img>
            }
            else if (!image.isSelected && image.item.class != null) {
                item = <img className="imageSize pointerCursor imageClassified" onClick={() => { this.props.onImageSelected(image.item) }} src={image.item.imageUrl}></img>
            }
            else {
                item = <img className="imageSize pointerCursor" onClick={() => { this.props.onImageSelected(image.item) }} src={image.item.imageUrl}></img>
            }
            res.push(item);
        });
        return res;
    }

    public render() {
        return (
            <div className="maxHeigth maxWidth">
                <TrainerTopMenuComp
                    onDeselectAllClick={this.props.onDeselectAllImagesClick}
                    onSelectAllClick={this.props.onSelectAllImagesClick}
                    onRemoveImagesClick={this.props.onRemoveImagesClick}
                ></TrainerTopMenuComp>
                <Dropzone className="maxHeigth maxWidth scrollYAuto " onDrop={this.onDropItem.bind(this)} disableClick={true} >
                    <div className="topPadding prettyMargin">
                        {this.showImages()}
                    </div>
                </Dropzone>
            </div>
        );
    }
}