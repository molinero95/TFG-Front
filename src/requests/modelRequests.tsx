import { RequestException } from "../exceptions/requestException";

export class ModelRequests{

    public static getModelsNames(): Promise<Array<string>>{
        return fetch("http://localhost:3000/model/models", {
            method: "GET"
        })
        .then(data => data.json())
        .then(data => data.models)
        .catch(err=> {throw new RequestException(err)});
    }

    public static postCreateModel(modelName: string): Promise<void>{
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

    public static deleteModel(modelName: string): Promise<void>{
        return fetch("http://localhost:3000/model/deleteModel", {
            method: "DELETE",
            body: JSON.stringify({name: modelName}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(data => data.json())
        .catch(err => {throw new RequestException(err)});
    }
    
}