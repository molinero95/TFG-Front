import React = require("react");
import { ModelTrainerLeftMenuComp } from "./modelTrainerLeftMenuComp";
import { ItemSelect } from "../../../entities/itemSelect";
import { ModelClass } from "../../../entities/models/modelClass";
import { ImageSelectorComp } from "./imageSelectorComp";
import { ImageItem } from "../../../entities/images/ImageItem";


interface IModelTrainViewCompProps {

}

interface IModelTrainViewCompState {
    testClasses: Array<ItemSelect<ModelClass>>;
    images: Array<ItemSelect<ImageItem>>;
}

export class ModelTrainerViewComp extends React.Component<IModelTrainViewCompProps, IModelTrainViewCompState>{
    constructor(props: IModelTrainViewCompProps) {
        super(props);
        this.state = {
            testClasses: [
                { isSelected: false, textToShow: "clase1", item: { id: 0, name: "clase1" } },
                { isSelected: false, textToShow: "clase2", item: { id: 0, name: "clase2" } },
                { isSelected: false, textToShow: "clase3", item: { id: 0, name: "clase3" } },
                { isSelected: false, textToShow: "clase3", item: { id: 0, name: "clase3" } },
                { isSelected: false, textToShow: "clase3", item: { id: 0, name: "clase3" } },
                { isSelected: false, textToShow: "clase3", item: { id: 0, name: "clase3" } },
                { isSelected: false, textToShow: "clase3", item: { id: 0, name: "clase3" } },
            ],
            images: []
        }
    }


    private onConfirmedClass(modelClass: ModelClass): void {
        //TODO coger imagenes seleccionadas y añadiles las clase
    }

    private onAddedImages(images: Array<File>){
        let newImagesSelect: Array<ItemSelect<ImageItem>> = [];
        images.forEach(imageFile => {
            let imageUrl = URL.createObjectURL(imageFile);
            newImagesSelect.push({
                isSelected: false,
                item: {
                    file: imageFile,
                    imageUrl: imageUrl
                },
                textToShow: null,
            });
        })
        this.setState({
            images: this.state.images.concat(newImagesSelect)
        })
    }

    private onImageSelected(imageItem: ImageItem){
        let item = this.state.images.find(image => image.item == imageItem);
        item.isSelected = !item.isSelected;
        this.forceUpdate();
    }

    public render() {
        return (
            <div className="horizontalLayout maxHeigth">
                <div id="menuWidth" className="borderRigth">
                    <ModelTrainerLeftMenuComp
                        classesWithSelection={this.state.testClasses}
                        onConfirmedClass={this.onConfirmedClass.bind(this)}
                    ></ModelTrainerLeftMenuComp>
                </div>
                <ImageSelectorComp
                    images={this.state.images}
                    onAddedImages={this.onAddedImages.bind(this)}
                    onImageSelected={this.onImageSelected.bind(this)}
                ></ImageSelectorComp>
            </div>
        );
    }
    /*
        public render() {
            if (ApplicationState.model != null) {
                let classWithSelector: Array<ItemSelect<ModelClass>> = ApplicationState.model.clases.map(item => {
                    let res: ItemSelect<ModelClass> = {
                        isSelected: false,
                        item: item,
                        textToShow: item.name,
                    };
                    return res;
                });
    
                return (
                    <div>
                        <ModelTrainerTopMenuComp
                            classesWithSelection={classWithSelector}
                        ></ModelTrainerTopMenuComp>
                    </div>
                );
            }
            else
                return (
                    <div>
                    </div>  //alert aqui
                );
        }*/
}