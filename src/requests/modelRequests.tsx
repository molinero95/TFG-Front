import { RequestException } from "../exceptions/requestException";

export class ModelRequests{

    public static getModelsNames(): Promise<Array<string>>{
        return fetch("http://localhost:3000/models", {
            method: "GET"
        })
        .then(data => data.json())
        .catch(err=> {throw new RequestException(err)});
    }

    public static getModelVersions(modelName: string){
        return fetch("/modelVersions", {
            method: "Get"
        })
        .then(data => data.json())
        .catch(err => {throw new RequestException(err)});
    }


    
}