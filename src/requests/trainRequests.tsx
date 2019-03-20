import { RequestException } from "../exceptions/requestException";
import { Constants } from "../common/constants";
import { TrainParameters } from "../entities/trainParameters";
import { ImageItem } from "../entities/ImageItem";
import { ClassItem } from "../entities/classItem";

export class TrainRequests {

    //TODO: datos de train por param
    public static async trainModel(modelId: number, versionId: number, trainParameters: TrainParameters, images: Array<ImageItem>){
        let formData: FormData = new FormData();
        formData.append("data", JSON.stringify({
            modelId: modelId,
            versionId: versionId,
            trainParameters: trainParameters,
            images: images.map(item => {return {class: item.class, fileName: item.file.name}})
        }));
        images.forEach(img => {
            formData.append(img.file.name, img.file)
        });

        return fetch(Constants.SERVICE_URL + "/train", {
            method: "POST",
            body: formData
        })
        .then(data => data.json())
        .catch(err => {throw new RequestException(err)});
    }

}