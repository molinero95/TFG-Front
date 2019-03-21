import { ModelVersion } from "./modelVersion";
import { Identificable } from "./identificable";

export interface Model extends Identificable {
    id: number;
    name: string;
    versions: Array<ModelVersion>;
    activeVersion: ModelVersion;
}