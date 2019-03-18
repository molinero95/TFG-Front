import { RequestException } from "../exceptions/requestException";
import { ModelVersion } from "../entities/models/modelVersion";

export class VersionRequests {

    public static async getModelVersions(modelId: number): Promise<Array<ModelVersion>>{
        return fetch(`http://localhost:3000/model/modelVersions?id=${modelId}`, {
            method: "Get"
        })
        .then(data => data.json())
        .then(data => data.data)
        .catch(err => {throw new RequestException(err)});
    }


    public static async postCreateVersion(modelVersion: ModelVersion): Promise<void>{
        return fetch("http://localhost:3000/model/createVersion", {
            method: "POST",
            body: JSON.stringify({data: modelVersion}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(data => data.json())
        .catch(err => {throw new RequestException(err)});
    }

    public static async deleteVersion(modelName: string, versionName: string): Promise<void>{
        return fetch("http://localhost:3000/model/deleteVersion", {
            method: "DELETE",
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(data => data.json())
        .catch(err => {throw new RequestException(err)});
    }
}