import { RequestException } from "../exceptions/requestException";
import { ModelVersion } from "../entities/models/modelVersion";

export class VersionRequests {

    public static getModelVersions(modelName: string): Promise<Array<ModelVersion>>{
        return fetch("http://localhost:3000/model/modelVersions", {
            method: "Get"
        })
        .then(data => data.json())
        .then(data => data.data)
        .catch(err => {throw new RequestException(err)});
    }


    public static postCreateVersion(modelVersion: ModelVersion): Promise<void>{
        return fetch("http://localhost:3000/model/createVersion", {
            method: "POST",
            body: JSON.stringify({version: modelVersion}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(data => data.json())
        .catch(err => {throw new RequestException(err)});
    }

    public static deleteVersion(modelName: string, versionName: string): Promise<void>{
        return fetch("http://localhost:3000/model/deleteVersion", {
            method: "DELETE",
            body: JSON.stringify({modelName: modelName, versionName: versionName}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(data => data.json())
        .catch(err => {throw new RequestException(err)});
    }
}