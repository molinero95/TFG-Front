import React = require("react");
import * as DropZoneLib from "react-dropzone";
import { SelectableItem } from "../../../common/selectableItem";
import { ImageItem } from "../../../entities/ImageItem";
import { TrainerTopMenu } from "./trainerTopMenu";


let Dropzone = DropZoneLib.default;


interface ITrainerImageSelectorProps {
    onAddedImages: (images: Array<File>) => void;
    onImageSelected: (image: ImageItem) => void;
    onDeselectAllImagesClick: () => void;
    onSelectAllImagesClick: () => void;
    onRemoveImagesClick: () => void;
    images: Array<SelectableItem<ImageItem>>;
}

interface ITrainerImageSelectorState {
}

export class TrainerImageSelector extends React.Component<ITrainerImageSelectorProps, ITrainerImageSelectorState>{
    constructor(props: ITrainerImageSelectorProps) {
        super(props);
    }

    

    private onDropItem(accepted: File[], rejected: File[], event: React.DragEvent<HTMLDivElement>) {
        this.props.onAddedImages(accepted);
    }


    private showImages(): Array<JSX.Element> {
        let res: Array<JSX.Element> = new Array<JSX.Element>();
        this.props.images.forEach(image => {
            let item: JSX.Element;
            if (image.isSelected && image.item.class == null) { //Seleccionada y no marcada
                item = 
                    <img 
                        key = {"image-" + image.item.imageUrl}
                        className="imageSize relPosition pointerCursor imageSelected" 
                        onClick={() => { this.props.onImageSelected(image.item) }} 
                        src={image.item.imageUrl}>
                    </img>
            }
            else if (!image.isSelected && image.item.class != null) { //No seleccionada y marcada
                item = 
                    <div 
                        className="imageSize relPosition"
                        key={"divF-image-" + image.item.imageUrl}>
                        <img 
                            key = {"image-" + image.item.imageUrl}
                            className="imageSize relPosition pointerCursor imageClassified" 
                            onClick={() => { this.props.onImageSelected(image.item) }} 
                            src={image.item.imageUrl}>
                        </img>
                        <div 
                            className="primaryColorBg absPositionLittleBottom imageClassText borderRounded"
                            key = {"divS-image-" + image.item.imageUrl} >
                            {image.item.class.name}
                        </div>
                    </div>

            }
            else if(!image.isSelected && image.item.class == null){ //No seleccionada y no marcada
                item = 
                    <img 
                        key = {"image-" + image.item.imageUrl}
                        className="imageSize relPosition pointerCursor" 
                        onClick={() => { this.props.onImageSelected(image.item) }} 
                        src={image.item.imageUrl}>
                    </img>
            }
            else { //Seleccionada y marcada
                item = 
                    <div
                        key={"divF-image-" + image.item.imageUrl} 
                        className="imageSize relPosition">
                        <img 
                            key = {"image-" + image.item.imageUrl}
                            className="imageSize relPosition pointerCursor imageSelected" 
                            onClick={() => { this.props.onImageSelected(image.item) }} 
                            src={image.item.imageUrl}>
                        </img>
                        <div
                            key = {"divS-image-" + image.item.imageUrl} 
                            className="primaryColorBg absPositionLittleBottom imageClassText borderRounded">
                            {image.item.class.name}
                        </div>
                    </div>
            }
            res.push(item);
        });
        return res;
    }

    public render() {
        return (
            <div className="maxHeigth maxWidth">
                <TrainerTopMenu
                    onDeselectAllClick={this.props.onDeselectAllImagesClick}
                    onSelectAllClick={this.props.onSelectAllImagesClick}
                    onRemoveImagesClick={this.props.onRemoveImagesClick}
                ></TrainerTopMenu>
                <Dropzone className="maxHeigth notMaxHeigth maxWidth scrollYAuto " onDrop={this.onDropItem.bind(this)} disableClick={true} >
                    <div className="topPadding inheritContent">
                        {this.showImages()}
                    </div>
                </Dropzone>
            </div>
        );
    }
}