import React = require("react");
import * as DropZoneLib from "react-dropzone";
import { ItemSelect } from "../../../entities/itemSelect";
import { ImageItem } from "../../../entities/images/ImageItem";


let Dropzone = DropZoneLib.default;
interface IImageSelectorCompProps {
    onAddedImages: (images: Array<File>) => void;
    onImageSelected: (image: ImageItem) => void;
    images: Array<ItemSelect<ImageItem>>;
}

interface IImageSelectorCompState {
}

export class ImageSelectorComp extends React.Component<IImageSelectorCompProps, IImageSelectorCompState>{
    constructor(props: IImageSelectorCompProps) {
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
            if(image.isSelected){
                item = <img className="imageSize pointerCursor imageSelected"  onClick={() => {this.props.onImageSelected(image.item)}} src={image.item.imageUrl}></img>
            }
            else{
                item = <img className="imageSize pointerCursor"  onClick={() => {this.props.onImageSelected(image.item)}} src={image.item.imageUrl}></img>
            }
            res.push(item);
        });
        return res;
    }

    public render() {
        return (
            <Dropzone className="maxHeigth maxWidth scrollYAuto" onDrop={this.onDropItem.bind(this)} disableClick={true} >
                <div>Arrastre imagenes aqui:</div>
                <div className="">
                    {this.showImages()}
                </div>
            </Dropzone>
        );
    }
}