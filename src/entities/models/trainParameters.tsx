export interface TrainParameters{
    epochs: number;
    denseUnits: number;
    learningRate: number;
    batchSizeFraction: number;

    learningRateDec: number;
    batchSizeFractionDec: number;
}