export interface ModelVersion{
    id: number;
    name: string;
    epochs: number;
    denseUnits: number;
    learningRate: number;
    batchSizeFraction: number;
}