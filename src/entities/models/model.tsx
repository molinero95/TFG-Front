import { ModelVersion } from "./modelVersion";
import { ModelClass } from "./modelClass";

export interface Model {
    id: number;
    name: string;
    versions: Array<ModelVersion>;
    activeVersion: ModelVersion;
    clases: Array<ModelClass>;
}