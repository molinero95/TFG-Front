import { ModelVersion } from "./modelVersion";

export interface Model {
    id: number;
    name: string;
    versions: Array<ModelVersion>;
    activeVersion: ModelVersion;
}