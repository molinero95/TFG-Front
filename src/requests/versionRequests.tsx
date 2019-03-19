import { RequestException } from "../exceptions/requestException";
import { ModelVersion } from "../entities/modelVersion";
import { ApplicationState } from "../applicationState";
import { Constants } from "../common/constants";

export class VersionRequests {

    public static async getModelVersions(modelId: number): Promise<Array<ModelVersion>> {
        return fetch(Constants.SERVICE_URL + `/modelVersions?id=${modelId}`, {
            method: "Get"
        })
            .then(data => data.json())
            .then(data => {
                let res: Array<ModelVersion> = []
                data.versions.forEach((vers: any) => {
                    let item: ModelVersion = {
                        id: vers.id,
                        denseUnits: vers.denseUnits,
                        learningRate: vers.learningRate,
                        name: vers.name,
                        classes: []
                    }
                    vers.classes.forEach((className: string, index: number) => {
                        item.classes.push({id: index, name: className})
                    });
                    res.push(item);
                });
                return res;
            })
            .catch(err => { throw new RequestException(err) });
    }


    public static async postCreateVersion(modelVersion: ModelVersion): Promise<number> {
        return fetch(Constants.SERVICE_URL + "/createVersion", {
            method: "POST",
            body: JSON.stringify(
                {
                    version: modelVersion.id,
                    name: modelVersion.name,
                    denseUnits: modelVersion.denseUnits,
                    learningRate: modelVersion.learningRate,
                    classes: modelVersion.classes.map(item => item.name),
                    modelId: ApplicationState.model.id
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => data.json())
            .then(data => data.id)
            .catch(err => { throw new RequestException(err) });
    }

    public static async deleteVersion(modelName: string, versionName: string): Promise<void> {
        return fetch(Constants.SERVICE_URL + "/deleteVersion", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => data.json())
            .catch(err => { throw new RequestException(err) });
    }
}