import { RequestException } from "../exceptions/requestException";
import { Constants } from "../common/constants";

export class TrainRequests {

    //TODO: datos de train por param
    public static async trainModel(modelName: string, modelVersion: string){
        return fetch(Constants.SERVICE_URL + "/modelVersions", {
            method: "Get"
        })
        .then(data => data.json())
        .catch(err => {throw new RequestException(err)});
    }

}