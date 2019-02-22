import { RequestException } from "../exceptions/requestException";

export class ModelRequest{

    public static getModelsNames(): Promise<Array<string>>{
        return fetch("/models", {
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