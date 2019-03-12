import { RequestException } from "../exceptions/requestException";

export class TrainRequests {

    //TODO: datos de train por param
    public static trainModel(modelName: string, modelVersion: string){
        return fetch("/modelVersions", {
            method: "Get"
        })
        .then(data => data.json())
        .catch(err => {throw new RequestException(err)});
    }

}