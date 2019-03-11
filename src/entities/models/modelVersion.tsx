import { ModelClass } from "./modelClass";

export interface ModelVersion{
    id: number;
    name: string;
    epochs: number;
    denseUnits: number;
    learningRate: number;
    batchSizeFraction: number;
    classes: Array<ModelClass>;
}