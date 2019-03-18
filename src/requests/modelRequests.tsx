import { RequestException } from "../exceptions/requestException";
import { Model } from "../entities/models/model";

export class ModelRequests{

    public static async getModels(): Promise<Array<Model>>{
        return fetch("http://localhost:3000/model/models", {
            method: "GET"
        })
        .then(data => data.json())
        .then(data => data.models)
        .catch(err=> {throw new RequestException(err)});
    }

    public static async postCreateModel(modelName: string): Promise<Model>{
        return fetch("http://localhost:3000/model/createModel", {
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
        return fetch(`http://localhost:3000/model/deleteModel?id=${modelId}`, {
            method: "DELETE",
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .catch(err => {throw new RequestException(err)});
    }
    
}