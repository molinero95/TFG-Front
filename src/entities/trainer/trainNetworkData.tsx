import { ClassData } from "./classData";

export interface TrainNetworkData{
    epochs: number;//10, 40 
	denseUnits: number; //10 | 100 | 200
	learningRate: number; //0.00001 | 0.001 | 0.003
	batchSizeFraction: number;//0.1 | 1
	classes: Array<ClassData>;
}