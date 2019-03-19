import { RequestException } from "../exceptions/requestException";
import { Model } from "../entities/model";
import { Constants } from "../common/constants";

export class ModelRequests{

    public static async getModels(): Promise<Array<Model>>{
        return fetch(Constants.SERVICE_URL + "/models", {
            method: "GET"
        })
        .then(data => data.json())
        .then(data => data.models)
        .catch(err=> {throw new RequestException(err)});
    }

    public static async postCreateModel(modelName: string): Promise<Model>{
        return fetch(Constants.SERVICE_URL + "/createModel", {
            method: "POST",
            body: JSON.stringify({name: modelName}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(data => data.json())
        .catch(err => {throw new RequestException(err)});
    }

    public static async deleteModel(modelId: number): Promise<Response>{
        return fetch(Constants.SERVICE_URL + `/deleteModel?id=${modelId}`, {
            method: "DELETE",
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .catch(err => {throw new RequestException(err)});
    }
    
}